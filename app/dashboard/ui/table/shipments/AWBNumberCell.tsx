"use client";
import { useEffect, useState } from 'react';
import React from 'react';
import { FaPlaneArrival } from 'react-icons/fa';
import { Card, CardBody, Chip, Divider, Spacer } from "@nextui-org/react";
import {Tooltip, Button} from "@nextui-org/react";
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";

interface AWBNumberCellProps {
  awbPrefix: string;
  awbNumber: string;
  natureOfGoods: string;
  quantity: string;
  weight: string;
  volume: number;
  bookStatus: string
  bookStatusDescription: string
  shrCode: string;
}

const AWBNumberCell: React.FC<AWBNumberCellProps> = ({ awbPrefix, awbNumber, natureOfGoods, quantity, weight, volume, bookStatus, bookStatusDescription, shrCode }) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [backdrop, setBackdrop] = React.useState('blur')

  const backdrops = ["opaque", "blur", "transparent"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop)
    onOpen();
  }

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
      <div className="flex gap-2.5 ">
      <Chip variant="bordered" size='lg' radius='sm'>
      <span className="font-bold dark:text-cyan-600 text-cyan-800 dark:hover:text-cyan-400 hover:text-red-700">{awbPrefix}</span>
      </Chip>
      <span style={({color: "foreground"})} className="font-bold font-mono tracking-widest text-lg">{" "}-{" "}{awbNumber}</span>
      <span className='text-lg font-mono font-bold text-red-600'>{shrCode}</span>

      </div>

      </li>
      <li>
      <Chip variant="light" size='lg' radius='sm'>
        <span className="dark:text-cyan-600 text-cyan-800">{quantity}</span>
      </Chip>
        <span className="text-xs font-extralight font-roboto text-base">pcs</span>
        <Chip variant="light" size='lg' radius='sm'>
        <span className="dark:text-cyan-600 text-cyan-800">{weight}</span>
        </Chip>
        <span className="text-xs font-extralight font-roboto text-base">kg</span>
        <Chip variant="light" size='lg' radius='sm'>
        <span className="dark:text-cyan-600 text-cyan-800">{volume}</span>
        </Chip>
        <span className="text-xs font-extralight font-roboto text-base">m3</span>

      </li>
      <li>
      <Spacer />
      <Divider />
      <Spacer />
      <Button onPress={onOpen} variant="light" size="xs">
      <p className="cursor-pointer tracking-wide font-mono hover:font-semibold text-sm font-extralight text-base">
                  {isMobile ?
          (natureOfGoods.length > 20 ? natureOfGoods.substring(0, 50) + '...' : natureOfGoods)
          :
          (natureOfGoods.length > 10 ? natureOfGoods.substring(0, 40) + '...' : natureOfGoods)}
          </p>
      </Button>
      <Modal backdrop={backdrop}  isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col font-mono gap-1 uppercase">Nature and quantity of good</ModalHeader>
              <ModalBody>
                <span>(Incl, Deminsions Or Volume)</span>
              <Divider />
              <div className="flex flex-col no-wrap px-1 py-2">
                  <div>
                    <ul>


                        <li>
                        <span className="text-lg font-mono font-normal">
                          {natureOfGoods}
                        </span>
                        </li>
                        <Spacer />
                        <li>
                        <span className="text-sm font-light font-mono font-normal">
                          {quantity} pcs
                        </span>
                        { " " } / { " " }
                        <span className="text-sm font-bold font-mono font-normal">
                          {weight} kgs
                        </span>
                        </li>
                    </ul>
                  </div>
                </div>



              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </li>
      <li>

      <Spacer y={2} />
      <span className="text-xs font-bold font-mono dark:text-cyan-700 text-cyan-800">STATUS:</span>
      <Popover placement="right">
        <PopoverTrigger>
          <Chip color="default" variant="light" size='sm' radius='sm'>
          <p className="cursor-pointer font-mono hover:font-semibold text-sm font-normal">{" "}{bookStatus}</p>
        </Chip>
          {/* <Button size="sm">{bookStatus}</Button> */}
        </PopoverTrigger>
        <PopoverContent>
          {(titleProps) => (
            <div className="px-1 py-2">
              <p className="text-sm font-mono font-light uppercase" {...titleProps}>
                {bookStatusDescription}
              </p>

            </div>
          )}
        </PopoverContent>
      </Popover>
      {/* <Chip color="primary" variant="light" size='lg' radius='sm'>
        <p className="font-black font-roboto">{bookStatus}</p>
        </Chip> */}


      </li>
    </ul>
  );
};

export default AWBNumberCell;
