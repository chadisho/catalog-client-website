import { create } from 'zustand';

interface AppState {
  // Add state properties here
}

export const useAppStore = create<AppState>((_set) => ({
  // Add state and actions here
}));