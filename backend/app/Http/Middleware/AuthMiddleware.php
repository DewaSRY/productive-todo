<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

use App\services\CookieService;
use App\services\UserResolverService;
use App\utils\HttpStatusCode;

use Symfony\Component\HttpFoundation\Response;
use Laravel\Sanctum\PersonalAccessToken;

class AuthMiddleware
{
    private CookieService $cookieService;
    private UserResolverService $userResolverService;

    public function __construct(CookieService $cookieService, UserResolverService $userResolverService)
    {
        $this->cookieService = $cookieService;
        $this->userResolverService = $userResolverService;
    }

    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user() ?? $this->resolveUserFromToken($request);

        if (!$user) {
            return response()->json(
                ['message' => 'You are not authenticated'],
                HttpStatusCode::$HTTP_UNAUTHORIZED);
        }
    
        $this->userResolverService->storeUser($user, $request); 

        return $next($request);
    }

    private function resolveUserFromToken(Request $request): ?User
    {
        $token = $request->bearerToken() ?? $this->cookieService->getCookie($request, User::$KEY_ACCESS_TOKEN);
        return $token ? $this->getUserFromToken($token) : null;
    }

    private function getUserFromToken(string $token): ?User
    {
        $tokenModel = PersonalAccessToken::findToken($token);
        return $tokenModel && $tokenModel->tokenable instanceof User ? $tokenModel->tokenable : null;
    }

}