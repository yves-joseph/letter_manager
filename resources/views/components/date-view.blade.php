@props([
    'created',
    'updated'
])
<div class="row">
    <div class="col-12 col-md-6">
        <x-text
            label="Date de création"
            :content="$created->format('d-m-Y')"></x-text>
    </div>
    <div class="col-12 col-md-6">
        <x-text
            label="Date de la dernière mise à jour"
            :content="$updated->format('d-m-Y')"></x-text>
    </div>
</div>
