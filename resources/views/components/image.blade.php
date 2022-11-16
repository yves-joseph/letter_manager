
@props([
    'name',
    'url',
    'rounded'=>"",
    'width'=>'64px',
    'fontSize'=>'1.2rem',
    'scale'=>'1',
])

<div class="image_profile {{ $rounded  }}"
     style="width: {{ $width }};height: {{ $width  }};font-size: {{ $fontSize }};transform: scale({{ $scale }});">
    @if($url)
        <img
            src="{{ $url }}"
            height="{{ $width }}"
            width="{{ $width }}"
            alt="{{ $name }}"
            decoding="async">
    @else
        {{ wordInitial($name) }}
    @endif
</div>
