import React from "react";

function About() {
  return (
    <div className="align-elements min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-700 p-6">
      <div className="max-w-3xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-all hover:scale-105">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
          🚀 About Unsplash Clone
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          Unsplash Clone – bu yuqori sifatli rasmlarni qidirish va boshqarish uchun ishlab chiqilgan veb-ilova. 
          Ushbu loyiha <span className="font-semibold">Unsplash API</span> dan foydalangan holda ishlaydi va foydalanuvchilarga turli toifalardagi rasmlarni izlash, yuklab olish, yoqtirish va boshqarish imkoniyatini beradi.
        </p>
        
        <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">🔹 Texnologiyalar</h3>
        <ul className="mt-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
          <li><span className="font-semibold">Frontend:</span> React (Next.js) + Tailwind CSS + DaisyUI</li>
          <li><span className="font-semibold">State Management:</span> Context API</li>
          <li><span className="font-semibold">Backend & Auth:</span> Firebase (Auth & Firestore)</li>
          <li><span className="font-semibold">API:</span> Unsplash API</li>
        </ul>
        
        <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">🔹 Xususiyatlar</h3>
        <ul className="mt-2 text-gray-700 dark:text-gray-300 list-disc pl-5">
          <li>🔍 <span className="font-semibold">Rasm qidirish</span> – Unsplash API orqali turli mavzulardagi rasmlarni izlash.</li>
          <li>❤️ <span className="font-semibold">Like funksiyasi</span> – Rasmlarni yoqtirish va shaxsiy ro‘yxatga qo‘shish.</li>
          <li>⬇️ <span className="font-semibold">Yuklab olish</span> – Rasmlarni yuqori sifatda yuklab olish.</li>
          <li>👤 <span className="font-semibold">Profil sahifasi</span> – Yoqtirgan rasmlarni saqlash.</li>
          <li>🌗 <span className="font-semibold">Dark/Light Mode</span> – Foydalanuvchi interfeys ranglarini o‘zgartirish.</li>
          <li>🔐 <span className="font-semibold">Google & Email Auth</span> – Google yoki Email orqali tizimga kirish.</li>
        </ul>
        
        <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">📷 Nega bu loyiha?</h3>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          Unsplash Clone – bu rasm qidirish va boshqarish jarayonini soddalashtiruvchi loyiha bo‘lib, foydalanuvchilarga qulay interfeys orqali yuqori sifatli rasmlarni izlash va saqlash imkonini beradi.
        </p>
        
        <p className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
          🔗 Kelajakdagi rejalarga yangi xususiyatlar qo‘shish va UI/UX dizaynini yanada mukammallashtirish kiradi.
        </p>
      </div>
    </div>
  );
}

export default About;