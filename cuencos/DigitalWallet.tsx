import React, { useState } from 'react';
import { Button } from './ui/button';

interface DigitalWalletProps {
  passId: string;
  name: string;
  description: string;
}

export function DigitalWallet({ passId, name, description }: DigitalWalletProps) {
  const [qrCode, setQrCode] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const generateQRCode = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/generate-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passId }),
      });
      const data = await response.json();
      setQrCode(data.qrCode);
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToAppleWallet = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/generate-apple-pass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passId, name, description }),
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${passId}.pkpass`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao adicionar ao Apple Wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToGooglePay = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/generate-google-pass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passId, name, description }),
      });
      
      const data = await response.json();
      // Implementar a lógica para abrir o Google Pay com o pass gerado
      console.log('Google Pay pass:', data);
    } catch (error) {
      console.error('Erro ao adicionar ao Google Pay:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex gap-4">
        <Button
          onClick={addToAppleWallet}
          disabled={loading}
          className="bg-black text-white hover:bg-gray-800"
        >
          Adicionar ao Apple Wallet
        </Button>
        <Button
          onClick={addToGooglePay}
          disabled={loading}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Adicionar ao Google Pay
        </Button>
      </div>

      <Button
        onClick={generateQRCode}
        disabled={loading}
        className="mt-4"
      >
        Gerar QR Code
      </Button>

      {qrCode && (
        <div className="mt-4">
          <img src={qrCode} alt="QR Code" className="w-48 h-48" />
        </div>
      )}
    </div>
  );
} 