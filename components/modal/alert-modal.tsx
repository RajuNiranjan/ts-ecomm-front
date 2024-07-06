// Note: Alert Modal Component
// this is a child component for modal and is used to show alert message when user wants to delete a product
"use client";

import { useEffect, useState } from "react";

import  Modal  from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
     open={isOpen}
      onClose={onClose}
    >
      <div className="flex items-center justify-center w-full">
        <div>

        <h1 className="text-2xl font-medium">Are you sure?</h1>
        <p className="text-sm text-gray-500">
          Do you really want to delete these records? This process cannot be undone.
        </p>
      <div className="pt-6 space-x-2 flex items-center justify-center w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>Continue</Button>
      </div>
        </div>

      </div>
    </Modal>
  );
};