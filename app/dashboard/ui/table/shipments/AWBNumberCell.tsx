"use client";
import { useEffect, useState } from 'react';
import React from 'react';
import { Chip, Divider, Spacer } from "@nextui-org/react";
import {Tooltip, Button} from "@nextui-org/react";

interface AWBNumberCellProps {
  awbNumber: string;
  natureOfGoods: string;
  quantity: string;
  weight: string;
  volume: number;
  bookStatus: string
}

const AWBNumberCell: React.FC<AWBNumberCellProps> = ({ awbNumber, natureOfGoods, quantity, weight, volume, bookStatus }) => {
  const prefix = awbNumber.slice(0, 3);
  const number = awbNumber.slice(3);
  const [isMobile, setIsMobile] = useState<boolean>(false);


  // Определение ширины экрана и установка isMobile
  useEffect(() => {
    const updateMedia = () => {
      setIsMobile(window.innerWidth <= 768); // Измените значение на то, что вам нужно для мобильных устройств
    };

    updateMedia();
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  return (
    <ul>
      <li>
      <Chip color="warning" variant="faded" size='lg' radius='sm'>
        {prefix}
      </Chip>
      <span className="font-bold text-base">{" "}-{" "}{number}</span>
      </li>
      <li>
      <Chip color="warning" variant="light" size='lg' radius='sm'>
        {quantity}
      </Chip>
        <span className="text-xs font-extralight font-roboto text-base">pcs</span>
        <Chip color="warning" variant="light" size='lg' radius='sm'>
        {weight}
        </Chip>
        <span className="text-xs font-extralight font-roboto text-base">kg</span>
        <Chip color="warning" variant="light" size='lg' radius='sm'>
        {volume}
        </Chip>
        <span className="text-xs font-extralight font-roboto text-base">m3</span>

      </li>
      <li>
      <Spacer />
      <Divider />
      <Spacer />
      <p className="font-extralight text-base text-sm">
        N/g:
        <span className="font-bold dark:text-slate-200 text-slate-800">
        {" "}
        {isMobile ? (natureOfGoods.length > 10 ? natureOfGoods.substring(0, 40) + '...' : natureOfGoods) : natureOfGoods}
        </span>

        </p>
      </li>
      <li>
        <div>

      <span className="text-xs font-extralight font-roboto text-base">B/STATUS:</span>
      <Chip color="primary" variant="light" size='lg' radius='sm'>
        <p className="font-black font-roboto">{bookStatus}</p>
        </Chip>
        </div>

      </li>
    </ul>
  );
};

export default AWBNumberCell;
