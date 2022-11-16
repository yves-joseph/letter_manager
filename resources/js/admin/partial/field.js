export default function activeFieldParent() {
    const inputField = document.getElementsByClassName('kh-input-field');
    if (inputField.length) {
        for (let i = 0; i < inputField.length; i++) {
            inputField.item(i).addEventListener('focus', function () {
                inputField.item(i).parentElement.classList.add('active');
            });
            inputField.item(i).addEventListener('blur', function () {
                if (this.value.toString().trim() === "")
                    inputField.item(i).parentElement.classList.remove('active');
            });
        }
    }
}