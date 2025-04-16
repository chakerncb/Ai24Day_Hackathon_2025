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

   
    Route::apiResource('coach', 'CoachController');
    Route::apiResource('reception', 'ReceptionController');
    Route::apiResource  ('trainee', 'TraineeController');



    Route::get('/userslog', 'LogsController@index');
    

    Route::post('/login', 'AuthController@login')->name('login');
    Route::post('/register', 'AuthController@register');
    Route::post('/logout', 'AuthController@logout')
        ->middleware('auth:sanctum');



        // Route::group(['prefix' => 'trainees'], function () {
        //     Route::get('/logs', 'TrainingController@getRecognitionLogs');
        //     Route::get('/sessions', 'TrainingController@getTraineeSessions');
        //     Route::post('/entry', 'TrainingController@processTrainingEntry');
        //     Route::post('/add-sessions', 'TrainingController@addSessions');
        //     Route::get('/{user_id}', 'TrainingController@getTrainee');
        // });

    });
