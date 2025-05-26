import jsPDF from 'jspdf';
import QRCode from 'qrcode';

export const generateTicketPDF = async (ticket) => {
  try {
    const pdf = new jsPDF();
    
    // Configurações do PDF
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Header com fundo escuro
    pdf.setFillColor(26, 26, 26);
    pdf.rect(0, 0, pageWidth, 60, 'F');
    
    // Logo texto Cuencos
    pdf.setTextColor(162, 0, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Cuencos', 20, 35);
    
    // Título do ingresso
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.text('INGRESSO ELETRÔNICO', pageWidth - 20, 35, { align: 'right' });
    
    // Linha divisória roxa
    pdf.setDrawColor(162, 0, 255);
    pdf.setLineWidth(2);
    pdf.line(20, 70, pageWidth - 20, 70);
    
    // Informações do evento
    let yPosition = 90;
    
    // Nome do evento
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    const eventTitle = ticket.eventTitle || 'Nome do Evento';
    pdf.text(eventTitle, 20, yPosition);
    yPosition += 25;
    
    // Data e hora
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(102, 102, 102);
    pdf.text('Data:', 20, yPosition);
    pdf.setTextColor(0, 0, 0);
    pdf.text(ticket.eventDate || 'Data não informada', 50, yPosition);
    yPosition += 18;
    
    // Local
    pdf.setTextColor(102, 102, 102);
    pdf.text('Local:', 20, yPosition);
    pdf.setTextColor(0, 0, 0);
    const location = ticket.eventLocation || 'Local não informado';
    // Quebrar texto longo se necessário
    const locationLines = pdf.splitTextToSize(location, pageWidth - 70);
    pdf.text(locationLines, 50, yPosition);
    yPosition += Math.max(18, locationLines.length * 6);
    
    // Tipo de ingresso
    pdf.setTextColor(102, 102, 102);
    pdf.text('Tipo:', 20, yPosition);
    pdf.setTextColor(0, 0, 0);
    pdf.text(ticket.ticketType || 'Ingresso Padrão', 50, yPosition);
    yPosition += 18;
    
    // Quantidade
    pdf.setTextColor(102, 102, 102);
    pdf.text('Quantidade:', 20, yPosition);
    pdf.setTextColor(0, 0, 0);
    pdf.text((ticket.quantity || 1).toString(), 80, yPosition);
    yPosition += 30;
    
    // Box com informações do portador
    pdf.setFillColor(245, 245, 245);
    pdf.rect(20, yPosition - 8, pageWidth - 40, 45, 'F');
    pdf.setDrawColor(200, 200, 200);
    pdf.rect(20, yPosition - 8, pageWidth - 40, 45);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DADOS DO PORTADOR', 25, yPosition + 8);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Nome: ${ticket.attendeeName || 'Não informado'}`, 25, yPosition + 22);
    pdf.text(`Email: ${ticket.attendeeEmail || 'Não informado'}`, 25, yPosition + 32);
    
    yPosition += 60;
    
    // Gerar QR Code com tamanho otimizado
    const qrCodeData = {
      ticketId: ticket.id || 'N/A',
      eventId: ticket.eventId || 'N/A',
      attendeeEmail: ticket.attendeeEmail || 'N/A',
      purchaseDate: ticket.purchaseDate || new Date().toISOString(),
      validationKey: `CUENCOS-${Date.now()}`
    };
    
    const qrCodeText = JSON.stringify(qrCodeData);
    
    // Calcular posições para garantir que o QR Code não seja cortado
    const qrSize = 70; // Reduzindo um pouco o tamanho
    const qrX = pageWidth - qrSize - 25; // Aumentando a margem direita
    const availableSpaceForFooter = 60; // Espaço necessário para o rodapé
    const requiredSpaceForQR = qrSize + 20; // QR Code + margem de segurança
    
    // Verificar se há espaço suficiente na página atual
    if (yPosition + requiredSpaceForQR + availableSpaceForFooter > pageHeight) {
      // Adicionar nova página se necessário
      pdf.addPage();
      yPosition = 30; // Reset da posição Y na nova página
    }
    
    try {
      const qrCodeDataURL = await QRCode.toDataURL(qrCodeText, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'M'
      });
      
      // Adicionar QR Code ao PDF com posicionamento seguro
      pdf.addImage(qrCodeDataURL, 'PNG', qrX, yPosition, qrSize, qrSize);
    } catch (qrError) {
      console.warn('Erro ao gerar QR Code, continuando sem ele:', qrError);
      // Adicionar placeholder para QR Code
      pdf.setDrawColor(200, 200, 200);
      pdf.rect(qrX, yPosition, qrSize, qrSize);
      pdf.setTextColor(150, 150, 150);
      pdf.setFontSize(10);
      pdf.text('QR CODE', qrX + qrSize/2, yPosition + qrSize/2, { align: 'center' });
    }
    
    // Informações de validação ao lado do QR Code (ajustadas para não sobrepor)
    const textAreaWidth = qrX - 40; // Largura disponível para o texto
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('QR CODE DE VALIDAÇÃO', 20, yPosition + 20);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(102, 102, 102);
    
    // Quebrar texto se necessário para não sobrepor o QR Code
    const instructionText = 'Apresente este código na entrada do evento';
    const instructionLines = pdf.splitTextToSize(instructionText, textAreaWidth);
    pdf.text(instructionLines, 20, yPosition + 35);
    
    pdf.text(`ID do Ingresso: ${ticket.id || 'N/A'}`, 20, yPosition + 50);
    
    const purchaseDate = ticket.purchaseDate ? 
      new Date(ticket.purchaseDate).toLocaleDateString('pt-BR') : 
      new Date().toLocaleDateString('pt-BR');
    pdf.text(`Data de Compra: ${purchaseDate}`, 20, yPosition + 65);
    
    // Atualizar yPosition após o QR Code
    yPosition += Math.max(qrSize, 80);
    
    // Verificar novamente se há espaço para o rodapé
    if (yPosition + availableSpaceForFooter > pageHeight) {
      pdf.addPage();
      yPosition = 30;
    }
    
    // Rodapé posicionado de forma segura
    const footerY = Math.max(yPosition + 20, pageHeight - 40);
    
    pdf.setDrawColor(162, 0, 255);
    pdf.setLineWidth(1);
    pdf.line(20, footerY, pageWidth - 20, footerY);
    
    pdf.setFontSize(8);
    pdf.setTextColor(102, 102, 102);
    pdf.text('Este é um documento eletrônico válido. Guarde-o em local seguro.', 20, footerY + 10);
    pdf.text('Para suporte, acesse: suporte@cuencos.com', 20, footerY + 20);
    
    const generatedTime = `${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`;
    pdf.text(`Gerado em: ${generatedTime}`, pageWidth - 20, footerY + 20, { align: 'right' });
    
    // Salvar o PDF
    const fileName = `ingresso-${(eventTitle || 'evento').replace(/[^a-zA-Z0-9]/g, '-')}-${ticket.id || 'temp'}.pdf`;
    pdf.save(fileName);
    
    return { success: true, fileName };
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return { success: false, error: error.message };
  }
};
