// src/components/CreateMosaicModal.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/Modal"; // Reusable Modal component
import { useModalStore } from "@/store/useModalStore"; // Zustand store for modal

const CreateMosaicModal: React.FC = () => {
  const isOpen = useModalStore((state) => state.isCreateMosaicModalOpen);
  const closeModal = useModalStore((state) => state.closeCreateMosaicModal);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateMosaic = () => {
    if (!title) return; // Add more validation if needed
    // Add logic to create a new mosaic (e.g., API call or local storage update)
    console.log("Creating new mosaic:", { title, description });
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title="Create New Mosaic">
      <div className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="mosaic-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Mosaic Title
          </label>
          <Input
            id="mosaic-title"
            type="text"
            placeholder="Enter mosaic title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="mosaic-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description (Optional)
          </label>
          <Input
            id="mosaic-description"
            type="text"
            placeholder="Enter mosaic description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleCreateMosaic}>
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateMosaicModal;
