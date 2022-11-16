@extends('admin.layouts.base')
@section('body')
    <div id="kh-app" class="{{ $_COOKIE['_visual_side_bar_state'] ?? '' }}">
        @include('admin.layouts.side-bar')
        <div id="kh-app-body">
            @include('admin.layouts.nav-bar')
            <div id="kh-app-body-content">
                @yield('navigate')
                <main>
                    @yield('main')
                    <div style="display: none"
                         id="kh-media-store-base"></div>
                </main>

                @include('admin.layouts.message.error')
                @include('admin.layouts.message.welcome')
                @include('admin.layouts.message.notice')
                @include('admin.layouts.message.offline')
            </div>
        </div>
    </div>
@endsection

@section('title')
    @yield('title')
@endsection
