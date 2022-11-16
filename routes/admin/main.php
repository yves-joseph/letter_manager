<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ImagesController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function () {

    Route::middleware('auth')->group(function (){

        Route::get('dashboard',[\App\Http\Controllers\Admin\DashboardController::class,'index'])
            ->name('user_home.index');

        require_once __DIR__ . "/resources.php";

        // Init user password
        Route::get('account/users/password/reset/form/{user}',[UserController::class,'passwordResetForm'])
            ->name('password_reset.index');
        Route::put('account/users/password/reset/{user}',[UserController::class,'passwordReset'])
            ->name('password_reset.update');
        // Init customer password

        Route::prefix('api')->group(function () {
            require_once __DIR__ . "/api.php";
        });
    });


    require_once __DIR__."/auth.php";
});
Route::get('/images/{path}', [ImagesController::class,'show'])
    ->where('path', '.*');

