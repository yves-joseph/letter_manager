@props([
    'label',
    'disabled'=>false,
    'value'=>[],
    'id'=>\Illuminate\Support\Str::random(),
    'name'=>''
    ])


<!--
options={disabled,checked,value={label,value,disabled,checked}}
-->

<div class="kh-group">
    <div class="kh-checkbox">
        <input
            id="_{{ $id }}"
            @disabled($disabled)
            data-target="_{{ $id }}"
            value="true"
            type="checkbox">
        <label for="_{{ $id }}">
            <strong>
                {{ __($label) }}
            </strong>
        </label>
    </div>
    <div style="margin-left: 24px;">
        @foreach($value['value'] as $item)
                <?php $__id = \Illuminate\Support\Str::random(); ?>
            <div>
                <div class="kh-checkbox">
                    <input
                        @disabled($item['disabled'])
                        @checked($item['checked']??false)
                        class="_{{ $id }}"
                        name="{{ $name }}[]"
                        id="_{{ $__id }}_"
                        value="{{ $item['value'] ?? "" }}"
                        type="checkbox">
                    <label for="_{{ $__id }}_">
                        {{  __($item['label']) }}
                    </label>
                </div>
            </div>
        @endforeach
       {{-- <input
            type="hidden"
            name="_role[]"
            value="">--}}
    </div>

</div>
