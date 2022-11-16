@props(['label','id'=>\Illuminate\Support\Str::random()])

@php
 $_id=\Illuminate\Support\Str::random();
@endphp
<div class="kh-radio">
    <input type="radio" {{ $attributes }} id="{{ $id ?? $_id }}">
    <label for="{{ $id ?? $_id }}">
        {{ $label }}
    </label>
</div>
