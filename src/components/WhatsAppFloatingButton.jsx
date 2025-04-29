import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppFloatingButton = () => {
  const phoneNumber = '8801719550746';
  const message = 'Hi! I am interested in your service.';

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50"
    >
      <div className="relative">
        {/* Smaller, subtle ping */}
        <span className="absolute inline-flex h-12 w-12 rounded-full bg-green-400 opacity-50 animate-ping"></span>

        {/* WhatsApp icon */}
        <div className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg text-2xl relative">
          <FaWhatsapp />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppFloatingButton;
