@props([
    'action',
    'header'=>null,
    'method'=>'post',
    'single'=>false
])
<form id="insert-view" action="{{ $action }}" method="post" enctype="multipart/form-data">
    @if($header)
        <div id="insert-view-header">
            {{ $header }}
        </div>
    @endif
    <div id="insert-view-body">
        {!! $slot !!}
    </div>
    <div id="insert-view-btn">
        @if($method === 'post' && $single===false)
            <div style="margin-right: 14px;">
                <x-button
                    label="Enregistrer et continuer"
                    svg="published_with_changes"
                    type="submit"
                    className="default upper"
                    name="_btn"
                    value="c"></x-button>
            </div>
        @endif
        <x-button
            :label="$method === 'put' ? 'Mise à jour':'Enregistrer'"
            svg="published_with_changes"
            type="submit"
            name="_btn"
            className="primary upper"
            value="n"></x-button>
    </div>
    @csrf
    @if($method === 'put')
        @method('PUT')
    @endif
</form>
