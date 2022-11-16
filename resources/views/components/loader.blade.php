@props([
    'id'=>\Illuminate\Support\Str::random(),
    'height'=>'48px',
    'width'=>'48px',
    'visible'=>'visible',
])

<span id="{{ $id }}"
      style="height: {{ $height }} ;width: {{ $width }};visibility:{{ $visible ?? 'visible' }} "
      class="loader"></span>
