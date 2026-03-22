import Image from "next/image";
import fs from "fs";
import path from "path";
import JoinUs from "../components/sections/Joinus";

// read all files from public/joinus_backg once on the server
const images: string[] = [];
try {
  const dir = path.join(process.cwd(), "public", "joinus_backg");
  const names = fs.readdirSync(dir);
  for (const name of names) {
    // optionally filter by extension
    if (/\.(png|jpe?g|webp|gif)$/i.test(name)) {
      images.push(`/joinus_backg/${name}`);
    }
  }
} catch (e) {
  console.warn("couldn't read joinus_backg directory", e);
}

export default function Home() {
  return (
    <>
      {/* pass list of public images read at build time */}
      <JoinUs images={images} />
    </>
  );
}
