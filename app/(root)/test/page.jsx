"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
function App() {
  const [file, setFile] = useState(null);
  const [svgURL, setSvgURL] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select an image file first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/convert",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSvgURL(`http://127.0.0.1:5000/${response.data.output_file}`);
    } catch (error) {
      console.error("Error converting image:", error);
      alert("Failed to convert image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App min-h-screen  bg-white flex justify-center content-center ">
      <h1>Image to SVG Converter</h1>
      <input type="file" accept="image/png" onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Converting..." : "Convert Image"}
      </button>
      {svgURL && (
        <div>
          <h2>SVG Output:</h2>
          <object
            data={svgURL}
            type="image/svg+xml"
            width="100%"
            height="600px"
          >
            Your browser does not support SVG
          </object>
            </div>
      )}
      <div className="mt-44">
       <Image width={500} height={500}  className="w-200 " src="/output_herosec10.svg" alt="Loading Skeleton" />
       </div>
      <div className="bg-red-500">
        
      </div>
    </div>
  );
}

export default App;
