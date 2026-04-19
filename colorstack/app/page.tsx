import Hero from "../components/sections/Hero";
import DynamicBar from "@/components/sections/DynamicBar";
import Mission from "@/components/sections/Mission";
import Officers from "@/components/sections/Officers";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <DynamicBar />
      <Hero />
      <Mission />
      <Officers />
      <Contact />
    </>
  );
}
