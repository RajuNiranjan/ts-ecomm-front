import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Loader } from "@/components/ui/loader";
import { Order, Reason } from "@/type";
import axios from "axios";
import LocalStorageManager from "@/lib/LocalStorageManager";
import { toast } from "react-toastify";

interface Props {
  reasons: Reason[] | undefined;
  data: Order;
}

export function CancelConfirmPopup(props: Props) {
  const { reasons, data } = props;
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<string | null>(
    reasons ? reasons[0].reason : null
  );
  const [otherReason, setOtherReason] = useState<string>("");
  const [showErrMsg, setShowErrMsg] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const onSubmit = async () => {
    const reqData = {
      id: data.id,
      reason: reason,
    };

    const token = LocalStorageManager.getItemWithExpiration("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    if (reason === "other" && otherReason === "") {
      setShowErrMsg(true);
      setMessage("please enter the reason");
      return;
    } else if (reason === "other" && otherReason.length < 20) {
      setShowErrMsg(true);
      setMessage("Please write at least a minimum of 20 characters");
      return;
    }
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/order/order-cancel/1`,
        reqData,
        { headers }
      )
      .then((data) => {
        setReason(reasons ? reasons[0].reason : null);
        setOtherReason("");
        setOpen(false);
        setShowErrMsg(false);
        setMessage("");
        toast(data.data, { type: "success", toastId: data.data });
        window.location.reload();
      })
      .catch((error) => {
        toast("Something Went worng!! try again", {
          type: "error",
          toastId: "Something Went worng!! try again",
        });
      });
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <div className="flex justify-end">
          <button className="text-[12px] sm:text-[16px] px-1 mt-2 sm:mt-0 sm:p-2 border-2 hover:text-blue-400">
            cancel
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" onInteractOutside={() => {}}>
        <DialogHeader>
          <DialogTitle>Cancel Order</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel the order?
          </DialogDescription>
        </DialogHeader>
        <div>
          <p className="mb-2">Reason</p>
          <Select
            defaultValue={
              reasons !== undefined && reasons.length >= 1
                ? reasons[0].reason
                : undefined
            }
            onValueChange={setReason}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {reasons?.map(
                  (
                    eachReason // corrected variable name
                  ) => (
                    <SelectItem value={eachReason.reason} key={eachReason.id}>
                      {eachReason.reason}
                    </SelectItem>
                  )
                )}
                <SelectItem value={"other"}>Others</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {reason === "other" && (
          <div className="flex flex-col gap-2">
            <label htmlFor="reason">Enter reason</label>
            <input
              type="text"
              className="border-2 h-[32px] px-2 p-1"
              placeholder="Enter the reason"
              id="reason"
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
            />
            <p
              className={`text-[14px] text-red-500 ${
                showErrMsg ? "block" : "hidden"
              }`}>
              {message}
            </p>
          </div>
        )}

        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button type="button">No</Button>
          </DialogClose>
          <div className="flex justify-between ">
            <Button
              type="button"
              disabled={reason === null}
              style={{
                opacity: reason === null ? 0.5 : 1,
              }}
              onClick={onSubmit}>
              Cancel order
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
