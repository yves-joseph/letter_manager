@extends('admin.layouts.index')

@section('main')
    <x-insert :action="route('services.store')">
        <div class="row">
            <div class="col-12">
                <x-input
                    label="Service"
                    placeholder="Saisir la designation du service"
                    name="name"
                    :autofocus="true"
                    :required="true"
                    :focus="true"
                    :value="old('name')"></x-input>
            </div>
        </div>
    </x-insert>
@endsection

@section('title')
    Services | Enregistrement
@endsection
@section('navigate')
    <x-navigate-bar>
        <x-navigate-bar-link
            :url="route('services.index')"
            label="Services"></x-navigate-bar-link>
        <x-navigate-bar-link
            :url="route('services.create')"
            :enabled="false"
            label="Enregistrement"></x-navigate-bar-link>
    </x-navigate-bar>
@endsection
