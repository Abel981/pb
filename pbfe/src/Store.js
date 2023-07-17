import {create} from "zustand";

export const useLoginStore = create((set) => (
   {
    loggedIn: false,
    login: () => set(() => ({loggedIn:true})),
    logout: () => set(() => ({loggedIn:false})),
    }

))