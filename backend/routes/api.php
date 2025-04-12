<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::namespace('App\Http\Controllers')->group(function () {
    
    // Route::get('/', 'TasksController@index')->name('tasks.getAll');
    
    // Route::get('/{id}', 'TasksController@show')->name('tasks.getById');
    
    // Route::post('/', 'TasksController@store')->name('tasks.create');
    
    // Route::put('/{id}', 'TasksController@update')->name('tasks.update');
    
    // Route::delete('/{id}', 'TasksController@destroy')->name('tasks.delete');

   
    Route::apiResource('tasks', 'TasksController');

    Route::post('/login', 'AuthController@login')->name('login');
    Route::post('/register', 'AuthController@register');
    Route::post('/logout', 'AuthController@logout')
        ->middleware('auth:sanctum');

    });
