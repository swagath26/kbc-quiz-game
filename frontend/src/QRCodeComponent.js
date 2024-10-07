import React from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Updated import

const QRCodeComponent = ({ url }) => {
    return (
        <div>
            <h3>Scan the QR code to join:</h3>
            <QRCodeCanvas value={url} /> {/* Use QRCodeCanvas */}
        </div>
    );
};

export default QRCodeComponent;