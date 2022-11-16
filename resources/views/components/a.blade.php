@props([
    'label',
    'type'=>'default',
    'href'=>'#',
    'disabled'=>false,
    'id'=>\Illuminate\Support\Str::random(),
    'icon'=>null,
    'svg'=>null
    ])

<div class="kh-button-custom {{ $type }} @if($disabled) disabled @endif">
    <a @if(!$disabled)
          href="{{ $href }}"
       @endif
       {{ $attributes }}
       id="{{ $id }}">
        @if($icon)
            <span class="{{ $icon }}"></span>
        @endif
        @if($svg)
            <x-icon :name="$svg"></x-icon>
        @endif
        {{ $label }}
    </a>
</div>
