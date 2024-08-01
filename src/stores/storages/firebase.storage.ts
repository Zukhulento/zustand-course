import { createJSONStorage, StateStorage } from "zustand/middleware";

// Obteniendo dirección de env
const firebaseURL = import.meta.env.VITE_FIREBASE as string;

// Creando un sessionStorage
const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseURL}/${name}.json`).then((res) =>
        res.json()
      );
      console.log(data);
      return JSON.stringify(data);
    } catch (error) {
      return "error";
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    try {
      const data = await fetch(`${firebaseURL}/${name}.json`, {
        method: "PUT",
        body: value,
      }).then((res) => res.json());
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    return;
  },
  removeItem: function (name: string): void | Promise<void> {
    sessionStorage.removeItem(name);
  },
};

export const firebasStorage = createJSONStorage(() => storageApi);
