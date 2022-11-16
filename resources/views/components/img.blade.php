@props([
    'width'=>'300',
    'height'=>'300',
    'fit'=>'crop',
    'src'
])

<img  {{ $attributes }}  src="/images/<?=$src?>.jpg?w=<?=$width?>&h=<?=$height?>&fit=<?=$fit?>">
