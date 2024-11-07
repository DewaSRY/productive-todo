<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\services\CookieService;
use App\services\UserResolverService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(CookieService::class, fn($app)=> new CookieService());
        $this->app->singleton(UserResolverService::class, fn($app)=> new UserResolverService());
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
