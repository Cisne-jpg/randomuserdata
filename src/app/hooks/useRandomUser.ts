"use client";
// Llamada a la API
import { useState, useEffect } from "react";

export function useRandomUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNewUser();
  }, []);

  const getNewUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://randomuser.me/api/");
      const data = await res.json();
      setUser(data.results[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, getNewUser };
}
