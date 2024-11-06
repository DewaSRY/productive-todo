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

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        $this->userResolverService->removeUser($request);
        return response(status: HttpStatusCode::$HTTP_NO_CONTENT);
    }

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

    public function signIn(Request $request){
        return new UserResource($request->user());
     }



    private function _createAccessToken(User $user, Request $request) 
    {
        return  $this->cookieService
            ->setcookie(User::$KEY_ACCESS_TOKEN, $user, 60 * 24 *7, );
    }

}
