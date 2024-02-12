import React from 'react';
import { Chip, Divider, Spacer } from "@nextui-org/react";
import { useEffect, useState } from 'react';

interface ShipperCellProps {
  name: string;
  contact_info: string;
}

const ShipperCell: React.FC<ShipperCellProps> = ({ name, contact_info }) => {



  return (
    <ul>
      <li>

      <span className="font-light text-xs text-base">{name}</span>
      </li>
      <li>
      <Spacer />
      <Divider />
      <Spacer />
      <p className="font-extralight text-base text-xs">
        Contact:
        <span className="font-bold text-sm font-roboto dark:text-slate-200 text-slate-800">{" "}{contact_info}</span>

        </p>
      </li>
    </ul>
  );
};

export default ShipperCell;
