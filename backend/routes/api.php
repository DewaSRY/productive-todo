<?php

use App\Http\Controllers\user\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::prefix('user')->controller(AuthController::class)->group(function () {
    Route::post('login', 'login');        
    Route::post('logout', 'logout');     
    Route::post('signup', 'singUp');      
    Route::get('signin', 'signIn');       
});