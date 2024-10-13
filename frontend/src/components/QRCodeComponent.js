import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeComponent = ({ url }) => {
  return (
    <div className="qr-code" style={{display: 'flex', flexGrow: 1, flexDirection: 'column', alignItems: 'center', gap: '3em', padding: '2em'}}>
      <h3 style={{textAlign: 'center'}}>Scan to join the Game</h3>
      <QRCodeCanvas value={url} size={200} />
    </div>
  );
};

export default QRCodeComponent;