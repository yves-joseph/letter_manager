@props([
    'url',
    'label',
    'enabled'=>true
    ])
<a @if($enabled) href="{{ $url }}" @endif
   class="kh-app-body-content-link-nav-container-item" >
    <span>{{ $label  }}</span>
</a>
