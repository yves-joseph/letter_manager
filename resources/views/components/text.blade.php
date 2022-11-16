@props([
    'label',
    'content'=>'',
    'color'=>''
])



<div class="kh-text">
    @if($label)
        <span class="kh-text-label">{!! $label !!}</span>
    @endif
    <div class="kh-text-content {{ $color }}">
        {!! $content !!}
    </div>
</div>
