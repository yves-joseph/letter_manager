@if($errors->any())
    <x-alert
        type="warning"
        :message="$errors->all()"
        type="danger"
        icon="report"
        position="topRight"></x-alert>
@endif
