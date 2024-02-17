import React from 'react';
import { Chip, Divider, Spacer, Button } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table';


interface AwbDgrCellProps {
  classDevision: string;
  nameDescription: string;
  unNumber: string;


}




const DgrFlightCell: React.FC<AwbDgrCellProps> = ({ classDevision, nameDescription, unNumber }) => {



  return (
    <Table>
      <TableHeader>
        <TableColumn>UN Number</TableColumn>
        <TableColumn>Class</TableColumn>
        <TableColumn>Name</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
               {unNumber}
          </TableCell>
          <TableCell>
               {classDevision}
          </TableCell>
          <TableCell>
               {nameDescription}
          </TableCell>

        </TableRow>

      </TableBody>
    </Table>
  );
};

export default DgrFlightCell;
