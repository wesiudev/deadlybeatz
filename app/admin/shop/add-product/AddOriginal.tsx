"use client";
import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

import { FaCheck, FaPlusSquare } from "react-icons/fa";
var randomId = require("random-id");
export default function AddOriginal({
  productInfo,
  setProductInfo,
}: {
  productInfo: any;
  setProductInfo: Function;
}) {
  const [isLoading, setLoading] = useState(false);
  function handleSampleUpload(sample: File) {
    setLoading(true);
    const randId = `beat-${randomId(20, "aA0")}`;
    const reference = ref(storage, randId);
    uploadBytes(reference, sample).then(() =>
      getDownloadURL(reference)
        .then((url) => {
          setProductInfo({ ...productInfo, sampleUrl: url });
        })
        .then(() => setLoading(false))
    );
  }
  return (
    <div>
      <label htmlFor="original">
        <div className="">
          {isLoading ? (
            <>Dodawanie Oryginału...</>
          ) : (
            <>
              {productInfo.originalUrl === "" ? (
                <div className="flex flex-row items-center">
                  {" "}
                  Dodaj oryginał{" "}
                  <FaPlusSquare className="ml-3 text-5xl text-gray-400" />
                </div>
              ) : (
                <div className="flex flex-row items-center">
                  <FaCheck className="text-5xl text-green-400 mr-3" />
                  Dodano oryginał
                </div>
              )}
            </>
          )}
        </div>
      </label>{" "}
      <input
        id="original"
        placeholder="Wpisz tekst..."
        type="file"
        accept="audio/mp3"
        onChange={(event: any) => {
          handleSampleUpload(event.target.files[0]);
        }}
        className="hidden"
      />
    </div>
  );
}
