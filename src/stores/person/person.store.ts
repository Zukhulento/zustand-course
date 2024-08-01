import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
// import { customSessionStorage } from "../storages/storage.storage";
import { firebasStorage } from "../storages/firebase.storage";

interface PersonState {
  firstName: string;
  lastName: string;
}
interface Actions {
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
}
// StateCreator es un complemento de Zustand que nos permite definir el estado y las acciones que se pueden realizar sobre él
const storeAPI: StateCreator<PersonState & Actions> = (set) => ({
  firstName: "John",
  lastName: "Doe",
  setFirstName: (name) => set({ firstName: name }),
  setLastName: (name) => set({ lastName: name }),
});


// Utilizando el StateCreator se mantiene un código más limpio y ordenado
export const usePersonStore = create<PersonState & Actions>()(
  // Persist es un middleware que nos permite almacenar el estado en el local storage del navegador
  persist(storeAPI, {
    name: "person-storage",
    storage: firebasStorage,
  })
);
