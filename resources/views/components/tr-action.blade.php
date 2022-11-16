@props(['show'=>null,'edit'=>null,'delete'=>null])

<td class="kh-action">
    @if($show)
        <a href="{{ $show }}"
           title="Affichage"
           class="icon-eye"></a>
    @endif
    @if($edit)
        <a href="{{ $edit }}"
           title="Edition"
           class="icon-pencil"></a>
    @endif
    @if($delete)
        <a href="{{ $delete }}"
           title="Suppression"
           class="icon-bin"></a>
    @endif
</td>
