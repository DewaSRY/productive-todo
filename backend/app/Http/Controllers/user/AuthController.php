<?php

namespace App\Http\Controllers\user;

use App\Models\User;

use App\Http\Controllers\Controller;
use App\Http\Middleware\AuthMiddleware;
use App\Http\Resources\user\UserResource;
use App\services\CookieService;
use App\services\UserResolverService;

use App\utils\HttpStatusCode;

use Illuminate\Http\Request;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

use Illuminate\Validation\ValidationException;

/**
 * @OA\Info(title="Auth API", version="1.0")
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     in="header",
 *     description="JWT Authorization header using the Bearer scheme. Example: 'Authorization: Bearer {token}'"
 * )
 */
 class AuthController extends Controller
 {
     private CookieService $cookieService;
     private UserResolverService $userResolverService;
 
     public function __construct(
         CookieService $cookieService,
         UserResolverService $userResolverService
     ){
         $this->cookieService= $cookieService;
         $this->userResolverService= $userResolverService;
         $this->middleware([AuthMiddleware::class]);
     }
 
     /**
      * @OA\Post(
      *     path="/api/login",
      *     summary="Login to the application",
      *     tags={"Authentication"},
      *     @OA\RequestBody(
      *         required=true,
      *         @OA\JsonContent(
      *             required={"email", "password"},
      *             @OA\Property(property="email", type="string", format="email", example="user@example.com"),
      *             @OA\Property(property="password", type="string", format="password", example="password123")
      *         )
      *     ),
      *     @OA\Response(
      *         response=200,
      *         description="Successful login",
      *         @OA\JsonContent(
      *             @OA\Property(property="access_token", type="string", example="your_access_token_here")
      *         )
      *     ),
      *     @OA\Response(
      *         response=401,
      *         description="Unauthorized - Invalid credentials"
      *     )
      * )
      */
     public function login(Request $request){
         $request->validate([
             'email' => 'required|email',
             'password' => 'required'
         ]);
 
         $user =User::where('email', $request->email)->first();
         if (!$user) {
             throw ValidationException::withMessages([
                 'email' => ['The provided credentials are incorrect.']
             ]);
         }
 
         if (!Hash::check($request->password, $user->password)) {
             throw ValidationException::withMessages([
                 'email' => ['The provided credentials are incorrect.']
             ]);
         }
 
         return $this->_createAccessToken($user, $request);
     }
 
     /**
      * @OA\Post(
      *     path="/api/logout",
      *     summary="Logout from the application",
      *     tags={"Authentication"},
      *     @OA\Response(
      *         response=204,
      *         description="Successfully logged out"
      *     )
      * )
      */
     public function logout(Request $request){
         $request->user()->tokens()->delete();
         $this->userResolverService->removeUser($request);
         return response(status: HttpStatusCode::$HTTP_NO_CONTENT);
     }
 
     /**
      * @OA\Post(
      *     path="/api/signup",
      *     summary="Create a new user account",
      *     tags={"Authentication"},
      *     @OA\RequestBody(
      *         required=true,
      *         @OA\JsonContent(
      *             required={"email", "password", "name"},
      *             @OA\Property(property="email", type="string", format="email", example="newuser@example.com"),
      *             @OA\Property(property="password", type="string", format="password", example="password123"),
      *             @OA\Property(property="name", type="string", example="New User")
      *         )
      *     ),
      *     @OA\Response(
      *         response=201,
      *         description="Successfully created user",
      *         @OA\JsonContent(
      *             @OA\Property(property="access_token", type="string", example="your_access_token_here")
      *         )
      *     ),
      *     @OA\Response(
      *         response=409,
      *         description="Conflict - Email already in use"
      *     )
      * )
      */
     public function singUp(Request $request){
         $request->validate([
             "email"=> "required|email",
             "password"=> "required|min:6",
             "name"=> "required|min:6"
         ]);
         $user =User::where('email', $request->email)->first();
         if($user){
             throw ValidationException::withMessages([
                 'email' => ['Email already use.']
             ]);
         }
         $user= User::create([
             "email"=> $request->email,
             "name" => $request->name, 
             'email_verified_at' => now(),
             'password' => Hash::make($request->password),
             'remember_token' => Str::random(10),
         ]);
 
         return $this->_createAccessToken($user, $request);
     }
 
     /**
      * @OA\Get(
      *     path="/api/user",
      *     summary="Get the authenticated user's information",
      *     tags={"Authentication"},
      *     @OA\Response(
      *         response=200,
      *         description="User information",
      *         @OA\JsonContent(
      *             type="object",
      *             @OA\Property(property="id", type="integer", example=1),
      *             @OA\Property(property="email", type="string", example="user@example.com"),
      *             @OA\Property(property="name", type="string", example="User Name")
      *         )
      *     ),
      *     @OA\Response(
      *         response=401,
      *         description="Unauthorized"
      *     )
      * )
      */
     public function signIn(Request $request){
         return new UserResource($request->user());
     }
 
     private function _createAccessToken(User $user, Request $request) 
     {
         return  $this->cookieService
             ->setcookie(User::$KEY_ACCESS_TOKEN, $user, 60 * 24 *7, );
     }
 
 }