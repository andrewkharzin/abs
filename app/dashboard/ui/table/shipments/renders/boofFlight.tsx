import React from 'react';
import { Chip, Divider, Spacer, Button } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { FaPlaneArrival } from 'react-icons/fa';
import { BsAirplaneEngines } from "react-icons/bs";
import { BiTransferAlt } from "react-icons/bi";
import { MdFlightLand } from "react-icons/md";
import { MdFlightTakeoff } from "react-icons/md";

interface BookFlightCellProps {
  flightNumber: string;
  departureAirport: string;
  destinationAirport: string;
  scheduledDeparture: string;
  scheduledArrival: string;
  transferAirport: string;
  flightNumber2: string;
  flightType: string;

}

const formatDate = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const formattedDate = date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  return formattedDate;
};


const BookFlightCell: React.FC<BookFlightCellProps> = ({ flightNumber, flightNumber2, transferAirport, departureAirport, destinationAirport, scheduledDeparture, scheduledArrival, flightType }) => {

  const formattedScheduledDeparture = formatDate(scheduledDeparture);
  const formattedScheduledArrival = formatDate(scheduledArrival);

  return (
    <ul>

      <li>
      <div className="flex gap-2.5 mx-auto">
        <span className="font-bold font-mono text-lg dark:text-red-600 text-slate-700">
            {flightNumber}{" "}
        </span>
        <span className='mt-1'>

          {flightType === 'TRANSFER' && <BiTransferAlt size="20" color='foreground'/>}
          {flightType === 'ONE_LEG' && <MdFlightLand size="20" color='foreground' />}
        </span>
        <span className="font-bold font-mono text-lg dark:text-red-600 text-slate-700">
            {flightNumber2}{" "}
          </span>
      </div>
      </li>
      <li>

      <Spacer />
      <Chip color="default" variant="light" size='sm' radius='sm'>
        {departureAirport}
      </Chip>
      {transferAirport && (
          <>
            <span className="text-xs font-light font-mono text-base">/</span>
            <span className='text-sm font-mono font-black dark:text-cyan-300/30'>{" "}{transferAirport}{" "}</span>

          </>
        )}
      <span className="text-xs font-light font-mono text-base">/</span>
      <Chip color="default" variant="light" size='sm' radius='sm'>
        {destinationAirport}
      </Chip>
      </li>
      <Spacer />
      <Spacer />
      <p className="tracking-wide font-mono  text-xs font-extralight text-slate-500">
           {flightType}
           {" "}| Flight
      </p>
      <li>
      <span className="text-xs font-bold font-mono dark:text-cyan-700 text-cyan-800">STD:</span>
      <Chip color="default" variant="light" size='lg' radius='sm'>

        <span className='font-mono text-sm font-light'>{formattedScheduledDeparture}</span>
      </Chip>
      </li>
      <li>
      <span className="text-xs font-bold font-mono dark:text-cyan-700 text-cyan-800">STA:</span>
      <Chip color="default" variant="light" size='lg' radius='sm'>

        <span className='cursor-pointer font-mono hover:font-semibold text-sm font-normal'>{formattedScheduledArrival}</span>

      </Chip>

      </li>
    </ul>
  );
};

export default BookFlightCell;
