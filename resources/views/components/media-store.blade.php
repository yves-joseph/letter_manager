@props([
    'name',
    'value'=>null,
    'url'=>null,
    'reset_url'=>null,
    'bg'=>'#e7eced',
    'width'=>'0',
    'raw_width'=>'172px',
    'height'=>'0',
    'raw_height'=>'172px',
    'label',
    'icon'=>'file',
    'id'=>\Illuminate\Support\Str::random(),
    'inputId'=>\Illuminate\Support\Str::random(),
    'imgClass'=>\Illuminate\Support\Str::random(),
    'required'=>false,
    'prefix'=>\Illuminate\Support\Str::random(),
    'reload'=>false,
    'className'=>null,
    'file_prefix'=>'all'
])

<div
    style="width:{{ $raw_width }};height:{{ $raw_height }};background-color:{{ $bg }} ;margin-bottom: 32px">
    <div class="{{ $className ?? 'img-media-store' }}"
         id="{{ $id  }}"
         data-img_class="{{ $imgClass }}"
         data-reload="{{ $reload ? 'true' : 'false' }}"
         data-input_id="{{ $inputId }}"
         data-width="{{ $width }}"
         data-height="{{ $height }}"
         data-prefix="{{ $prefix }}"
         data-url-old="old_{{ $name }}_url"
         data-file-prefix="{{ $file_prefix }}">
        <div class="media-store-img_icon">
            <div class="media-store-img_">
                <img
                    class="{{ $imgClass }} media-store-img_img"
                    src="{{ $url ?? '' }}"
                    alt=""
                    style="display:{{ is_null($url)  ? 'none':'block' }}">
            </div>
            <input type="hidden" name="old_{{ $name }}_url">
            <input
                style="display: none;"
                type="text"
                class="media-store-img_input"
                id="{{ $inputId }}"
                {{ $required ? 'required':'' }}
                name="{{ $name }}"
                value="{{ $value }}">
            <div class="media-store-icon"
                 style="display:{{ is_null($url) ? 'block':'none' }}">
                @php
                    require resource_path()."/views/svg/".$icon.".svg";
                @endphp
            </div>
        </div>
        @if($label)
            <h6>
                    <span>
                        {{ $label }}
                        <small>{{ $required === true ? '**':'' }}</small>
                    </span>
                @if(!is_null($reset_url))
                    <button class="btn_media_store_reset"
                            data-url="{{ $reset_url ?? '' }}"
                            type="button">
                        <x-icon name="delete"></x-icon>
                    </button>
                @endif
            </h6>
        @endif
    </div>
</div>
