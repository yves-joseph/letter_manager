@extends('admin.layouts.index')

@section('main')
    <x-insert :action="route('password_reset.update',['user'=>$user->id])" method="put">
        <div class="row">
            <div class="col-12 col-md-6">
                <x-input label="Mot de passe"
                         :autofocus="true"
                         placeholder="Saisir le mot de passe"
                         type="password"
                         name="password"></x-input>
            </div>
            <div class="col-12 col-md-6">
                <x-input label="Confirmez le mot de passe"
                         placeholder="Saisir à nouveau le mot de passe"
                         type="password"
                         name="password_confirmation"></x-input>
            </div>
        </div>
    </x-insert>
@endsection

@section('title')
    Mot de pass | Edition
@endsection
@section('navigate')
    <x-navigate-bar>
        <x-navigate-bar-link
            :url="route('users.index')"
            label="Utilisateurs"></x-navigate-bar-link>
        <x-navigate-bar-link
            :url="route('users.edit',['user'=>$user->id])"
            :label="$user->lastname.' '.$user->firstname"></x-navigate-bar-link>

        <x-navigate-bar-link
            :url="\Illuminate\Support\Facades\URL::current()"
            label="Mot de passe"></x-navigate-bar-link>

        <x-navigate-bar-link
            :url="\Illuminate\Support\Facades\URL::current()"
            label="Edition"></x-navigate-bar-link>
    </x-navigate-bar>
@endsection
