@extends('admin.layouts.index')

@section('main')
    <x-display>
        <x-slot:header>
            @if(\Illuminate\Support\Facades\Gate::allows('granted', 'ROLE_LETTERS_EDIT'))
                <x-a :href="route('letters.edit',['letter'=>$letter->id])"
                     svg="edit"
                     type="warning"
                     label="Editer"></x-a>
            @endif
            @if(\Illuminate\Support\Facades\Gate::allows('granted', 'ROLE_LETTERS_DESTROY'))
                <x-destroy
                    label="Supprimer"
                    :url="route('letters.destroy',['letter'=>$letter->id])"
                    svg="delete"></x-destroy>
            @endif
        </x-slot:header>

        <x-text label="Lettre Transférée à:">
            @if(!$letter->users->isEmpty())
                <ol style="display: flex;list-style: none;">
                    @foreach($letter->users as $user)
                        <li style="margin: 6px;">
                            <x-a
                                :href="route('users.show',['user'=>$user->id])"
                                svg="person"
                                type="white"
                                target="_blank"
                                :label="$user->lastname.' '.$user->firstname"></x-a>
                        </li>
                    @endforeach
                </ol>
            @else
                Cette lettre n'a pas encore été transférée
            @endif
        </x-text>

        <div class="row">
            <div class="col-12 col-md-5">
                <x-text
                    label="Expéditeur"
                    :content="$letter->sender_full_name"></x-text>
            </div>
            <div class="col-12 col-md-4">
                <x-text
                    label="Destinataire"
                    :content="$letter->recipient_full_name"></x-text>
            </div>
            <div class="col-12 col-md-3">
                <x-text
                    color="success"
                    :label="$letter->type==\App\Http\Enumerations\LetterType::Send ? 'Date d\'envoi de la lettre':'Date de réception de la lettre'"
                    :content="$letter->receive_at->format('d/m/Y')"></x-text>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <x-text
                    label="Objet de la lettre"
                    :content="$letter->subject"></x-text>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <x-text
                    label="Contenu de la lettre">
                    <iframe src="{{ $letter->file_path }}"
                            frameborder="0"
                            style="width: 100%;height: 70vh;max-height: 664px"></iframe>
                </x-text>
            </div>
        </div>
        @if($letter->detail)
            <div class="row">
                <div class="col-12">
                    <x-text
                        color="warning"
                        label="Informations supplémentaires"
                        :content="$letter->detail"></x-text>
                </div>
            </div>
        @endif

        <div class="row">
            <div class="col-12">
                <x-text
                    label="Autres informations">
                    <div class="row">
                        <div class="col-12">
                            <x-text
                                label="L'utilisateur qui a enregistré cette lettre">
                                <a href="{{ route('users.show',['user'=>$letter->supervisor->id]) }}">
                                    <strong>{{ $letter->supervisor->lastname.' '.$letter->supervisor->firstname }}</strong>
                                </a>
                            </x-text>
                        </div>
                    </div>
                    <x-date-view
                        :created="$letter->created_at"
                        :updated="$letter->updated_at"></x-date-view>
                </x-text>
            </div>
        </div>
    </x-display>
@endsection

@section('title')
    N°{{ $letter->id }} | Informations
@endsection
@section('navigate')
    <x-navigate-bar>
        <x-navigate-bar-link
            :url="route('letters.index')"
            label="Lettres"></x-navigate-bar-link>
        <x-navigate-bar-link
            :url="\Illuminate\Support\Facades\URL::current()"
            :label="'N°'.$letter->id"></x-navigate-bar-link>
        <x-navigate-bar-link
            :url="\Illuminate\Support\Facades\URL::current()"
            label="Informations"></x-navigate-bar-link>
    </x-navigate-bar>
@endsection
