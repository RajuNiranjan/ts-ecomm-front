import { create } from "zustand";

interface ProfileActiveTabsState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
// Define the store
const useProfileActiveTabs = create<ProfileActiveTabsState>((set) => ({
  activeTab: "Profile",

  setActiveTab: (tab: string) => set({ activeTab: tab }),
}));

export default useProfileActiveTabs;
