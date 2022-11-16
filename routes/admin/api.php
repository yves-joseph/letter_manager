<?php

use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::get('init/users/profile/image/{user}', [UserController::class, 'initProfilImage'])
    ->name('users.init_profile_image');


Route::get('users/account/status/{user}', [UserController::class, 'accountStatus'])
    ->name('users.account_status');
