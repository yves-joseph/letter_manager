@extends('admin.layouts.index')

@section('main')
    <x-index :columns="$header" :data="$data" :empty="$type==='trash' ? 'Corbeille vide':'Aucun utilisateur trouvé'">
        @if($type!=='trash')
            @if(\Illuminate\Support\Facades\Gate::allows('granted', 'ROLE_USERS_CREATE'))
                <x-slot:header>
                    <x-a :href="route('users.create')"
                         svg="add"
                         type="success"
                         label="AJOUTER"></x-a>
                </x-slot:header>
            @endif
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
            @if(\Illuminate\Support\Facades\Gate::allows('granted', 'ROLE_USERS_TRASH'))
            <x-slot:right>
                <a href="{{ route('users.trash') }}">
                    <x-icon name="delete"></x-icon>
                </a>
            </x-slot:right>
            @endif
        @endif
    </x-navigate-bar>
@endsection
