
@props([
    'color'=>'primary',
    'title',
    'content',
    'open'=>false,
    'badge',
    'icon',
])

<div class="koroph-panel">
    <header class="{{ $color }}">
        @if($badge)
            <div class="koroph-panel-badge">
            <span>
                {{ $badge }}
            </span>
            </div>
        @endif
        <div class="koroph-panel-text">
            @if($icon)
                <span class="{{ $icon }}"></span>
            @endif
            {{ $title }}
        </div>
        <div class="koroph-panel-indicator">
            <button
                type="button"
                class="icon-ctrl ripper koroph-panel-indicator-button {{ $open ? 'panel-show':'' }}">
            </button>
        </div>
    </header>
    <div class="koroph-panel-content {{ $open ? 'open':'close' }}">
        {!! $content !!}
    </div>
</div>
