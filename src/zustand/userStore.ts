import { create } from "zustand";

type Store = {
  details: { name: string; email: string };
  setDetails: (name: string, email: string) => void;
};

const useUserStore = create<Store>(set => ({
  details: {
    name: "",
    email: ""
  },
  setDetails: (name, email) => set(state => ({ details: { name, email } }))
}));

export default useUserStore;
