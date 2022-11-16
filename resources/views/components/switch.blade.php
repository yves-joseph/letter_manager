@props([
    'label',
    'on'=>'Actif',
    'off'=>'Inactif',
    'checked'=>false,
    'position'=>'start',
    'id'=>\Illuminate\Support\Str::random(),
    ])

<!--
options={name,value=false,position="end",id=null}
-->
<div class="kh-switch">
    @if($position==='start')
        <span class="kh-switch-lbl">{{ $label }}</span>
    @endif
    <input
        data-on="{{ $on }}"
        data-off="{{ $off }}"
        type="checkbox"
        id="{{ $id  }}"
        @checked($checked)
        {{ $attributes }}
        class="kh-switch-input kh-switch-field">
    <label
        for="{{ $id }}"
        class="kh-switch-label"></label>
    @if($position==='end')
        <span class="kh-switch-lbl">
            {{ __($label) }}
        </span>
    @endif
</div>
