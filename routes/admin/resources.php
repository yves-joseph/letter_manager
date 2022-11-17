<?php


use App\Http\Controllers\Admin\LetterController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('account')->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('services', ServiceController::class);
    Route::resource('letters', LetterController::class);

   require_once __DIR__."/trash.php";
});
