@extends('admin.layouts.index')

@section('main')
    <x-display>
        <x-slot:header>
            @if(\Illuminate\Support\Facades\Gate::allows('granted', 'ROLE_SERVICES_EDIT'))
                <x-a :href="route('services.edit',['service'=>$service->id])"
                     svg="edit"
                     type="warning"
                     label="Editer"></x-a>
            @endif
            @if(\Illuminate\Support\Facades\Gate::allows('granted', 'ROLE_SERVICES_DESTROY'))
                <x-destroy
                    label="Supprimer"
                    :url="route('services.destroy',['service'=>$service->id])"
                    svg="delete"></x-destroy>
            @endif
        </x-slot:header>
        <div class="row">
            <div class="col-12 col-md-8">
                <x-text
                    label="Service"
                    :content="$service->name"></x-text>
            </div>
            <div class="col-12 col-md-4">
                <x-text
                    label="Nombre d'utilisateur du service"
                    :content="$service->users->count()"></x-text>
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
            :url="route('services.index')"
            label="Services"></x-navigate-bar-link>
        <x-navigate-bar-link
            :url="\Illuminate\Support\Facades\URL::current()"
            :label="$service->name"></x-navigate-bar-link>
        <x-navigate-bar-link
            :url="\Illuminate\Support\Facades\URL::current()"
            label="Informations"></x-navigate-bar-link>
    </x-navigate-bar>
@endsection
