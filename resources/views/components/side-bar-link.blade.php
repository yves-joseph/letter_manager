
@props([
    'label',
    'subLabel',
    'routeName',
    'moreRouteName',
    'icon',
    ])

@php
    $state =  link_active($routeName,...$moreRouteName??[])
@endphp

<div class="kh-app-side-bar-link-item">
    <a href="{{ route($routeName.'.index') }}"
       class="kh-app-side-bar-link-item-a {{ $state }}">
        <div class="kh-app-side-bar-link-icon">
            <x-icon :name="$icon" :type="$state == 'active' ? 'outline':'baseline'"></x-icon>
        </div>
        <div class="kh-app-side-bar-link-label">{{ __($label) }}</div>
        <div class="kh-app-side-bar-link-label_small">{{ __($subLabel) }}</div>
    </a>
</div>
