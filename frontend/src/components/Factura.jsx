import { jsPDF } from 'jspdf';

export const generarFactura = (carrito) => {
  const doc = new jsPDF();

  // Configuración
  const marginLeft = 15;
  const marginTop = 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const logoWidth = 30;
  const logoHeight = 15;
  const lineHeight = 8;

  // Dimensiones de la tabla
  const tableWidth = pageWidth - marginLeft * 2;
  const colWidth1 = 100; // Producto
  const colWidth2 = 30;  // Cantidad
  const colWidth3 = 40;  // Total (fijo para alineación consistente)

  // Posiciones de columnas
  const col1X = marginLeft;
  const col2X = col1X + colWidth1;
  const col3X = col2X + colWidth2;
  const rightEdge = marginLeft + tableWidth;

  // 1. Encabezado con logo y título
  try {
    const logoUrl = '/images/logo.jpg';
    doc.addImage(logoUrl, 'JPEG', marginLeft, marginTop, logoWidth, logoHeight);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    const title = 'TiInvenFact Pro';
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, marginTop + logoHeight / 2 + 5);
  } catch (error) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('InvenFact Pro', marginLeft, marginTop + 10);
  }

  // 2. Subtítulo
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.text('FACTURA DE COMPRA', pageWidth / 2, marginTop + logoHeight + 15, { align: 'center' });

  // 3. Información de la factura
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  const fecha = new Date().toLocaleDateString();
  const numeroFactura = Date.now().toString().slice(-6);
  doc.text(`Fecha: ${fecha}`, marginLeft, marginTop + logoHeight + 30);
  doc.text(`N°: ${numeroFactura}`, pageWidth - marginLeft, marginTop + logoHeight + 30, { align: 'right' });

  // 4. Tabla de productos
  let y = marginTop + logoHeight + 50;
  const cellHeight = 10;

  // Línea superior de la tabla
  doc.line(marginLeft, y, rightEdge, y);

  // Encabezado de tabla
  doc.setFillColor(240, 240, 240);
  doc.rect(marginLeft, y, tableWidth, cellHeight, 'F');

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('PRODUCTO', col1X + 5, y + 7);
  doc.text('CANT.', col2X + colWidth2 / 2, y + 7, { align: 'center' });
  doc.text('TOTAL', rightEdge - colWidth3 / 2, y + 7, { align: 'center' });

  // Líneas verticales
  doc.line(col1X, y, col1X, y + cellHeight);
  doc.line(col2X, y, col2X, y + cellHeight);
  doc.line(col3X, y, col3X, y + cellHeight);
  doc.line(rightEdge, y, rightEdge, y + cellHeight);

  // Línea debajo del encabezado
  doc.line(marginLeft, y + cellHeight, rightEdge, y + cellHeight);
  y += cellHeight;

  // Productos
  doc.setFontSize(11);
  carrito.forEach(item => {
    doc.text(item.nombre.substring(0, 30), col1X + 5, y + 7);
    doc.text(`x${item.cantidad}`, col2X + colWidth2 / 2, y + 7, { align: 'center' });
    doc.text(`$${(item.precio * item.cantidad).toFixed(2)}`, rightEdge - colWidth3 / 2, y + 7, { align: 'center' });

    // Línea horizontal entre productos
    doc.line(marginLeft, y + cellHeight, rightEdge, y + cellHeight);
    y += cellHeight;
  });

  // 5. Sección de totales - Ahora con posición dinámica fija
  const totalSectionY = Math.max(y + 10, marginTop + logoHeight + 50 + (carrito.length * cellHeight) + 30);
  
  // Línea separadora antes de totales
  doc.line(marginLeft, totalSectionY - 5, rightEdge, totalSectionY - 5);

  // Subtotal
  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  doc.setFontSize(12);
  doc.text('Subtotal:', rightEdge - colWidth3 - 5, totalSectionY, { align: 'right' });
  doc.text(`$${total.toFixed(2)}`, rightEdge - 5, totalSectionY, { align: 'right' });

  // Envío
  doc.text('Envío:', rightEdge - colWidth3 - 5, totalSectionY + lineHeight, { align: 'right' });
  doc.text('Gratis', rightEdge - 5, totalSectionY + lineHeight, { align: 'right' });

  // Línea antes del total final
  doc.line(marginLeft, totalSectionY + lineHeight + 5, rightEdge, totalSectionY + lineHeight + 5);

  // Total
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 100, 0);
  doc.text('Total:', rightEdge - colWidth3 - 5, totalSectionY + lineHeight * 2 + 5, { align: 'right' });
  doc.text(`$${total.toFixed(2)}`, rightEdge - 5, totalSectionY + lineHeight * 2 + 5, { align: 'right' });

  // Línea inferior de la sección de totales
  doc.line(marginLeft, totalSectionY + lineHeight * 2 + 10, rightEdge, totalSectionY + lineHeight * 2 + 10);

  // 6. Información de la empresa centrada
  const finalY = totalSectionY + lineHeight * 2 + 20;
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.setFont('helvetica', 'normal');

  const empresaInfo = [
    'InvenFact Pro',
    'NIT: 123456789-0',
    'Ubicación: Villeta, Cundinamarca',
    'Teléfono: 314 297 5647',
    'Correo: contacto@InvenFactPro.com'
  ];

  empresaInfo.forEach((line, index) => {
    doc.text(line, pageWidth / 2, finalY + (index * lineHeight), { align: 'center' });
  });

  // 7. Mensaje final
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('¡Gracias por su compra!', pageWidth / 2, pageHeight - 20, { align: 'center' });
  doc.text('Para reclamos o devoluciones contactar dentro de las 48 horas siguientes',
    pageWidth / 2, pageHeight - 15, { align: 'center' });

  return doc;
  
};