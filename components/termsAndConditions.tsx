import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TermsAndConditions = () => {
  return (
    <Dialog>
      <DialogTrigger
        className="hover:underline text-blue"
        style={{ color: "blue" }}
      >
        Terms and Conditions
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms And Conditions</DialogTitle>
          <DialogDescription>Accept the Term and Codntions</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndConditions;
