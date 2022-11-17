<div id="kh-app-side-bar"
     style="background-image: linear-gradient(to bottom, rgba(1,105,1,0.44), rgba(1,134,1,0.8)), url({{ asset('storage/system/side-bar.jpg') }});">
    <header id="kh-app-side-bar-header">
        <div>
            <div>
                <img
                    src="{{ asset('storage/system/logo.png') }}"
                    width="45"
                    height="45"
                    decoding="async"
                    alt="{{ config('app.name', 'TAM') }}">
            </div>
            <strong>
                {{ config('app.name', 'TAM') }}
            </strong>
        </div>
    </header>
    <div id="kh-app-side-bar-link">
        @foreach(config('menu',[])  as $link)
            @granted($link['permission'])
            {{--@if($loop->last)
                <div style="flex: 1;"></div>
            @endif--}}
            <x-side-bar-link
                :label="$link['title']"
                :subLabel="$link['title_small']"
                :routeName="$link['path']"
                :moreRouteName="$link['pathOther']"
                :icon="$link['icon']"></x-side-bar-link>
            @endgranted
        @endforeach
    </div>
</div>
