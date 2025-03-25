import React from "react";
import kamina from "../../../src/image/kamina.jpg";

function About() {
  return (
    <div className="align-elements h-screen py-5">
      <div
        className="p-5 max-md:flex max-md:flex-col max-md:items-center max-md:justify-center md:flex md:gap-8"
      >
        <div className="max-w-80">
          <img src={kamina} alt="" className="rounded-xl w-[200px] h-[300px]" />
        </div>
        <div>
          <p className="mt-4 text-lg text-gray-500">Name:</p>
          <h2 className="text-lg font-medium">Abrorjon Abdurahimov</h2>
          <p className="mt-4 text-lg text-gray-500">Region:</p>
          <p className="text-lg font-medium">Fargona, Uzbekistan</p>
          <p className="mt-4 text-lg text-gray-500">Education:</p>
          <p className="text-lg font-medium">
            Najot Talim
          </p>
          <p className="mt-4 text-lg text-gray-500">Work:</p>
          <p className="text-lg font-medium">
            Frontend Developer
          </p>
        </div>
      </div>
    </div>
  );
}
export default About;
