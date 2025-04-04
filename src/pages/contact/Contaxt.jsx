import React from "react";
import {
  FaTelegram,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaEnvelope,
} from "react-icons/fa";
import Kamina from "../../image/Kamina.jpg";

function Contact() {
  return (
    <div className="align-elements flex h-screen items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-700">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg max-md:flex max-md:flex-col max-md:items-center max-md:justify-center md:flex md:gap-10 dark:bg-gray-800">
        <div className="flex-shrink-0">
          <img
            src={Kamina}
            className="h-[300px] w-[220px] rounded-lg border-2 border-gray-300 shadow-md dark:border-gray-700"
            alt="Profile"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Abrorjon Abdurahimov
          </h2>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
            Frontend Developer
          </p>

          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Region:
          </p>
          <p className="text-lg font-medium text-gray-800 dark:text-white">
            Fargona, Uzbekistan
          </p>

          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Education:
          </p>
          <p className="text-lg font-medium text-gray-800 dark:text-white">
            Najot Talim
          </p>

          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            About Me:
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Men veb-ilovalarni yaratish tajribasiga ega bo'lgan ishtiyoqli
            Frontend Developerman.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-5">
            <a
              href="mailto:abrorjonabdurahimov42@gmail.com"
              target="_blank"
              className="btn-link"
            >
              <FaEnvelope className="icon" /> Email
            </a>
            <a
              href="https://t.me/qwerty_0990"
              target="_blank"
              className="btn-link"
            >
              <FaTelegram className="icon" /> Telegram
            </a>
            <a
              href="https://github.com/abrorwweb"
              target="_blank"
              className="btn-link"
            >
              <FaGithub className="icon" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/abrorjon-abdurahimov-488979335/"
              target="_blank"
              className="btn-link"
            >
              <FaLinkedin className="icon" /> LinkedIn
            </a>
            <a
              href="https://portfoliyo-iota.vercel.app/"
              target="_blank"
              className="btn-link"
            >
              <FaGlobe className="icon" /> Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
