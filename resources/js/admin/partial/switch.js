export default function switchValueToggle(){
    const fields=document.getElementsByClassName('kh-switch-field');

    if (fields.length){
        for (let i = 0; i < fields.length; i++) {
            fields.item(i).addEventListener('click',function (){
                if(this.checked){
                    this.value=this.dataset.on;
                }else {
                    this.value=this.dataset.off;
                }
            });
        }
    }
}