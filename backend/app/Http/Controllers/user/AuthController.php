<?php

namespace App\Http\Controllers\user;

use App\Models\User;

use App\Http\Controllers\Controller;
use App\Http\Middleware\AuthMiddleware;
use App\Http\Resources\user\UserResource;
use App\services\CookieService;
use App\services\UserResolverService;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;



class AuthController extends Controller
{
    private CookieService $cookieService;
    private UserResolverService $userResolverService;

    public function __construct(
        CookieService $cookieService,
        UserResolverService $userResolverService
    ){
        $this->cookieService = $cookieService;
        $this->userResolverService = $userResolverService;
        $this->middleware([AuthMiddleware::class])->only(['signIn', 'logout']);
    }

    /**
     * Log in a user
     * 
     * This endpoint verifies user credentials and generates an access token.
     * 
     * @group Authentication
     * @bodyParam email string required The user's email address. Example: "user@example.com"
     * @bodyParam password string required The user's password. Example: "password123"
     * @response App\Http\Resources\user\AuthResources
     * 
     * @response 422 {
     *    "message": "The provided credentials are incorrect."
     * }
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();
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

        return $this->setAccessToken($user, $request);
    }

    /**
     * Log out a user
     * 
     * This endpoint logs out the user and revokes all tokens.
     * 
     * @group Authentication
     * @authenticated
     * @response 204 {}
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        $this->userResolverService->removeUser($request);
        return $this->cookieService->cleantTheCookie(User::$KEY_ACCESS_TOKEN);
    }

    /**
     * Register a new user
     * 
     * This endpoint allows a new user to sign up and creates their account.
     * 
     * @group Authentication
     * @bodyParam email string required The user's email address. Example: "newuser@example.com"
     * @bodyParam password string required The user's password. Must be at least 6 characters. Example: "password123"
     * @bodyParam name string required The user's name. Example: "John Doe"
     * 
     * @response App\Http\Resources\user\AuthResources 
     * 
     * @response 422 {
     *    "message": "Email already in use."
     * }
     */
    public function signUp(Request $request)
    {
        $request->validate([
            "email" => "required|email",
            "password" => "required|min:6",
            "name" => "required|min:6"
        ]);
        
        $user = User::where('email', $request->email)->first();
        if ($user) {
            throw ValidationException::withMessages([
                'email' => ['Email already in use.']
            ]);
        }
        
        $user = User::create([
            "email" => $request->email,
            "name" => $request->name,
            'email_verified_at' => now(),
            'password' => Hash::make($request->password),
            'remember_token' => Str::random(10),
        ]);

        return $this->setAccessToken($user, $request);
    }

    /**
     * Get authenticated user details
     * 
     * Returns the details of the currently authenticated user.
     * 
     * @group Authentication
     * @authenticated
     * @response App\Http\Resources\user\UserResource;
     */
    public function signIn(Request $request)
    {
        return new UserResource($request->user());
    }

    /**
     * Check if a user property is unique
     * 
     * This endpoint checks if a given property (e.g., `name` or `email`) is already in use.
     * 
     * @group Authentication
     * @bodyParam property string required The property to check for uniqueness. Should be either "name" or "email". Example: "name"
     * @bodyParam name string required The value of the property to check. Example: "John Doe"
     * 
     * @response 200 {
     *   "is_unique": false
     * }
     */
    public function uniqueProperty(Request $request){

        $validate= $request->validate([
            "property"=>['required', Rule::in(["name", 'email'])],
            "name"=> "required|string",
        ]);

        $userExists = User::where(
                $validate['property'],
                $validate['name']
        )->exists();

        return response()
            ->json([
                "is_unique" => !$userExists 
            ]);
    }

    private function setAccessToken(User $user)
    {
        return $this->cookieService->setcookie(User::$KEY_ACCESS_TOKEN, $user, 60 * 24 * 7);
    }
}