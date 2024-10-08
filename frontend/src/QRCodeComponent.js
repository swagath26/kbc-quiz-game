// QRCodeComponent.js
import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeComponent = ({ url }) => {
  return (
    <div className="qr-code">
      <h3>Scan the QR code to join the game:</h3>
      <QRCodeCanvas value={url} size={256} />
    </div>
  );
};

export default QRCodeComponent;