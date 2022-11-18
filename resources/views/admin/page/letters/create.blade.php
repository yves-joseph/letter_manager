@extends('admin.layouts.index')

@section('main')
    <x-insert :action="route('letters.store')">
        @php
            $_type = Request::query('type',"receive")
        @endphp
        <div class="row">
            <div class="col-12 col-md-6 col-lg-4">
                <x-input
                    :label="$_type=='send' ? 'Date d\'envoi de la lettre':'Date de réception de la lettre'"
                    type="date"
                    placeholder="Saisir l'objet de la lettre"
                    name="receive_at"
                    :required="true"
                    :value="old('subject')"></x-input>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <x-input
                    label="Objet de la lettre"
                    placeholder="Saisir l'objet de la lettre"
                    name="subject"
                    :autofocus="true"
                    :required="true"
                    :value="old('subject')"></x-input>
            </div>
        </div>
        <input type="hidden" name="type" value="{{ $_type }}">
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
                <x-input
                    label="Lettre scanner (format PDF)"
                    description="Veuillez sélectionner le fichier de la lettre scanner"
                    name="file_path"
                    accept=".pdf"
                    type="file"
                    :required="true"></x-input>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <x-textarea
                    rows="4"
                    label="Information supplémentaire"
                    :value="old('detail')"></x-textarea>
            </div>
        </div>
        <x-slot:header>
            <div
                style="padding: 8px 16px 24px 16px;background-color: #FFFFFF;box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1); border-radius: 4px;">
                <x-text label="Transférer la lettre à:">
                    @if(!$users->isEmpty())
                        <x-select
                            name="users[]"
                            search="true"
                            placeholder="Veuillez sélectionner les destinataires"
                            multiple="true"
                            label="Destinataire">
                            @foreach($users as $user)
                                <option value="{{ $user->id }}">{{ $user->lastname.' '.$user->firstname }}</option>
                            @endforeach
                        </x-select>
                    @else
                        <strong>Aucun destinataire trouvé.</strong>
                        <br>
                        <a href="{{ route('users.create') }}">
                            Ajouter un destinataire
                        </a>
                    @endif
                </x-text>
            </div>
        </x-slot:header>
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
            :url="\Illuminate\Support\Facades\URL::current()"
            :label="$_type=='send' ? 'Envoyer':'Réceptionner'"></x-navigate-bar-link>
        <x-navigate-bar-link
            :url="\Illuminate\Support\Facades\URL::current()"
            :enabled="false"
            label="Enregistrement"></x-navigate-bar-link>
    </x-navigate-bar>
@endsection
