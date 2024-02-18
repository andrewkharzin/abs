"use client";
import { useEffect, useState } from 'react';
import React from 'react';
import {Image} from "@nextui-org/react";
import { FaPlaneArrival } from 'react-icons/fa';
import { Card, CardBody, Chip, Divider, Spacer } from "@nextui-org/react";
import {Tooltip, Button} from "@nextui-org/react";
import {Popover, PopoverTrigger, PopoverContent} from "@nextui-org/react"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table';
import {Accordion, AccordionItem} from "@nextui-org/react";

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
  unNumber: number;
  dgrClass: string;
  subRisk: string;
  packGroup: string;
  nameDescription: string;
  dgrClassLabel: string;
  dgrEmergencyActions: string;
}

const AWBNumberCell: React.FC<AWBNumberCellProps> = ({ awbPrefix, awbNumber, natureOfGoods, quantity, weight, volume, bookStatus, bookStatusDescription, shrCode, unNumber, dgrClass, subRisk, packGroup, nameDescription, dgrClassLabel, dgrEmergencyActions }) => {
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
      <div className="grid grid-cols-2 gap-4">
        <div>

         <span className='text-lg font-mono font-bold text-red-600'>{shrCode}</span>

        </div>
        <div className='my-1'>
        <Image
              radius='none'
              width={20}
              src={dgrClassLabel}
              alt="Hazard Class"
              />
        </div>
      </div>

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
              <ModalHeader className="text-left flex flex-col font-mono gap-1 uppercase">
                Nature and quantity of good
                <span className='text-left text-sm font-mono darh:text-cyan-600/30 text-cyan-700'>(Incl, Deminsions Or Volume)</span>
                </ModalHeader>
              <ModalBody>
              <Divider />
                <div className="flex">
                  <div>
                    <ul>


                      <li>
                      <span className="text-lg font-mono font-normal uppercase">
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
                <Spacer y={2}/>
                <Divider />
                <div className="grid grid-cols-3 gap-4">
                  <div className='col-span-2'>

                    <h4 className='text-xs font-mono text-base font-extralight antialiased tracking-widest'>DANREGEOUS GOODS REGULATIONS</h4>
                  </div>
                  <div>
                  <h4 className='text-xs font-mono text-base font-extralight antialiased tracking-widest'>HAZARD LABEL</h4>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="grid grid-cols-3 gap-4">
                      <div className='col-span-2'>

                        <Spacer y={2}/>
                        <span className='font-mono bg-pink-500/50 font-extralight text-base'>{nameDescription}</span>
                        <Spacer y={2}/>
                        <p className="text-sm font-mono font-light">
                        UN: {" "}
                        <span className="text-sm font-mono font-bold text-red-700">
                        00{unNumber}
                        </span>
                        </p>
                        <Spacer y={2}/>
                        <p className="text-sm font-mono font-light">
                        CLASS: {" "}
                        <span className="text-sm font-mono font-bold text-red-700">
                        {dgrClass}
                        </span>
                        </p>
                        <Spacer y={2}/>
                        <p className="text-sm font-mono font-light">
                        SUB RISK: {" "}
                        <span className="text-sm font-mono font-bold text-red-700">
                        {subRisk}
                        </span>
                        </p>
                       <Spacer y={2} />
                        <p className="text-sm font-mono font-light">
                        PACK GROUP: {" "}
                        <span className="text-sm font-mono font-bold text-red-700">
                        {packGroup}
                        </span>
                        </p>
                        <Spacer y={4} />

                        <h4 className='text-md font-mono text-pink-600 font-bold antialiased tracking-widest'>EMERGENCY ACTIONS</h4>
                        <p className='mt-5 font-mono font-normal text-md text-base'>{dgrEmergencyActions}</p>
                      </div>

                      <div>

                      <Spacer y={2} />
                      <Image

                          isBlurred
                          width={80}
                          src={dgrClassLabel}
                          alt="NextUI Album Cover"
                          classNames="m-5"
                        />
                      </div>





                  </div>

                </div>



              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
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
      <span className="text-sm font-bold font-mono dark:text-cyan-600 text-cyan-800">STATUS:</span>
      <Popover placement="right">
        <PopoverTrigger>
          <Chip color="default" variant="light" size='sm' radius='sm'>
          <p className="cursor-pointer font-mono hover:font-semibold text-sm font-normal">{" "}{bookStatus}</p>
        </Chip>
          {/* <Button size="sm">{bookStatus}</Button> */}
        </PopoverTrigger>
        <PopoverContent>
          {(titleProps) => (
            <><div className="px-1 py-2">
              <p className="text-sm font-mono font-light uppercase" {...titleProps}>
              {bookStatusDescription}
              </p>

              </div>

              </>
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


