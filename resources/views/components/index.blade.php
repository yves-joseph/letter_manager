@props([
    'header'=>null,
    'columns'=>'[]',
    'data'=>'[]',
    'paginate'=>'25',
    'message'=>'Voulez-vous vraiment supprimer cette donnée ?',
    'actionWidth'=>'164',
    'empty'=>'Aucun résultat trouvé'
])
@php
    $row_count = count(json_decode($data));
@endphp
<div id="display-view">
    @if($header)
        <div id="display-view-header">
            {{ $header  }}
        </div>
    @endif
    @if(!$slot->isEmpty() && $row_count===0)
        {{ $slot }}
    @else
        <div id="display-view-body">
            @if($row_count>0)
                <div id="table-wrapper"
                     data-message="{{ $message }}"
                     data-paginate="{{ $paginate }}"
                     data-actionWidth="{{ $actionWidth }}"
                     data-columns="{{ $columns }}"
                     data-data="{{ $data }}"></div>
            @else
                <div id="index-view-body-empty">
                    <div>
                        @php
                            require_once resource_path().DIRECTORY_SEPARATOR.'views'.DIRECTORY_SEPARATOR.'svg'.DIRECTORY_SEPARATOR.'empty.svg';
                        @endphp
                        <h3>
                            {{ $empty }}
                            <span>...</span>
                        </h3>
                    </div>
                </div>
            @endif
        </div>
    @endif
</div>
