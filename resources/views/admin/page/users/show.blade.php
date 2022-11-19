@extends('admin.layouts.index')

@section('main')
    <x-display>
        <x-slot:header>
            @if(\Illuminate\Support\Facades\Gate::allows('granted', 'ROLE_USERS_EDIT'))
            <x-a :href="route('users.edit',['user'=>$user->id])"
                 svg="edit"
                 type="warning"
                 label="Editer"></x-a>
            @endif
            @if(\Illuminate\Support\Facades\Gate::allows('granted', 'ROLE_USERS_DESTROY'))
                <x-destroy
                    label="Supprimer"
                    :url="route('users.destroy',['user'=>$user->id])"
                    svg="delete"></x-destroy>
            @endif
        </x-slot:header>
        <div class="row" style="margin-bottom: 8px">
            <div class="col-auto">
                <x-state
                    state="$user->activated->value"></x-state>
            </div>
        </div>
        <div class="row">
            <div class="col-auto">
                <x-image-profile
                    :name="$user->lastname.' '.$user->firstname"
                    :url="$user->imageBySize(200,200) ?? null"
                    width="200px"></x-image-profile>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6">
                <x-text
                    label="Nom"
                    :content="$user->lastname"></x-text>
            </div>
            <div class="col-12 col-md-6">
                <x-text
                    label="Prénom"
                    :content="$user->firstname"></x-text>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6">
                <x-text
                    label="Email"
                    :content="$user->email"></x-text>
            </div>
            <div class="col-12 col-md-6">
                <x-text
                    label="Téléphone"
                    :content="$user->phone"></x-text>
            </div>
        </div>
        @granted('ROLE_USERS_SUPERVISOR')
        <fieldset disabled class="row" style="margin-top: 8px">
            <div class="col-12">
                <div class="kh-input-custom">
                    <div style="margin: 8px 0;overflow: hidden;">
                        <div class="row">
                            @foreach(checkedMenu($user->role) as $item)
                                <div class="col-12  col-sm-6 col-md-4 col-lg-3 col-xl-2 kh-group_item"
                                     style="margin-bottom: 16px;">
                                    <x-group
                                        :label="$item['label']"
                                        :name="$item['name']"
                                        :value="$item['value']"></x-group>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    <label>
                        Autorisations
                        <span>**</span>
                    </label>
                </div>
            </div>
        </fieldset>
        @endgranted

        <div class="row">
            <div class="col-12">
                <x-text
                    label="Lettres réceptionnée">
                    <table class="table">
                        <tr>
                            <th>Expéditeur</th>
                            <th>Objet de la lettre</th>
                            <th>Date</th>
                        </tr>
                        @foreach($user->letters as $letter)
                            <tr>
                                <td>{{ $letter->sender_full_name }}</td>
                                <td>
                                    <a target="_blank" href="{{ route('letters.show',['letter'=>$letter->id]) }}">
                                        {{ $letter->subject }}
                                    </a>
                                </td>
                                <td>{{ $letter->receive_at->format('d/m/Y') }}</td>
                            </tr>
                        @endforeach
                    </table>
                </x-text>
            </div>
        </div>
    </x-display>
@endsection

@section('title')
    {{ $user->lastname.' '.$user->firstname }} | Informations
@endsection
@section('navigate')
    <x-navigate-bar>
        <x-navigate-bar-link
            :url="route('users.index')"
            label="Utilisateurs"></x-navigate-bar-link>
        <x-navigate-bar-link
            :url="\Illuminate\Support\Facades\URL::current()"
            :label="$user->lastname.' '.$user->firstname"></x-navigate-bar-link>
        <x-navigate-bar-link
            :url="\Illuminate\Support\Facades\URL::current()"
            label="Informations"></x-navigate-bar-link>
    </x-navigate-bar>
@endsection
