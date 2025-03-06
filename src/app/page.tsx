"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import UserCard from "./components/UserCard";

export default function Home() {
  // Almacena todos los usuarios generados
  const [users, setUsers] = useState<any[]>([]);
  // Índice del usuario actualmente seleccionado
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Función para obtener un nuevo usuario aleatorio
  const handleNewUser = async () => {
    try {
      const res = await fetch("https://randomuser.me/api/");
      const data = await res.json();
      const newUser = data.results[0];
      // Agregamos el nuevo usuario al historial
      setUsers((prev) => [...prev, newUser]);
      // Seleccionamos al último usuario agregado
      setSelectedIndex(users.length); 
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Cambia el usuario seleccionado al dar clic en la barra lateral
  const handleSelectUser = (index: number) => {
    setSelectedIndex(index);
  };

  // Limpia todo el historial y resetea la selección
  const handleClearHistory = () => {
    setUsers([]);
    setSelectedIndex(null);
  };

  // Usuario que se mostrará en la tarjeta (según el índice seleccionado)
  const selectedUser = selectedIndex !== null ? users[selectedIndex] : null;

  return (
    <div className="flex h-screen">
      {/* Barra lateral con el historial */}
      <Sidebar users={users} onSelect={handleSelectUser} />

      {/* Contenido principal */}
      <div className="flex-1 relative flex items-center justify-center bg-gray-100">
        {/* Botón para limpiar historial (arriba a la derecha) */}
        <button
          onClick={handleClearHistory}
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Limpiar Historial
        </button>

        {/* Si hay un usuario seleccionado, mostramos la tarjeta; sino, invitamos a generar uno */}
        {selectedUser ? (
          <UserCard user={selectedUser} onRefresh={handleNewUser} />
        ) : (
          <div className="text-center">
            <p className="text-gray-600">No hay usuario seleccionado.</p>
            <button
              onClick={handleNewUser}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Generar Usuario
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
