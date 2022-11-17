@extends('admin.layouts.index')

@section('main')
    <x-index :columns="$header" :data="$data" :empty="$type==='trash' ? 'Corbeille vide':'Aucun service trouvé'">
        @if($type!=='trash')
            <x-slot:header>
                <x-a :href="route('services.create')"
                     svg="add"
                     type="success"
                     label="AJOUTER"></x-a>
            </x-slot:header>
        @endif
    </x-index>
@endsection

@section('title')
    Services
    @if($type==='trash')
        Corbeille
    @endif
@endsection
@section('navigate')
    <x-navigate-bar>
        <x-navigate-bar-link
            :url="route('services.index')"
            label="Services"></x-navigate-bar-link>
        @if($type==='trash')
            <x-navigate-bar-link
                :url="\Illuminate\Support\Facades\URL::current()"
                label="Corbeille"></x-navigate-bar-link>
        @else
            <x-slot:right>
                <a href="{{ route('services.trash') }}">
                    <x-icon name="delete"></x-icon>
                </a>
            </x-slot:right>
        @endif
    </x-navigate-bar>
@endsection
