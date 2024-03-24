import { create } from "zustand";

type Store = {
  isLoggedIn: boolean;
  setLogin: () => void;
  setLogout: () => void;
};

const useIsLoggedIn = create<Store>()(set => ({
  isLoggedIn: false,
  setLogin: () => set(() => ({ isLoggedIn: true })),
  setLogout: () => set(() => ({ isLoggedIn: false }))
}));

export default useIsLoggedIn;
