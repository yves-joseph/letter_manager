@extends('admin.layouts.index')

@section('main')
    <x-insert :action="route('letters.update',['letter'=>$letter->id])" method="put">
        <div class="row">
            <div class="col-12 col-md-6">
                <x-input
                    label="Nom"
                    placeholder="Saisir le nom de l'utilisateur"
                    name="firstname"
                    :autofocus="true"
                    :required="true"
                    :focus="true"
                    :value="old('firstname') ?? $user->firstname"></x-input>
            </div>
            <div class="col-12 col-md-6">
                <x-input
                    label="Prénom"
                    placeholder="Saisir le prénom de l'utilisateur"
                    name="lastname"
                    :required="true"
                    :value="old('lastname') ?? $user->lastname"></x-input>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6">
                <x-input
                    label="Email"
                    placeholder="Saisir l'email"
                    type="email"
                    description="Identifiant de connexion"
                    name="email"
                    :required="true"
                    :value="old('email') ?? $user->email"></x-input>
            </div>
            <div class="col-12 col-md-6">
                <x-input
                    label="Numéro de téléphone"
                    placeholder="Saisir le numéro de l'utilisateur"
                    description="Numéro personnel de l'utilisateur"
                    name="phone"
                    type="tel"
                    :required="true"
                    :value="old('phone') ?? $user->phone"></x-input>
            </div>
        </div>
    </x-insert>
@endsection

@section('title')
    {{ $user->lastname.' '.$user->firstname }} | Edition
@endsection
@section('navigate')
    <x-navigate-bar>
        <x-navigate-bar-link
            :url="route('letters.index')"
            label="Utilisateurs"></x-navigate-bar-link>
        <x-navigate-bar-link
            :url="\Illuminate\Support\Facades\URL::current()"
            :label="$user->lastname.' '.$user->firstname"></x-navigate-bar-link>
        <x-navigate-bar-link
            :url="\Illuminate\Support\Facades\URL::current()"
            label="Edition"></x-navigate-bar-link>
    </x-navigate-bar>
@endsection
