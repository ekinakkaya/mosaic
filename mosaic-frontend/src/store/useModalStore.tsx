import create from "zustand";

interface ModalState {
  isCreateMosaicModalOpen: boolean;
  openCreateMosaicModal: () => void;
  closeCreateMosaicModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isCreateMosaicModalOpen: false,
  openCreateMosaicModal: () => set({ isCreateMosaicModalOpen: true }),
  closeCreateMosaicModal: () => set({ isCreateMosaicModalOpen: false }),
}));
