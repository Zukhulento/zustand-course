import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import { customSessionStorage } from "../storages/storage.storage";
import { firebasStorage } from "../storages/firebase.storage";
import { logger } from "../middlewares/logger.middleware";

interface PersonState {
  firstName: string;
  lastName: string;
}
interface Actions {
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
}
// StateCreator es un complemento de Zustand que nos permite definir el estado y las acciones que se pueden realizar sobre él
const storeAPI: StateCreator<
  PersonState & Actions,
  [["zustand/devtools", never]]
> = (set) => ({
  firstName: "John",
  lastName: "Doe",
  setFirstName: (name) => set({ firstName: name }, false, "setFirstName"),
  setLastName: (name) => set({ lastName: name }, false, "setLastName"),
});

// Utilizando el StateCreator se mantiene un código más limpio y ordenado
export const usePersonStore = create<PersonState & Actions>()(
  // Persist es un middleware que nos permite almacenar el estado en el local storage del navegador

  devtools(
    persist(storeAPI, {
      name: "person-storage",
      // storage: firebasStorage,
    })
  )
);
