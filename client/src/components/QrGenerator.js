import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';

const QrGenerator = () => {
  const [text, setText] = useState("");
  const [userID, setUserID] = useState("You have not entered anything yet!");
  const qrRef = useRef();

  const handleGenerate = () => {
    setUserID(text);
  };

  const handleDownload = () => {
    html2canvas(qrRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center" style={{ height: "92.5vh" }}>
      <div ref={qrRef}>
        <QRCode value={userID} />
      </div>
      <input
        className="form-control w-25 mt-5"
        type="text"
        placeholder="Enter your userID"
        aria-label="default input example"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="btn btn-info my-3"
        onClick={handleGenerate}
      >
        Generate
      </button>
      {userID !== "You have not entered anything yet!" && (
        <button
          className="btn btn-success my-3"
          onClick={handleDownload}
        >
          Download QR Code
        </button>
      )}
    </div>
  );
}

export default QrGenerator;
