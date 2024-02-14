import React from 'react';
import { Chip, Divider, Spacer } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { FaPlaneArrival } from 'react-icons/fa';
import { BsAirplaneEngines } from "react-icons/bs";

interface ShipperCellProps {
  flightNumber: string;
  departureAirport: string;
  destinationAirport: string;
  scheduledDeparture: string;
  scheduledArrival: string;
  transferAirport: string;
  flightNumber2: string;

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


const FlightCell: React.FC<ShipperCellProps> = ({ flightNumber, flightNumber2, transferAirport, departureAirport, destinationAirport, scheduledDeparture, scheduledArrival }) => {

  const formattedScheduledDeparture = formatDate(scheduledDeparture);
  const formattedScheduledArrival = formatDate(scheduledArrival);

  return (
    <ul>
      <li>
        <div className="flex gap-2.5">


        <span className="font-bold font-mono text-lg">
          {flightNumber}{ " " }
          </span>
        <span className="font-bold font-mono text-lg">
          {flightNumber2}{ " " }
          </span>





        </div>
      </li>
      <li>
      {/* <Divider /> */}
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
      <Divider />
      <Spacer />
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

export default FlightCell;
