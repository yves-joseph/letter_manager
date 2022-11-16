@props([
    'label'=>'',
    'value'=>[],//[{value:"",color:"",disabled:false,editable:false}]
    'id'=>\Illuminate\Support\Str::random(),
    'required'=>false,
    'userInput'=>true
])
{{ dump(!$userInput) }}
<div class="kh-input-custom">
    <input
        @if($required) required @endif
        @if(!$userInput) data-user-input="true" @endif
        type="text"
        value="{{ json_encode($value) }}"
        style="width: auto !important;"
        {{ $attributes->merge(['class'=>'___tag-fields']) }}>
    <label for="{{ $id }}" style="margin-bottom: 6px;">
        {{ $label }}
        @if($required)
            <span>**</span>
        @endif
    </label>
</div>

