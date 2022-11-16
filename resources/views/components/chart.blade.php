<!--
  options={label="label",type="pie|line|bar|radar|doughnut|polarArea",height=350}
  data=[]
-->
@props([
    'type'=>'bar',
    'data'=>[],
    'label'=>'Statistique',
    'height'=>'350'
    ])
<div class="kh-chart-item">
    <canvas
        data-type="{{ $type }}"
        data-data="{{ json_encode($data) }}"
        data-label="{{ $label }}"
        class="kh-chart-item-content"
        style="width: 100%;height: {{ $height }}px;"></canvas>
    <div
        class="kh_loading preview-loading">
        <div class="chat-loading-message">
            <div>
                @php
                    include resource_path().DIRECTORY_SEPARATOR.'views'.DIRECTORY_SEPARATOR.'svg'.DIRECTORY_SEPARATOR.'statistic.svg';
                @endphp
            </div>
            <strong>
                Statistique...
            </strong>
        </div>
    </div>
</div>
