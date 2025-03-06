"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import UserCard from "./components/UserCard";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadingUser, setLoadingUser] = useState(false); // Para mostrar feedback en el botón

  // Llamado al montar para tener un usuario al inicio
  useEffect(() => {
    handleNewUser();
    
  }, []);

  // Obtiene un nuevo usuario de la API
  const handleNewUser = async () => {
    setLoadingUser(true); // Inicia "cargando"
    try {
      const res = await fetch("https://randomuser.me/api/");
      const data = await res.json();
      const newUser = data.results[0];

      // Agregamos el nuevo usuario al historial
      setUsers((prev) => {
        const updated = [...prev, newUser];
        // Seleccionamos el último agregado
        setSelectedIndex(updated.length - 1);
        return updated;
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoadingUser(false); // Termina "cargando"
    }
  };

  // Cambia el usuario seleccionado al dar clic en el historial
  const handleSelectUser = (index: number) => {
    setSelectedIndex(index);
  };

  // Limpia todo el historial y la selección
  const handleClearHistory = () => {
    setUsers([]);
    setSelectedIndex(null);
  };

  // Usuario seleccionado actual
  const selectedUser = selectedIndex !== null ? users[selectedIndex] : null;

  return (
    <div className="flex h-screen">
      {/* Barra lateral con historial */}
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

        {/* Si hay usuario seleccionado, mostramos la tarjeta; sino, un botón para generar */}
        {selectedUser ? (
          <UserCard
            user={selectedUser}
            onRefresh={handleNewUser}
            loading={loadingUser}
          />
        ) : (
          <div className="text-center">
            <p className="text-gray-600">No hay usuario seleccionado.</p>
            <button
              onClick={handleNewUser}
              disabled={loadingUser}
              className={`bg-blue-500 text-white px-4 py-2 rounded mt-2 transition-colors ${
                loadingUser
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
            >
              {loadingUser ? "Cargando..." : "Generar Usuario"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
