@props([
    'placeholder'=>'',
    'label'=>'',
    'id'=>\Illuminate\Support\Str::random(),
])
<div class="kh-input-custom">
    <select style="display: none;"
            placeholder="{{ $placeholder }}"
            id="{{ $id }}"
        {{ $attributes->merge(['class'=>'custom-select ____custom-select']) }}>
        @if($placeholder)
            <option value="">{{ $placeholder }}</option>
        @endif
        {{ $slot }}
    </select>
    <label for="{{ $id }}" style="margin-bottom: 4px;">
        {{ $label }}
    </label>
</div>
