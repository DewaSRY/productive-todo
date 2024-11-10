<?php

namespace App\services;

use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\user\AuthResources;

class CookieService
{
    public function setCookie(
        string $key, 
        User $user,
        ?int $duration= 60
    ): Response | JsonResponse
    {
        $token= $user->createToken('api-token')->plainTextToken;
        return response()->json(new AuthResources($user, $token))->cookie(
            $key,          // Cookie name
            $token,        // Cookie value (the token)
            $duration,     // Cookie expiration time in minutes
            '/',           // Path (root of the application)
            null,          // Domain (null defaults to the app domain)
            true,          // Secure flag (true means cookie only sent over HTTPS)
            true,          // HttpOnly flag (true prevents JavaScript access)
            false,         // Raw (set to false to encode the cookie value)
            'none'         // SameSite policy ('none' allows cross-site usage)
        );

    }

    public function getCookie(Request $request, string $key): ?string
    {
        return $request->cookie($key);
    }

    public function cleantTheCookie(string $key){
        return response()->noContent()->withCookie(cookie()->forget($key));
    }
}
