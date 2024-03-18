$(function() {
  'use strict';

  /**
   * Generating PDF from HTML using jQuery
   */
  $(document).on('click', '#invoice_download_btn', function() {
    const content = $('#invoice_wrapper');
    const topLeftMargin = 20;
    const pdfWidth = content.width() + (topLeftMargin * 2);
    const pdfHeight = (pdfWidth * 1.5) + (topLeftMargin * 2);
    const canvasImageWidth = content.width();
    const canvasImageHeight = content.height();
    const totalPDFPages = Math.ceil(content.height() / pdfHeight) - 1;

    html2canvas(content[0], { allowTaint: true }).then(function(canvas) {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);

      for (let i = 0; i <= totalPDFPages; i++) {
        const currentHeight = (i === 0) ? canvasImageHeight : pdfHeight;
        pdf.addImage(imgData, 'JPG', topLeftMargin, topLeftMargin, canvasImageWidth, currentHeight);

        if (i < totalPDFPages) {
          pdf.addPage(pdfWidth, pdfHeight);
        }
      }

      pdf.save("invoice.pdf");
    });
  });
});
