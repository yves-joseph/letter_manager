<?php


use App\Http\Controllers\Admin\Auth\AdminAuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {

    Route::get('login', [AdminAuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AdminAuthenticatedSessionController::class, 'store']);
});

Route::post('users/logout', [AdminAuthenticatedSessionController::class, 'destroy'])
    ->name('users.logout')
    ->middleware('auth');
