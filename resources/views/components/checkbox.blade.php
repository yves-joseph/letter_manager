@props(['label','id'=>\Illuminate\Support\Str::random()])

<div class="kh-checkbox">
    <input type="checkbox" {{ $attributes }} id="{{ $id ?? $_id }}">
    <label for="{{ $id ?? $_id }}">
        {{ $label }}
    </label>
</div>
