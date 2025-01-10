import { useState, useEffect } from "react";
import QRCode from "qrcode";
import Meteors from "./components/ui/meteors"

const LiveQRCodeGenerator = () => {
  const [text, setText] = useState(""); // Input text
  const [qrCodeUrl, setQrCodeUrl] = useState(""); // Generated QR Code URL
  const [isAnimating, setIsAnimating] = useState(false); // Animation state

  // Generate QR Code whenever the text changes
  useEffect(() => {
    if (!text) {
      setQrCodeUrl(""); // Clear QR code if input is empty
      return;
    }

    setIsAnimating(true); // Trigger animation on QR code update

    // Generate QR code URL
    QRCode.toDataURL(text)
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error(err));

    // Stop animation after a short delay
    const timeout = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timeout);
  }, [text]);

  // Download QR code as PNG
  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = "qr-code.png"; // File name for download
      link.click();
    }
  };

  return (
   <div>
    <Meteors />
     <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 font-sans">
      <h1 className="text-4xl font-bold mb-6 text-gray-200">
        Live QR Code Generator
      </h1>
      <input
        type="text"
        placeholder="Type here to generate QR Code"
        className="p-2 border border-gray-300 rounded-md w-64 mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
     
      <div
        className={`p-4 bg-white rounded-md shadow-md transition-transform duration-300 ${
          isAnimating ? "scale-105 opacity-50" : "scale-95 opacity-100"
        }`}
      >
        {qrCodeUrl ? (
          <img src={qrCodeUrl} alt="Generated QR Code" className="w-64 h-64" />
        ) : (
          <p className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
              />
            </svg>
          </p>
        )}
      </div>
      {qrCodeUrl && (
        <button
          onClick={downloadQRCode}
          className="mt-4 px-4 py-2 bg-green-500 text-white font-medium nded-md hover:bg-green-600"
        >
          Download QR Code

        </button>
      )}
    </div>
   </div>
  );
};

export default LiveQRCodeGenerator;
