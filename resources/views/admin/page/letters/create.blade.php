@extends('admin.layouts.index')

@section('main')
    <x-insert :action="route('letters.store')">
        <div class="row">
            <div class="col-12 col-md-6">
                <x-input
                    label="Objet de la lettre"
                    placeholder="Saisir l'objet de la lettre"
                    name="subject"
                    :autofocus="true"
                    :required="true"
                    :value="old('subject')"></x-input>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6">
                <x-input
                    label="Expéditeur"
                    placeholder="Saisir le nom du expéditeur"
                    name="sender_full_name"
                    :required="true"
                    :value="old('sender_full_name')"></x-input>
            </div>
            <div class="col-12 col-md-6">
                <x-input
                    label="Destinataire"
                    placeholder="Saisir le nom du destinataire"
                    name="recipient_full_name"
                    :required="true"
                    :value="old('recipient_full_name')"></x-input>
            </div>
        </div>



        <div class="row">
            <div class="col-12">
                <x-textarea
                    label="Information supplémentaire"
                    :value="old('detail')"></x-textarea>
            </div>
        </div>
    </x-insert>
@endsection

@section('title')
    Lettres | Enregistrement
@endsection
@section('navigate')
    <x-navigate-bar>
        <x-navigate-bar-link
            :url="route('letters.index')"
            label="Lettres"></x-navigate-bar-link>
        <x-navigate-bar-link
            :url="route('letters.create')"
            :enabled="false"
            label="Enregistrement"></x-navigate-bar-link>
    </x-navigate-bar>
@endsection
