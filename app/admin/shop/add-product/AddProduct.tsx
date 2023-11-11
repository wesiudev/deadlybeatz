"use client";
import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

import { FaCheck, FaPlusSquare } from "react-icons/fa";
var randomId = require("random-id");
export default function UploadProduct({
  productInfo,
  setProductInfo,
}: {
  productInfo: any;
  setProductInfo: Function;
}) {
  const [isLoading, setLoading] = useState(false);
  function handleSampleUpload(sample: File) {
    setLoading(true);
    const randId = `image-${randomId(20, "aA0")}`;
    const reference = ref(storage, randId);
    uploadBytes(reference, sample).then(() =>
      getDownloadURL(reference)
        .then((url) => {
          setProductInfo({
            ...productInfo,
            image: { ...productInfo.image, url: url },
          });
        })
        .then(() => setLoading(false))
    );
  }
  return (
    <div>
      <label htmlFor="img">
        <div className="">
          {isLoading ? (
            <>Dodawanie Obrazka...</>
          ) : (
            <>
              {productInfo.sampleUrl == "" ? (
                <div className="flex flex-row items-center">
                  {" "}
                  Dodaj obrazek{" "}
                  <FaPlusSquare className="ml-3 text-5xl text-gray-400" />
                </div>
              ) : (
                <div className="flex flex-row items-center">
                  <FaCheck className="text-5xl text-green-400 mr-3" />
                  Dodano obrazek z altem {productInfo.image.alt}
                </div>
              )}
            </>
          )}
        </div>
      </label>
      <input
        className="border border-gray-500 rounded-md px-3 py-2 mt-2 text-black"
        type="text"
        placeholder="wpisz alt obrazka"
        onChange={(e: any) =>
          setProductInfo({
            ...productInfo,
            image: { ...productInfo.image, alt: e.target.value },
          })
        }
      />
      <input
        id="img"
        placeholder="Wpisz tekst..."
        type="file"
        accept="image/*"
        onChange={(event: any) => {
          handleSampleUpload(event.target.files[0]);
        }}
        className="hidden"
      />
    </div>
  );
}
