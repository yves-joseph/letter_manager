@props([
    'name',
    'label'=>'',
    'required'=>false,
    'url'=>null,
    'icon'=>'file',
    'width'=>'200px',
    'height'=>'200px',
])
<div class="kh-img-loader"
     style="width: {{ $width }} ;height: {{ $height }} ;">
    <div class="kh-img-loader-image" style="max-height: calc({{ $height }} - 38px);display:{{ is_null($url)   ? " none":"block" }};padding:{{ $url  ? " 16px":"2px" }};">
        <img
            {{ $attributes }}
            src="{{ $url ?? '' }}"
            alt="">
    </div>
    <input
       @if($required)
           required
       @endif
        accept="image/*"
        name="{{ $name }}"
        style="display: none;"
        type="file">
    <div  style="display:{{ is_null($url) && empty($url)  ? "flex":"none" }};padding:{{ $url  ? " 16px":"2px" }}">
        @if($icon)
            @php
                require resource_path()."/views/svg/".$icon.".svg";
            @endphp
        @endif
    </div>
    <small>
        {{ $label }}
        @if($required)
            <sup>**</sup>
        @endif
    </small>
</div>
