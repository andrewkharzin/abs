import React from 'react';
import { Chip, Divider, Spacer } from "@nextui-org/react";
import { useEffect, useState } from 'react';

interface ShipperCellProps {
  flightNumber: string;
  departureAirport: string;
  destinationAirport: string;
  scheduledDeparture: string;
  scheduledArrival: string;

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


const FlightCell: React.FC<ShipperCellProps> = ({ flightNumber, departureAirport, destinationAirport, scheduledDeparture, scheduledArrival }) => {

  const formattedScheduledDeparture = formatDate(scheduledDeparture);
  const formattedScheduledArrival = formatDate(scheduledArrival);

  return (
    <ul>
      <li>

       <span style={({ color: "violet "})} className="font-bold text-base text-lg">{flightNumber}</span>
      </li>
      <li>
      {/* <Divider /> */}
      <span className="text-xs font-extralight font-roboto text-base">FROM</span>
      <Chip color="default" variant="light" size='lg' radius='sm'>
        {departureAirport}
      </Chip>
      <span className="text-xs font-extralight font-roboto text-base">TO</span>
      <Chip color="success" variant="light" size='lg' radius='sm'>
        {destinationAirport}
      </Chip>
      </li>
      <li>
      <span className="text-xs font-extralight font-roboto text-base">STD:</span>
      <Chip color="default" variant="light" size='lg' radius='sm'>
        {/* {scheduledDeparture} */}
        {formattedScheduledDeparture}
      </Chip>
      <span className="text-xs font-extralight font-roboto text-base">STA:</span>
      <Chip color="success" variant="light" size='lg' radius='sm'>
        {/* {scheduledArrival} */}
        {formattedScheduledArrival}
      </Chip>
      </li>
    </ul>
  );
};

export default FlightCell;
