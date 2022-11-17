@extends('admin.layouts.index')

@section('main')
    <x-display>
        <x-slot:header>
            <x-a :href="route('services.edit',['service'=>$service->id])"
                 svg="edit"
                 type="warning"
                 label="Editer"></x-a>
            <x-destroy
                label="Supprimer"
                :url="route('services.destroy',['service'=>$service->id])"
                svg="delete"></x-destroy>
        </x-slot:header>
        <div class="row">
            <div class="col-12 col-md-6">
                <x-text
                    label="Service"
                    :content="$service->name"></x-text>
            </div>
        </div>
    </x-display>
@endsection

@section('title')
    {{ $service->name }} | Informations
@endsection
@section('navigate')
    <x-navigate-bar>
        <x-navigate-bar-link
            :url="route('users.index')"
            label="Services"></x-navigate-bar-link>
        <x-navigate-bar-link
            :url="\Illuminate\Support\Facades\URL::current()"
            :label="$service->name"></x-navigate-bar-link>
        <x-navigate-bar-link
            :url="\Illuminate\Support\Facades\URL::current()"
            label="Informations"></x-navigate-bar-link>
    </x-navigate-bar>
@endsection
