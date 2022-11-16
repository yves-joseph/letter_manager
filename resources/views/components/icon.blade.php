@props(['name','type'=>'baseline'])
@php
    require resource_path()."/views/icon/svg/".$name."/".$type.".svg";
@endphp
