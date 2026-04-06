import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Papa from 'papaparse';

export function exportToCSV(data: any[], filename: string) {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function exportToPDF(data: any[], columns: string[], filename: string, title: string) {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Exported on ${new Date().toLocaleString()}`, 14, 30);

  const tableData = data.map(item => columns.map(col => item[col] || ''));

  autoTable(doc, {
    head: [columns.map(col => col.charAt(0).toUpperCase() + col.slice(1))],
    body: tableData,
    startY: 35,
    theme: 'striped',
    headStyles: { fillColor: [59, 130, 246] }, // primary blue
  });

  doc.save(`${filename}.pdf`);
}
