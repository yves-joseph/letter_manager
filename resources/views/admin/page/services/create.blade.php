@extends('admin.layouts.index')

@section('main')
    <x-insert :action="route('users.store')">
        <div class="row" style="margin-bottom: 24px;">
            <div class="col-auto">
                <x-image-picker
                    label="Image de profil"
                    name="image_path"
                    :required="false"
                    icon="user"
                    width="200px"
                    height="200px"></x-image-picker>
            </div>
        </div>
        <div class="row" style="margin: 0 0 8px 0;">
            <div class="col-auto">
                <x-switch
                    label="Statut du compte"
                    :checked="true"
                    position="start"
                    name="activated"></x-switch>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6">
                <x-input
                    label="Nom"
                    placeholder="Saisir le nom de l'utilisateur"
                    name="firstname"
                    :autofocus="true"
                    :required="true"
                    :focus="true"
                    :value="old('firstname')"></x-input>
            </div>
            <div class="col-12 col-md-6">
                <x-input
                    label="Prénom"
                    placeholder="Saisir le prénom de l'utilisateur"
                    name="lastname"
                    :required="true"
                    :value="old('lastname')"></x-input>
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
                    :value="old('email')"></x-input>
            </div>
            <div class="col-12 col-md-6">
                <x-input
                    label="Numéro de téléphone"
                    placeholder="Saisir le numéro de l'utilisateur"
                    description="Numéro personnel de l'utilisateur"
                    name="phone"
                    type="tel"
                    :required="true"
                    :value="old('phone')"></x-input>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="kh-input-custom">
                    <div style="margin: 8px 0;overflow: hidden;">
                        <div class="row">
                            @foreach(config('role',[]) as $item)
                                <div class="col-12  col-sm-6 col-md-4 col-lg-3 col-xl-2 kh-group_item"
                                     style="margin-bottom: 16px;">
                                    <x-group
                                        :label="$item['label']"
                                        :name="$item['name']"
                                        :value="$item['value']"></x-group>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    <label>
                        Autorisations
                        <span>**</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6">
                <x-input
                    label="Mot de passe"
                    placeholder="Saisir le mot de passe"
                    :required="true"
                    type="password"
                    name="password"></x-input>
            </div>
            <div class="col-12 col-md-6">
                <x-input
                    label="Confirmez le mot de passe"
                    placeholder="Saisir à nouveau le mot de passe"
                    :required="true"
                    type="password"
                    name="password_confirmation"></x-input>
            </div>
        </div>
    </x-insert>
@endsection

@section('title')
    Utilisateurs | Enregistrement
@endsection
@section('navigate')
    <x-navigate-bar>
        <x-navigate-bar-link
            :url="route('users.index')"
            label="Utilisateurs"></x-navigate-bar-link>
        <x-navigate-bar-link
            :url="route('users.create')"
            :enabled="false"
            label="Enregistrement"></x-navigate-bar-link>
    </x-navigate-bar>
@endsection
