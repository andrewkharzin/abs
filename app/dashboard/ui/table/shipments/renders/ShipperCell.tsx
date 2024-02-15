import React from 'react';
import { Chip, Divider, Spacer } from "@nextui-org/react";
import { useEffect, useState } from 'react';

interface ShipperCellProps {
  //shipper info: string;
  shipperName: string;
  shipperAddress: string;
  shipperCity: string;
  shipperZip: string;
  shipperPhone: string;
  //consignee info: string;
  consigneeName: string;
  consigneeAddress: string;
  consigneeCity: string;
  consigneeZip: string;
  consigneePhone: string;
}

const ShipperCell: React.FC<ShipperCellProps> = ({ shipperName, shipperAddress, shipperCity, shipperZip, shipperPhone, consigneeName, consigneeAddress, consigneeCity, consigneeZip, consigneePhone}) => {



  return (
    <ul>
      <li>
      <span className="font-light font-mono text-xs text-base">{shipperName}</span>
      </li>
      <li>
      <span className="font-light font-mono text-xs text-base">{shipperAddress}</span>
      </li>
      <li>
      <span className="font-light font-mono text-xs text-base">{shipperPhone}</span>
      </li>

      <li>
      <Spacer />
      <Divider />
      <Spacer />
      </li>
      <li>
      <span className="font-light text-xs text-base">{consigneeName}</span>
      </li>
      <li>
      <span className="font-light text-xs text-base">{consigneeAddress}</span>
      </li>
      <li>
      <span className="font-light text-xs text-base">{consigneePhone}</span>
      </li>

    </ul>
  );
};

export default ShipperCell;
