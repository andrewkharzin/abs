import React from 'react';
import { Chip, Divider, Spacer } from "@nextui-org/react";
import { useEffect, useState } from 'react';

interface ConsigneeCellProps {
  name: string;
  contact_info: string;
}

const ConsigneeCell: React.FC<ConsigneeCellProps> = ({ name, contact_info }) => {



  return (
    <ul>
      <li>

      <span className="font-light text-lg text-base">{name}</span>
      </li>
      <li>
      <Spacer />
      <Divider />
      <Spacer />
      <p className="font-extralight text-base text-sm">
        Contact:
        <span className="font-bold font-roboto dark:text-slate-200 text-slate-800">{" "}{contact_info}</span>

        </p>
      </li>
    </ul>
  );
};

export default ConsigneeCell;
