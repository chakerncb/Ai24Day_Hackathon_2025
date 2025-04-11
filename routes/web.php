<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('/tasks')->namespace('App\Http\Controllers')->group(function () {
    
Route::get('/', 'TasksController@index')->name('tasks.getAll');

Route::get('/{id}', 'TasksController@show')->name('tasks.getById');

Route::post('/', 'TasksController@store')->name('tasks.create');

Route::put('/update/{id}', 'TasksController@update')->name('tasks.update');

});