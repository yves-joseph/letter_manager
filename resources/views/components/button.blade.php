@props([
    'label',
    'className'=>'primary',
    'id'=>\Illuminate\Support\Str::random(),
    'icon'=>null,
    'svg'=>null
    ])

<div class="kh-button-custom {{ $className }}">
    <button
        {{ $attributes }}
        id="{{ $id }}">
        @if($icon)
            <span class="{{ $icon }}"></span>
        @endif
        @if($svg)
            <x-icon :name="$svg"></x-icon>
        @endif
        {{ $label }}
    </button>
</div>
