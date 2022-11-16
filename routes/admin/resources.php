<?php


use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('account')->group(function () {
    Route::resource('users', UserController::class);

   require_once __DIR__."/trash.php";
});
