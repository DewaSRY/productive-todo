<?php

use App\Http\Controllers\user\AuthController;
use App\Http\Controllers\todo\TodoController;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;



Route::prefix('user')->controller(AuthController::class)->group(function () {
    Route::post('login', 'login');        
    Route::delete('logout', 'logout');     
    Route::post('signup', 'signUp');      
    Route::get('signin', 'signIn');       
    Route::post('unique-property', 'uniqueProperty');       
});

Route::prefix('todo')->controller(TodoController::class)->group(function () {
    Route::get('/', 'index');        
    Route::post('/', 'store');     
    Route::get('/todo-heatmap', 'getTodoCalenderHeatMap');            
    Route::put('/toggle-completion/{todo}', 'togglComplition');            
    Route::get('/{todo}', 'show');              
    Route::delete('/{todo}', 'destroy');              
    Route::put('/{todo}', 'update');            
});

 