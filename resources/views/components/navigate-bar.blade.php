@props([
    'right' => null
])
<div class="kh-app-body-content-link-nav-container">
    {{ $slot }}
    @if($right)
        <div style="flex: 1;"></div>
        <div class="kh-app-body-content-link-nav-container-other">
            {!! $right !!}
        </div>
    @endif
</div>
