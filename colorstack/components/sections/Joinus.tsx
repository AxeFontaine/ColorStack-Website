"use client";
import Image from "next/image";

type ScatteredImage = { src: string; id: number; top: string; left: string; width: number; height: number };

export default function JoinUs({ images }: { images: string[] }) {
  // Fixed positions mimicking the provided sample layout image
  const imageData: ScatteredImage[] = [
    { src: "/joinus_backg/API_GBM.jpg", id: 0, top: "5%", left: "3%", width: 330, height: 230 },
    { src: "/joinus_backg/building_goals_GBM.jpg", id: 1, top: "5%", left: "45%", width: 320, height: 190 },
    { src: "/joinus_backg/colorstack pic1.png", id: 2, top: "5%", left: "75%", width: 220, height: 140 },
    { src: "/joinus_backg/FALL_GBM.jpg", id: 3, top: "35%", left: "3%", width: 260, height: 190 },
    { src: "/joinus_backg/GOALS2_GBM.jpg", id: 4, top: "35%", left: "38%", width: 320, height: 210 },
    { src: "/joinus_backg/GOALS3_GBM.jpg", id: 5, top: "35%", left: "72%", width: 260, height: 180 },
    { src: "/joinus_backg/SPRING_INTRO_GBM.jpg", id: 6, top: "65%", left: "8%", width: 340, height: 210 },
    { src: "/joinus_backg/WEB_DEV2_GBM.jpg", id: 7, top: "67%", left: "10%", width: 400, height: 220 },
    { src: "/joinus_backg/WEB_DEV_GBM.jpg", id: 8, top: "67%", left: "55%", width: 400, height: 220 },
 ];

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-white">
      <h1 className="flex h-screen top-8 left-6 font-bold text-black text-4xl z-10 relative ">
        Join Us
      </h1>

      {/* 3. Render the scattered images */}
      {imageData.map((img) => (
        <div
          key={img.id}
          className="absolute inline-block w-fit transition-opacity duration-500"
          style={{ top: img.top, left: img.left, display: 'inline-flex'}}
        >
          <Image
            src={img.src}
            alt="Scattered element"
            width={img.width}
            height={img.height}
            className="object-cover shadow-lg"
          />
        </div>
      ))}
    </main>
  );
}