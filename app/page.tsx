import React from "react";
import Name from "../components/name";
import PixelMaskTransition from "../components/myTitle";
import PixelToggle from "../components/toggle";
import ScrollDown from "../components/ScrollDown";
export default function Home() {
  const texts = [
    "Full Stack Developer",
    "Data Science Enthusiast",
    "UI/UX Designer",
  ]
  return (
    <div className="flex flex-col items-center font-['Press_Start_2P'] justify-center min-h-screen py-2 bg-white dark:bg-black">
      <PixelToggle />
      <Name />
      <PixelMaskTransition texts={texts} className="mt-8" />
      <ScrollDown targetId={"ProjectsDiv"} />
    </div>
  );
}
