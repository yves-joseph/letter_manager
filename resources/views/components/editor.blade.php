@props([
    'required'=>false,
    'label',
    'name',
    'id'=>\Illuminate\Support\Str::random(),
    'value'=>'',
    'placeholder'=>'',
    'description'=>null
])

<div class="kh-input-custom">
    @if($description)
        <small class="input-description">
            {{ $description }}
        </small>
    @endif
    <div class="document-editor">
        <div
            id="{{ $id }}"
            link-file-url="#"
            name="{{ $name }}"
            class="pb-editor"
            placeholder="{{ $placeholder  }}">
            {!! $value !!}
        </div>
    </div>
    <label for="{{ $id }}">
        {{ $label }}
        @if($required)
            <span>**</span>
        @endif
    </label>
</div>
