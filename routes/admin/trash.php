<?php

use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::get('trash/users',[UserController::class,'trash'])
    ->name('users.trash');
Route::get('restore/users/{user}',[UserController::class,'restore'])
    ->name('users.restore');


