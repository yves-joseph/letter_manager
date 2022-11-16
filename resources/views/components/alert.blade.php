@props([
    'message'=>'',
    'icon'=>'add',
    'position'=>'topRight',
    'type'=>'warning'
])
<div id="group-alert" class="{{ $position }}">
    @if(is_array($message))
        @foreach($message as $item)
            <div class="_alert {{ $type }}">
                <div class="_alert-icon">
                    <x-icon
                        :name="$icon"
                        type="baseline"></x-icon>
                </div>
                <div class="_alert-content">
                    {{ $item }}
                </div>
                <div class="_alert-content-close">
                    <button>&times;</button>
                </div>
            </div>
        @endforeach
    @else
        <div class="_alert {{ $type }}">
            <div class="_alert-icon">
                <x-icon
                    :name="$icon"
                    type="baseline"></x-icon>
            </div>
            <div class="_alert-content">
                {{ $message }}
            </div>
            <div class="_alert-content-close">
                <button>&times;</button>
            </div>
        </div>
    @endif
</div>
