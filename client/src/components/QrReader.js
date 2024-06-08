import React, { useState, useRef } from 'react';
import axios from 'axios';
import jsQR from 'jsqr';



const QrReader = () => {
  const [user, setUser] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const imageDataUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = imageDataUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);

      // Use decode from jsqr to decode the QR code from the image data
      const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

      if (qrCode) {
        const userID = qrCode.data;
        fetchData(userID);
      } else {
        console.log('No QR code found in the image.');
      }
    };
  };

  const fetchData = async (userID) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.get(`http://localhost:4000/api/getdetails/${userID}`, config);
      setUser(data.message);
      console.log(data);
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center bg-dark text-white" style={{ height: "92.5vh" }}>
      <div style={{ height: "400px", width: "400px" }}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </div>
      <h1 className="display-6 text-info my-3">Name: <strong>{user ? user.username : "no data to show"}</strong></h1>
      <h1 className="display-6 text-info my-3">Email: <strong>{user ? user.email : "no data to show"}</strong></h1>
      <h1 className="display-6 text-info my-3">userID: <strong>{user ? user.userID : "no data to show"}</strong></h1>
    </div>
  );
};

export default QrReader;
