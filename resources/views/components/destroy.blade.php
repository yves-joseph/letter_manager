@props([
    'label',
    'disabled'=>false,
    'id'=>\Illuminate\Support\Str::random(),
    'url',
    'icon'=>null,
    'svg'=>null
    ])

<form @if($disabled) disabled="" @endif
      action="{{ $url }}"
      method="post" class="destroy-form">
    @method('DELETE')
    @csrf
    <x-button
        :label="$label"
        type="button"
        className="danger destroy-item upper"
        value="c"
        name="_btn"
        :icon="$icon"
        :svg="$svg"></x-button>
</form>
