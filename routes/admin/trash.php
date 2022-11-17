<?php

use App\Http\Controllers\Admin\LetterController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::get('trash/users', [UserController::class, 'trash'])
    ->name('users.trash');
Route::get('restore/users/{user}', [UserController::class, 'restore'])
    ->name('users.restore');

Route::get('trash/services', [ServiceController::class, 'trash'])
    ->name('services.trash');
Route::get('restore/services/{service}', [ServiceController::class, 'restore'])
    ->name('services.restore');

Route::get('trash/letters', [LetterController::class, 'trash'])
    ->name('letters.trash');
Route::get('restore/letters/{letter}', [LetterController::class, 'restore'])
    ->name('letters.restore');
