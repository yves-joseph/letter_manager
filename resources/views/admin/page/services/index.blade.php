@extends('admin.layouts.index')

@section('main')
    <x-index :columns="$header" :data="$data" :empty="$type==='trash' ? 'Corbeille vide':'Aucun utilisateur trouvé'">
        @if($type!=='trash')
            <x-slot:header>
                <x-a :href="route('users.create')"
                     svg="add"
                     type="success"
                     label="AJOUTER"></x-a>
            </x-slot:header>
        @endif
    </x-index>
@endsection

@section('title')
    Utilisateurs
    @if($type==='trash')
        Corbeille
    @endif
@endsection
@section('navigate')
    <x-navigate-bar>
        <x-navigate-bar-link
            :url="route('users.index')"
            label="Utilisateurs"></x-navigate-bar-link>
        @if($type==='trash')
            <x-navigate-bar-link
                :url="\Illuminate\Support\Facades\URL::current()"
                label="Corbeille"></x-navigate-bar-link>
        @else
            <x-slot:right>
                <a href="{{ route('users.trash') }}">
                    <x-icon name="delete"></x-icon>
                </a>
            </x-slot:right>
        @endif
    </x-navigate-bar>
@endsection
