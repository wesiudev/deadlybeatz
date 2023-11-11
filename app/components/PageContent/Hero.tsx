import Link from "next/link";

export default function Hero() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center bg-hero-img py-24">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-5xl text-center font-druk mt-3 px-6 text-white">
            Najwyższej jakości darmowe i premium bity dostępne na rynku.
          </h2>
          <h3 className="text-xl text-center font-coco mt-6 px-6 text-white">
            Wykorzystaj potencjał muzyki na naszej platformie. Dołącz do{" "}
            <span className="text-[#FF5500] font-bold text-center underline underline-offset-1">
              DeadlyBeatz
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}
