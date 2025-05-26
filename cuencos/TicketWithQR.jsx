import React from 'react';
import QRCode from './ui/QRCode';
import { formatDate } from '@/lib/utils';

const TicketWithQR = ({ ticket }) => {
  // Generate a unique ticket identifier to encode in the QR code
  const ticketIdentifier = `CUENCOS-${ticket.id}-${ticket.eventId}`;
  
  return (
    <div className="max-w-md mx-auto bg-[#1a1a1a] rounded-lg overflow-hidden shadow-xl border border-gray-800">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-white text-xl font-bold">{ticket.eventTitle}</h3>
            <p className="text-gray-400 text-sm">{formatDate(ticket.eventDate)}</p>
          </div>
          <div className="bg-cuencos-purple text-white text-xs font-bold py-1 px-2 rounded">
            {ticket.ticketType}
          </div>
        </div>
        
        <div className="flex justify-center my-6">
          <QRCode 
            value={ticketIdentifier}
            size={180}
            allowDownload={true}
            downloadName={`ticket-${ticket.id}`}
          />
        </div>
        
        <div className="mt-4 border-t border-gray-800 pt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Nome:</span>
            <span className="text-white font-medium">{ticket.userName}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Local:</span>
            <span className="text-white font-medium">{ticket.eventLocation}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Código:</span>
            <span className="text-white font-medium">{ticket.id}</span>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Apresente este QR code na entrada do evento para validação.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketWithQR;
