@extends('admin.layouts.index')

@section('main')
    <x-insert :action="route('services.update',['service'=>$service->id])" method="put">
        <div class="row">
            <div class="col-12">
                <x-input
                    label="Service"
                    placeholder="Saisir la designation du service"
                    name="name"
                    :autofocus="true"
                    :required="true"
                    :value="old('name') ?? $service->name"></x-input>
            </div>
        </div>
    </x-insert>
@endsection

@section('title')
    {{ $service->name }} | Edition
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
            label="Edition"></x-navigate-bar-link>
    </x-navigate-bar>
@endsection
