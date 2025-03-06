"use client";

import { useState } from "react";

interface UserCardProps {
  user: any;
  onRefresh: () => void;
  loading: boolean; // Recibimos si está cargando un nuevo usuario
}

export default function UserCard({ user, onRefresh, loading }: UserCardProps) {
  const [activeInfo, setActiveInfo] = useState<
    "name" | "email" | "birthday" | "address" | "phone" | "password"
  >("name");

  // Extraemos datos
  const fullName = `${user.name.first} ${user.name.last}`;
  const email = user.email;
  const birthday = new Date(user.dob.date).toLocaleDateString();
  const address = `${user.location.city}, ${user.location.country}`;
  const phone = user.phone;
  const password = user.login.password;
  const picture = user.picture.large;

  // Define el texto según ícono
  let mainText = "";
  if (activeInfo === "name") mainText = `Hi, My name is ${fullName}`;
  if (activeInfo === "email") mainText = `My email address is ${email}`;
  if (activeInfo === "birthday") mainText = `My birthday is ${birthday}`;
  if (activeInfo === "address") mainText = `My address is ${address}`;
  if (activeInfo === "phone") mainText = `My phone number is ${phone}`;
  if (activeInfo === "password") mainText = `My password is ${password}`;

  return (
    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm text-center flex flex-col items-center gap-4">
      {/* Foto circular */}
      <img
        src={picture}
        alt={fullName}
        className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
      />

      {/* Texto dinámico */}
      <h2 className="text-xl font-bold text-gray-800">{mainText}</h2>

      {/* Íconos con hover + clic */}
      <div className="flex justify-center gap-6 text-gray-500 text-2xl">
        <button
          onMouseEnter={() => setActiveInfo("name")}
          className="transition-transform duration-200 hover:scale-110 active:scale-90"
        >
          👤
        </button>
        <button
          onMouseEnter={() => setActiveInfo("email")}
          className="transition-transform duration-200 hover:scale-110 active:scale-90"
        >
          ✉️
        </button>
        <button
          onMouseEnter={() => setActiveInfo("birthday")}
          className="transition-transform duration-200 hover:scale-110 active:scale-90"
        >
          📅
        </button>
        <button
          onMouseEnter={() => setActiveInfo("address")}
          className="transition-transform duration-200 hover:scale-110 active:scale-90"
        >
          📍
        </button>
        <button
          onMouseEnter={() => setActiveInfo("phone")}
          className="transition-transform duration-200 hover:scale-110 active:scale-90"
        >
          📞
        </button>
        <button
          onMouseEnter={() => setActiveInfo("password")}
          className="transition-transform duration-200 hover:scale-110 active:scale-90"
        >
          🔒
        </button>
      </div>

      {/* Botón para generar otro usuario */}
      <button
        onClick={onRefresh}
        disabled={loading}
        className={`bg-blue-500 text-white px-4 py-2 rounded-md mt-4 transition-colors ${
          loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
      >
        {loading ? "Cargando..." : "Get Random User"}
      </button>
    </div>
  );
}
