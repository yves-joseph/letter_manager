
export default function translateModalToggle() {
    const btn = document.getElementById('kh-app-nav-translate-btn'),
        modal = document.getElementById('kh-app-nav-translate-container');

    if (btn && modal) {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (modal.style.display === "none") modal.style.display = "block";
            else modal.style.display = "none";
        });

        document.documentElement.addEventListener("click", () => modal.style.display = "none");

        window.addEventListener('scroll', () => {
            if (modal.style.display === 'block') modal.style.display = "none";
        });

    }
}
