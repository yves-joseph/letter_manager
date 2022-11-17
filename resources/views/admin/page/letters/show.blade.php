@extends('admin.layouts.index')

@section('main')
    <x-display>
        <x-slot:header>
            <x-a :href="route('letters.edit',['letter'=>$letter->id])"
                 svg="edit"
                 type="warning"
                 label="Editer"></x-a>
            <x-destroy
                label="Supprimer"
                :url="route('letters.destroy',['letter'=>$letter->id])"
                svg="delete"></x-destroy>
        </x-slot:header>
        <div class="row">
            <div class="col-12 col-md-6">
                <x-text
                    label="Nom"
                    :content="$user->lastname"></x-text>
            </div>
            <div class="col-12 col-md-6">
                <x-text
                    label="Prénom"
                    :content="$user->firstname"></x-text>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6">
                <x-text
                    label="Email"
                    :content="$user->email"></x-text>
            </div>
            <div class="col-12 col-md-6">
                <x-text
                    label="Téléphone"
                    :content="$user->phone"></x-text>
            </div>
        </div>
    </x-display>
@endsection

@section('title')
    {{ $user->lastname.' '.$user->firstname }} | Informations
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
            label="Informations"></x-navigate-bar-link>
    </x-navigate-bar>
@endsection
