import { create } from "zustand";

type Store = {
  details: { name: string; email: string; id: string; pfpBase64: string };
  setDetails: (name: string, email: string, id: string, pfpBase64: string) => void;
};

const useUserStore = create<Store>(set => ({
  details: {
    id: "",
    name: "",
    email: "",
    pfpBase64: ""
  },
  setDetails: (name, email, id, pfpBase64) => set(state => ({ details: { name, email, id, pfpBase64 } }))
}));

export default useUserStore;
