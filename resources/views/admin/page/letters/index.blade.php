@extends('admin.layouts.index')

@section('main')
    <x-index :columns="$header" :data="$data" :empty="$type==='trash' ? 'Corbeille vide':'Aucune lettre trouvée'">
        @if($type!=='trash')
            @if(\Illuminate\Support\Facades\Gate::allows('granted', 'ROLE_LETTERS_TRASH'))
                <x-slot:header>
                    <x-a
                        :href="route('letters.create').'?type=send'"
                        svg="outbox"
                        type="success"
                        label="ENVOYER"></x-a>
                    <x-a
                        :href="route('letters.create').'?type=receive'"
                        svg="move_to_inbox"
                        type="warning"
                        label="RÉCEPTIONNER"></x-a>
                </x-slot:header>
            @endif
        @endif
    </x-index>
@endsection

@section('title')
    Lettres
    @if($type==='trash')
        Corbeille
    @endif
@endsection
@section('navigate')
    <x-navigate-bar>
        <x-navigate-bar-link
            :url="route('letters.index')"
            label="Lettres"></x-navigate-bar-link>
        @if($type==='trash')
            <x-navigate-bar-link
                :url="\Illuminate\Support\Facades\URL::current()"
                label="Corbeille"></x-navigate-bar-link>
        @else
            @if(\Illuminate\Support\Facades\Gate::allows('granted', 'ROLE_LETTERS_TRASH'))
                <x-slot:right>
                    <a href="{{ route('letters.trash') }}">
                        <x-icon name="delete"></x-icon>
                    </a>
                </x-slot:right>
            @endif
        @endif
    </x-navigate-bar>
@endsection
