export default function invoicePrint() {
    const btnPrint = document.getElementById('print-invoice'),
        viewPrint = document.getElementById('invoice_view_print');

    if (btnPrint && viewPrint) {
        btnPrint.addEventListener("click", function () {
            viewPrint.contentWindow.print();
        });
    }
}