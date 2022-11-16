<x-a
    label=""
    type="primary"
    href=""
    icon=""
    disabled="false"
    svg=""></x-a>

<x-alert
    message=""
    position="topRight"
    icon="bin"
    position="bottomRight|topLeft|bottomLeft|topRight"
    type="warning"></x-alert>
<x-input
    label=""
    id=""
    description=""
    subLabel=""
    required=""></x-input>
<x-textarea
    label=""
    id=""
    description=""
    subLabel=""
    required=""></x-textarea>
<x-img
    width=""
    height=""
    fit=""
    src=""></x-img>

<x-text
    label=""
    content=""
    color=""></x-text>
<x-image-profile
    name=""
    url=""
    rounded=""
    width=""
    font-size=""
    scale=""></x-image-profile>
<x-button
    label=""
    className=""
    id=""
    url=""
    icon=""
    svg=""></x-button>

<x-checkbox
    label=""
    id=""></x-checkbox>
<x-radio
    label=""
    id=""></x-radio>

<x-data-view
    created=""
    updated=""></x-data-view>

<x-destroy
    label=""
    disabled=""
    url=""
    icon=""
    svg=""
    id=""></x-destroy>

<x-display>
    <x-slot:header></x-slot:header>
    <x-slot:section></x-slot:section>
</x-display>
<x-index message="" actionWidth="164" paginate="25" :columns="" :data="">
    <x-slot:header></x-slot:header>
</x-index>

<x-insert :method="post" :single="false">
    <x-slot:header></x-slot:header>
</x-insert>

<x-navigate-bar>
    <x-slot:right></x-slot:right>
</x-navigate-bar>
<x-navigate-bar-link
    url=""
    label=""></x-navigate-bar-link>
<x-icon
    name=""
    type="baseline"></x-icon>
<x-panel
    color=""
    title=""
    content=""
    open=""
    badge=""
    icon=""></x-panel>
<x-tr-action
    show=""
    edit=""
    delete=""></x-tr-action>
<x-side-bar-link
    label=""
    subLabel=""
    routeName=""
    icon=""></x-side-bar-link>
<x-state
    state=""
    enable=""
    disabled=""
    classNameEnable=""
    classNameDisable=""></x-state>
<x-image-picker
    name=""
    url=""
    required="false"
    icon="file"
    width="200px"
    height="200px"></x-image-picker>

<native-select label="" id=""></native-select>

<x-chart
    type="bar"
    data=""
    label="Statistique"
    height="350"></x-chart>
<x-tag
    name=""
    value="" {{--[{value:"",color:"",disabled:false,editable:false}]--}}
    data-whitelist=","
    data-user-input="true"
    label="Fonctionnalité"
    readonly=""
    placeholder="My test.."
    data-blacklist="yves,koffi"></x-tag>
<x-select
    placeholder="ok..."
    multiple=""
    label="Country"></x-select>

<x-group
    :label=""
    :name=""
    :value=""></x-group>

<x-switch
    label=""
    on=""
    off=""
    id=""
    position="start"
    name=""></x-switch>
