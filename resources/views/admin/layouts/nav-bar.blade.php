<nav id="kh-app-body-nav-bar">
    <div id="kh-app-body-nav-bar-toggle-menu">
        <button id="kh-app-body-nav-bar-toggle-menu-btn"
                class="{{ ($_COOKIE['_visual_side_bar_state'] ?? "") !== "" ? 'close':''  }}">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
    {{-- <div id="kh-app-body-nav-bar-search-view">
        <input type="search" id="global_search" placeholder="Recherche...">
        <label for="global_search" class="icon-search"></label>
        <div id="kh-app-body-nav-bar-search-view-content">
            @for($i=1;$i<10;$i++)
            <a href="#" style="display: none" class="kh-app-body-nav-bar-search-view-content-item" data-name="{{ $i }}" data-matricule="4{{ $i }}2{{ $i }}451">
                <div class="kh-app-body-nav-bar-search-view-content-item-value">
                    Lorem ipsum dolor sit amet, adipisicing elit {{ $i }}.
                </div>
                <div class="kh-app-body-nav-bar-search-view-content-item-value">
                    <span class="icon-cart"></span>
                </div>
                <div class="kh-app-body-nav-bar-search-view-content-item-value">
                    <a href="#" class="icon-tree"></a>
                </div>
            </a>
            @endfor
        </div>
    </div>--}}
    <div class="kh-app-body-nav-bar-item">
        <div class="kh-app-body-nav-bar-item-img" id="kh-app-body-nav-bar-item-btn">
            <x-image-profile
                :name="Auth::user()->lastname.' '.Auth::user()->firstname"
                :url="Auth::user()->image->url ?? null"
                rounded="rounded"
                width="42px"
                fontSize="0.8rem"
                scale="1.1"
            ></x-image-profile>
        </div>
        <div class="kh-app-body-nav-bar-item-sub-menu-container" style="display: none;">
            <header>
                <div class="row" style="justify-content: space-between;">
                    <div class="col-2">
                        <x-image-profile
                            :name="Auth::user()->lastname.' '.Auth::user()->firstname"
                            :url="Auth::user()->image->url ?? null"
                            rounded="rounded"
                            width="40px"
                            fontSize="0.8rem"
                            scale="1.1"></x-image-profile>
                    </div>
                    <div class="col-9" style="text-align: left;">
                        <div>
                            <strong title="{{ Auth::user()->lastname." ".Auth::user()->firstname }}">
                                {{ Auth::user()->lastname." ".Auth::user()->firstname }}
                            </strong>
                        </div>
                        <small>
                            {{ Auth::user()->email }}
                        </small>
                    </div>
                </div>
            </header>
            <div class="kh-app-body-nav-bar-item-sub-menu-item">
                <a href="{{ route('users.show',['user'=>Auth::id()]) }}"
                   class="kh-app-body-nav-bar-item-sub-menu-item-link">
                    <x-icon name="manage_accounts" type="outline"></x-icon>
                    <span>
                        Gérer mon compte
                    </span>
                </a>
            </div>
            <div class="kh-app-body-nav-bar-item-sub-menu-item">
                <a href="#"
                   onclick="event.preventDefault();this.nextElementSibling.submit();"
                   class="kh-app-body-nav-bar-item-sub-menu-item-link">
                    <x-icon name="power_settings_new" type="outline"></x-icon>
                    <span>
                        Déconnexion
                    </span>
                </a>
                <form action="{{ route('users.logout') }}" method="post" style="display: none;">
                    @csrf
                </form>
            </div>
        </div>
    </div>
</nav>
