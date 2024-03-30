import { create } from "zustand";

type Store = {
  details: { name: string; email: string; id: string };
  setDetails: (name: string, email: string, id: string) => void;
};

const useUserStore = create<Store>(set => ({
  details: {
    id: "",
    name: "",
    email: ""
  },
  setDetails: (name, email, id) => set(state => ({ details: { name, email, id } }))
}));

export default useUserStore;
