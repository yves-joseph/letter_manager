@error('login')
<div id="welcome-message">
    Content de vous revoir
    <strong>{{ \Illuminate\Support\Facades\Auth::user()->firstname }}</strong> !
    <button id="welcome-message-close" onclick="this.parentElement.remove()">
        Fermer
    </button>
</div>
@enderror
