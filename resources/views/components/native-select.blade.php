@props([
    'label',
    'id'=>\Illuminate\Support\Str::random()
])

<div class="kh-input-custom">
    <select
        id="{{ $id }}"
        {{ $attributes }}>
        {{ $slot }}
    </select>
    <label for="{{ $id }}">
        {{ $label }}
    </label>
</div>
