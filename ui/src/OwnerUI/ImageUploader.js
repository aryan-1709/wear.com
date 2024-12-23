import React, { useState } from 'react';

const ImageUploader = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const newImages = [];

    const loadNextImage = (index) => {
      if (index >= files.length) {
        setImages((prevImages) => [...prevImages, ...newImages]);
        return;
      }

      const file = files[index];
      const reader = new FileReader();

      reader.onloadend = () => {
        newImages.push({ file, dataUrl: reader.result });
        loadNextImage(index + 1);
      };

      reader.readAsDataURL(file);
    };

    loadNextImage(0);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form className="space-y-6" >
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </form>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div key={index} className="border rounded shadow">
            <img src={image.dataUrl} alt={`Uploaded ${index}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
