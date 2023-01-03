import create from "zustand";

interface UserState {
  userId: string | null;
}

export const useUserStore = create<UserState>((set) => ({
  userId: "clcfpjw9z0000gp7k2nldac6q",
  setUserId: (id: string) => set({ userId: id }),
}));
