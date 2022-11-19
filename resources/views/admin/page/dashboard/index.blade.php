@extends('admin.layouts.index')

@section('main')
    <div class="row">
        <div class="col-12 col-md-4">
            <x-display>
                <div class="resume_view">
                    <div class="resume_view-icon">
                        <x-icon name="supervised_user_circle"></x-icon>
                    </div>
                    <p>
                        vous avez {{ \App\Models\User::query()->count() }} utilisateur(s) dans votre base de données.
                        cliquez sur le bouton ci-dessous pour voir tous les utilisateurs
                    </p>
                    <x-a
                        svg="supervised_user_circle"
                        :label="strtoupper('Tous les utilisateurs')"
                        type="primary"
                        :href="route('users.index')"></x-a>
                </div>
            </x-display>
        </div>
        <div class="col-12 col-md-4">
            <x-display>
                <div class="resume_view">
                    <div class="resume_view-icon">
                        <x-icon name="home_repair_service"></x-icon>
                    </div>
                    <p>
                        vous avez {{ \App\Models\Service::query()->count() }} service(s) dans votre base de données.
                        cliquez sur le bouton ci-dessous pour voir tous les services
                    </p>
                    <x-a
                        svg="home_repair_service"
                        :label="strtoupper('Tous les services')"
                        type="primary"
                        :href="route('services.index')"></x-a>
                </div>
            </x-display>
        </div>
        <div class="col-12 col-md-4">
            <x-display>
                <div class="resume_view">
                    <div class="resume_view-icon">
                        <x-icon name="mark_email_unread"></x-icon>
                    </div>
                    <p>
                        vous avez {{ \App\Models\Letter::query()->count() }} lettre(s) dans votre base de données.
                        cliquez sur le bouton ci-dessous pour voir tous les lettres (Envoyer ou réceptionner)
                    </p>
                    <x-a
                        svg="mark_email_unread"
                        :label="strtoupper('Tous les lettres')"
                        type="primary"
                        :href="route('letters.index')"></x-a>
                </div>
            </x-display>
        </div>
    </div>
    <div class="row align-items-center">
        <div class="col-12 col-md-8">
            <x-display>
               <div class="row justify-content-between align-items-center">
                   <div class="col-auto">
                       <h6 style="color: #9ca3af;text-transform: uppercase;">
                           <strong>Lettres récentes</strong>
                       </h6>
                   </div>
                   <div class="col-auto">
                       <a style="text-decoration: none;text-transform: uppercase;font-weight: 600;" href="{{ route('letters.index') }}">Voir plus</a>
                   </div>
               </div>
                @if(count(json_decode($data))>0)
                    <div id="table-wrapper"
                         class="table-wrapper-flat"
                         data-message="Voulez-vous vraiment supprimer cette donnée ?"
                         data-paginate="5"
                         data-actionWidth="116"
                         data-columns="{{ json_encode($columns) }}"
                         data-data="{{ $data }}"></div>
                @else
                    <div id="index-view-body-empty">
                        <div>
                            @php
                                require_once resource_path().DIRECTORY_SEPARATOR.'views'.DIRECTORY_SEPARATOR.'svg'.DIRECTORY_SEPARATOR.'empty.svg';
                            @endphp
                            <h3>
                                Aucune lettre trouvée
                                <span>...</span>
                            </h3>
                        </div>
                    </div>
                @endif
            </x-display>
        </div>
        <div class="col-12 col-md-4">
            <x-display>
                @if(!is_null($state))
                <x-chart
                    type="pie"
                    :data="$state"
                    label="Statistique"
                    height="316"></x-chart>
                @else
                    <div id="index-view-body-empty">
                        <div>
                            @php
                                require_once resource_path().DIRECTORY_SEPARATOR.'views'.DIRECTORY_SEPARATOR.'svg'.DIRECTORY_SEPARATOR.'statistics.svg';
                            @endphp
                            <h3>
                                Statistique indisponible
                                <span>...</span>
                            </h3>
                        </div>
                    </div>
                @endif
            </x-display>
        </div>
    </div>
@endsection

@section('title')
    Tableau de bord
@endsection
