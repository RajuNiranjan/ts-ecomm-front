import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useUserAddress from "@/hooks/useGetAddress";
import { Address } from "@/type";
interface AddressProps {
  allAddress: Address[];
}

const SelectAddress = (props: AddressProps) => {
  const { allAddress } = props;
  const deafultAddress = allAddress.filter((each) => each.isDefault === 1);

  return (
    <div className="w-full mt-3">
      <h6 className="mt-5">Deliver at</h6>
      <Select>
        <SelectTrigger className="lg:mb-2">
          <SelectValue placeholder="Select delivary address" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {deafultAddress.length > 0 && (
              <SelectItem
                value={deafultAddress[0].address}
                className="w-full"
                key={deafultAddress[0].id}
              >
                <p className="w-full">
                  {deafultAddress[0].fullName} {deafultAddress[0].city},
                  {deafultAddress[0].state},{deafultAddress[0].country},
                  {deafultAddress[0].zipcode}
                </p>
              </SelectItem>
            )}
            {allAddress.map((each, index) => {
              if (deafultAddress.length > 0 && each.id === deafultAddress[0].id)
                return null;
              return (
                <SelectItem value={each.address} className="w-full" key={index}>
                  <p className="w-full">
                    {each.fullName} {each.city},{each.state},{each.country},
                    {each.zipcode}
                  </p>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectAddress;
