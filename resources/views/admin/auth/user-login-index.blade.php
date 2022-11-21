<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }} | Connexion</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/js/login.js','resources/scss/admin/login.scss'])

    <link rel="icon" sizes="32x32" href="{{ asset('favicon.ico') }}">
    <meta name="theme-color" content="#fd7400"/>
</head>
<body>
<div id="login">
    <div class="login-item-view" style="background:url({{ asset('storage/system/login-green.svg') }}) no-repeat center center,linear-gradient(#f8f9fa,#f8f9fa);background-size: 70% 70%">
        <div id="login-item-view-about" >
            <h3>{{ config('app.name') }}</h3>
            <p>
               Logiciel de gestion intégrer des lettres manuscrites
            </p>
        </div>
    </div>
    <div class="login-item-view">
        <form id="login-item-view-form" method="post">
            <h3>Authentification</h3>
            <div class="login-item-view-form-content">
                <div class="login-item-view-form-item">
                    <label for="username" class="active">
                        Email
                    </label>
                    <input
                        type="text"
                        value="{{ old('username') ?? 'yjk@outlook.fr' }}"
                        name="email"
                        id="username"
                        class="kh-input-field"
                        required
                        autocomplete="false"
                        autofocus>
                </div>
                <div class="login-item-view-form-item">
                    <label for="password">
                        Mot de passe
                    </label>
                    <input
                        class="kh-input-field"
                        type="password"
                        name="password"
                        id="password"
                        value="password"
                        required
                        autofocus>
                    <button
                        id="password-blocked"
                        class="icon-eye-blocked"
                        type="button"></button>
                </div>
                <div style="margin-top: 16px;margin-left: 8px;">
                    <x-checkbox
                        label="Se souvenir de moi"
                        name="remember"></x-checkbox>
                </div>
            </div>
            @csrf
            <div id="login-item-view-form-btn">
                <button type="submit">
                    <span id="login-item-view-form-btn-icon">
                        <x-icon name="account_circle"></x-icon>
                    </span>
                    <span id="login-item-view-form-btn-label">
                        Connexion
                    </span>
                </button>

            </div>
        </form>
        @if($errors->any())
            @foreach($errors->all() as $error)
                <div id="login-item-view-error">
                    {{ $error }}
                </div>
            @endforeach
        @endif

    </div>
</div>
</body>
</html>
