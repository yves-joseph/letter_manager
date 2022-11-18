@props([
    'label',
    'content'=>null,
    'color'=>''
])



<div class="kh-text">
    @if($label)
        <span class="kh-text-label">{!! $label !!}</span>
    @endif
    <div class="kh-text-content {{ $color }}">
        @if(!is_null($content))
        {!! $content !!}
        @else
            {{ $slot }}
        @endif
    </div>
</div>
