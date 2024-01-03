"use client";

import Link from "next/link";
import { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import AddOriginal from "./AddOriginal";
import UploadProduct from "./AddProduct";
import { addProduct } from "@/firebase";

export default function AddProduct() {
  const [productInfo, setProductInfo] = useState({
    originalUrl: "",
    bpm: "",
    genre: "",
    contains: "",
    license: "",
    price: "",
    title: "",
    description: "",
    image: {
      alt: "",
      url: "",
    },
  });

  console.log(productInfo);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setProductInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [added, setAdded] = useState(false);
  return (
    <div className="flex flex-col px-6 text-white">
      <Link
        href="/admin/shop"
        className="flex flex-row items-center pt-12 text-2xl w-max"
      >
        <FaLongArrowAltLeft className="mr-3" />
        Powrót
      </Link>
      <h1 className="w-full text-3xl text-white font-bold pt-12">
        Nowy produkt
      </h1>
      {/* <AddSampel setProductInfo={setProductInfo} productInfo={productInfo} /> */}
      <AddOriginal
        added={added}
        setAdded={setAdded}
        setProductInfo={setProductInfo}
        productInfo={productInfo}
      />

      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col pt-6">
          <label htmlFor="bpm" className="text-lg font-medium">
            BPM
          </label>
          <input
            type="text"
            name="bpm"
            id="bpm"
            placeholder="Enter BPM"
            value={productInfo.bpm}
            onChange={handleInputChange}
            className="border border-gray-500 rounded-md px-3 py-2 mt-2 text-black"
          />
        </div>

        <div className="flex flex-col pt-6">
          <label htmlFor="genre" className="text-lg font-medium">
            Genre
          </label>
          <input
            type="text"
            name="genre"
            id="genre"
            placeholder="Enter Genre"
            value={productInfo.genre}
            onChange={handleInputChange}
            className="border border-gray-500 rounded-md px-3 py-2 mt-2 text-black"
          />
        </div>

        <div className="flex flex-col pt-6">
          <label htmlFor="contains" className="text-lg font-medium">
            Contains
          </label>
          <input
            type="text"
            name="contains"
            id="contains"
            placeholder="Enter Contains"
            value={productInfo.contains}
            onChange={handleInputChange}
            className="border border-gray-500 rounded-md px-3 py-2 mt-2 text-black"
          />
        </div>

        <div className="flex flex-col pt-6">
          <label htmlFor="license" className="text-lg font-medium">
            License
          </label>
          <input
            type="text"
            name="license"
            id="license"
            placeholder="Enter License"
            value={productInfo.license}
            onChange={handleInputChange}
            className="border border-gray-500 rounded-md px-3 py-2 mt-2 text-black"
          />
        </div>

        <div className="flex flex-col pt-6">
          <label htmlFor="price" className="text-lg font-medium">
            Price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            placeholder="Enter Price"
            value={productInfo.price}
            onChange={handleInputChange}
            className="border border-gray-500 rounded-md px-3 py-2 mt-2 text-black"
          />
        </div>

        <div className="flex flex-col pt-6">
          <label htmlFor="title" className="text-lg font-medium">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter Title"
            value={productInfo.title}
            onChange={handleInputChange}
            className="border border-gray-500 rounded-md px-3 py-2 mt-2 text-black"
          />
        </div>

        <div className="flex flex-col pt-6">
          <label htmlFor="description" className="text-lg font-medium">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Enter Description"
            value={productInfo.description}
            onChange={handleInputChange}
            className="border border-gray-500 rounded-md px-3 py-2 mt-2 text-black"
          />
        </div>
      </div>
      <button
        onClick={() => {
          addProduct("deadlybeatz", productInfo).then(() => {
            alert("Dodano produkt!"), setAdded(true);
          });
        }}
        className="bg-green-400 p-12 w-full text-3xl mt-12"
      >
        Dodaj produkt
      </button>
    </div>
  );
}
