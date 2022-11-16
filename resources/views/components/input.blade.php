@props([
    'label',
    'id'=>\Illuminate\Support\Str::random(),
    'description'=>null,
    'subLabel'=>null,
    'required'=>false
])

<div class="kh-input-custom">
    <small class="input-description">
        {{ $description ?? '' }}
    </small>
    <input
        @if($required)
            required
        @endif
        {{ $attributes->merge(['class'=>'kh-input-field']) }}
        id="{{ $id }}">
    <label for="{{ $id }}">
        {{ $label }}
        @if($required)
            <span>**</span>
        @endif
    </label>
    @if($subLabel)
        <span class="sub-label"> {{ $subLabel}} </span>
    @endif
</div>

