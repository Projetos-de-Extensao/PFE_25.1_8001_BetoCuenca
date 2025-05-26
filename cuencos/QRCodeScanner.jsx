import React, { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Scan, X, Check, AlertTriangle } from 'lucide-react';

const QRCodeScanner = ({ onScan, className = '' }) => {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanError, setScanError] = useState(null);
  const [html5QrCode, setHtml5QrCode] = useState(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(err => console.error('Error stopping scanner:', err));
      }
    };
  }, [html5QrCode]);

  const startScanner = () => {
    setScanResult(null);
    setScanError(null);
    
    const qrCodeScanner = new Html5Qrcode("qr-reader");
    setHtml5QrCode(qrCodeScanner);
    
    setScanning(true);
    
    qrCodeScanner.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      (decodedText) => {
        handleScanSuccess(decodedText);
        qrCodeScanner.stop();
        setScanning(false);
      },
      (errorMessage) => {
        // Suppress continuous error logging
        if (!scanning) {
          console.log(`QR error: ${errorMessage}`);
        }
      }
    ).catch((err) => {
      setScanError(`Não foi possível iniciar o scanner: ${err}`);
      setScanning(false);
    });
  };

  const stopScanner = () => {
    if (html5QrCode && html5QrCode.isScanning) {
      html5QrCode.stop().then(() => {
        setScanning(false);
      }).catch(err => {
        console.error('Error stopping scanner:', err);
      });
    }
  };

  const handleScanSuccess = (decodedText) => {
    setScanResult(decodedText);
    
    if (onScan) {
      onScan(decodedText);
    }
  };

  return (
    <div className={`qr-scanner-container ${className}`}>
      {scanError && (
        <div className="bg-red-900/50 text-white p-4 rounded-md mb-4 flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5" />
          <span>{scanError}</span>
        </div>
      )}
      
      <div id="qr-reader" style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}></div>
      
      {scanResult ? (
        <div className="mt-4 bg-green-900/50 p-4 rounded-md text-white">
          <div className="flex items-center mb-2">
            <Check className="mr-2 h-5 w-5" />
            <span className="font-medium">QR Code lido com sucesso!</span>
          </div>
          <p className="text-sm break-all">{scanResult}</p>
          
          <Button 
            onClick={startScanner} 
            className="mt-4 bg-cuencos-purple hover:bg-purple-700 text-white"
          >
            <Scan className="mr-2 h-4 w-4" /> Escanear outro
          </Button>
        </div>
      ) : (
        <div className="mt-4 flex justify-center">
          {scanning ? (
            <Button 
              onClick={stopScanner} 
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <X className="mr-2 h-4 w-4" /> Parar scanner
            </Button>
          ) : (
            <Button 
              onClick={startScanner} 
              className="bg-cuencos-purple hover:bg-purple-700 text-white"
            >
              <Scan className="mr-2 h-4 w-4" /> Iniciar scanner
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
