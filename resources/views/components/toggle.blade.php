<!--
options={id=null,disabled=false,value=false,on,off}
-->
@props([
    'id'=>\Illuminate\Support\Str::random(),
    'disabled'=>false,
    'value'=>false,
    'on'=>'activé',
    'off'=>'désactivé'
])

<div id="koroph-page-content">
    <button
        type="button" {{ $disabled ? "disabled":"" }}
    data-link="{{ $url }}"
        class="btn-toggle {{ $value === true ? "active":"in_active" }}">
            <span class="active">
                {{ $on }}
            </span>
        <span class="in_active">
                {{ $off  }}
            </span>
    </button>
</div>
