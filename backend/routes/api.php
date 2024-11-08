<?php

use App\Http\Controllers\user\AuthController;
use App\Http\Controllers\todo\TodoController;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;



Route::prefix('user')->controller(AuthController::class)->group(function () {
    Route::post('login', 'login');        
    Route::post('logout', 'logout');     
    Route::post('signup', 'singUp');      
    Route::get('signin', 'signIn');       
});

Route::prefix('todo')->controller(TodoController::class)->group(function () {
    Route::get('/', 'index');        
    Route::post('/', 'store');     
    Route::get('/{todo}', 'show');              
    Route::put('/{todo}', 'update');            
});

