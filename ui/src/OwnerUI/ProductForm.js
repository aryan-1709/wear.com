import React, { useState } from 'react';
const {Uploader} = require("../controllers/Uploader")

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [sizes, setSizes] = useState('');
  const [category, setCategory] = useState('');
  const [colors, setColors] = useState('');
  const [listImages, setListImages] = useState([[]]);

  const handleImageChange = async (e, index) => {
    // console.log("path: ",e.target.files[0]);
    const files = Array.from(e.target.files);
    let formImages = [];
    files.forEach(file => {
      const formData = new FormData();
      formData.append('image', file);
      formImages.push(formData);
    });
    console.log(formImages)
    const updatedImages = [...listImages];
    updatedImages[index] = formImages;
    setListImages(updatedImages);
  };

  const addImageGroup = () => {
    setListImages([...listImages, []]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      name,
      price,
      description,
      sizes,
      category,
      colors,
      listImages
    };

    console.log('Form Data:', formData);
    listImages.map((item, index)=>{
      return item.map(async (image, i) => {
        // console.log(image);
        const res = await Uploader(image);
        console.log("res", res);
      })
    })
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price:</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description:</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Sizes:</label>
        <input 
          type="text" 
          value={sizes} 
          onChange={(e) => setSizes(e.target.value)} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category:</label>
        <input 
          type="text" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Colors:</label>
        <input 
          type="text" 
          value={colors} 
          onChange={(e) => setColors(e.target.value)} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">List Images:</label>
        {listImages.map((group, index) => (
          <div key={index} className="mt-2">
            <input 
              type="file" 
              multiple 
              onChange={(e) => handleImageChange(e, index)} 
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            />
          </div>
        ))}
        <button 
          type="button" 
          onClick={addImageGroup} 
          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Image Group
        </button>
      </div>

      <button 
        type="submit" 
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Upload Product
      </button>
    </form>
  );
};

export default ProductForm;
