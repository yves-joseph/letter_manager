@props([
    'header',
    'section'
])
<div id="display-view">
    @isset($header)
        <div id="display-view-header">
            {{ $header }}
        </div>
    @endisset
    @isset($section)
        <div>
            {!! $section !!}
        </div>
    @endisset
    <div id="display-view-body" class="padding">
        {!! $slot !!}
    </div>
</div>
