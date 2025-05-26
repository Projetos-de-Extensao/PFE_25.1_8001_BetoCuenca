import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

/**
 * QRCode component for generating and displaying QR codes
 * @param {Object} props
 * @param {string} props.value - The value to encode in the QR code
 * @param {string} props.size - Size of the QR code (default: 128)
 * @param {string} props.level - Error correction level (default: 'H')
 * @param {string} props.bgColor - Background color (default: '#ffffff')
 * @param {string} props.fgColor - Foreground color (default: '#000000')
 * @param {string} props.className - Additional CSS class
 * @param {boolean} props.includeMargin - Whether to include margin (default: true)
 * @param {boolean} props.allowDownload - Whether to show download button (default: false)
 * @param {string} props.downloadName - Filename for download (default: 'qrcode')
 */
const QRCode = ({ 
  value, 
  size = 128, 
  level = 'H', 
  bgColor = '#ffffff', 
  fgColor = '#A259FF', 
  className = '', 
  includeMargin = true,
  allowDownload = false,
  downloadName = 'qrcode'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Handle downloading QR code as SVG
  const handleDownload = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `${downloadName}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
  };

  return (
    <div 
      className={`relative flex flex-col items-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-lg overflow-hidden shadow-lg p-3 bg-white">
        <QRCodeSVG
          id="qr-code-svg"
          value={value}
          size={size}
          level={level}
          bgColor={bgColor}
          fgColor={fgColor}
          includeMargin={includeMargin}
        />
      </div>
      
      {allowDownload && isHovered && (
        <Button
          className="absolute bottom-2 right-2 bg-cuencos-purple hover:bg-purple-700 text-white rounded-full w-8 h-8 p-0 flex items-center justify-center"
          onClick={handleDownload}
          title="Download QR Code"
        >
          <Download className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default QRCode;
