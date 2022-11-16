@props([
    'state'=>false,
    'enable'=>'Activé',
    'disabled'=>'Désactivé',
    'classNameEnable'=>'',
    'classNameDisable'=>''
])

<div class="state-view">
    @if($state)
        <div class="state-view-enable {{ $classNameEnable  }}">
            {{ $enable }}
        </div>
    @else
        <div class="state-view-disabled {{ $classNameDisable }}">
            {{ $disabled }}
        </div>
    @endif
</div>
