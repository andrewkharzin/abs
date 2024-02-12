"use client";

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table';
import { Button } from "@nextui-org/button";

export default function Airports() {
  const [airports, setAirports] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // Initialize totalPages to 1
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error, count } = await supabase.from('airports').select('*').range(currentPage * 10, (currentPage + 1) * 10 - 1);
        if (error) {
          throw error;
        }
        console.log('Airports data fetched successfully:', data);
        setAirports(data);

        // Fetch the count separately
        const { count: totalCount } = await supabase.from('airports').select('count', { count: 'exact' }).single();
        console.log('Total count:', totalCount);
        setTotalPages(Math.max(Math.ceil(totalCount / 10), 1)); // Ensure totalPages is at least 1
      } catch (error) {
        console.error('Error fetching airports:', error.message);
      }
    };
    fetchData();
  }, [currentPage, supabase]); // Add supabase to the dependency array

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const columns = [
    { key: 'iata', label: 'IATA',  width: '10%' , align: "left", className: "font-roboto font-blcak text-lg uppercase", color: "foreground" },
    { key: 'name', label: 'CITY', width: '70%', align: "left", className: "font-roboto font-bold text-sm  uppercase", color: "foreground"  },
    { key: 'cntr_code', label: 'COUNTRY', width: '20%', align: "left", className: "font-roboto font-bold text-sm  uppercase", color: "foreground"  },
  ];

  return (
    <div style={{ width: '500px', overflowX: 'auto' }}>
      <Table aria-label="Airports Table">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key} style={{ width: column.width, align: column.align, className: column.className, color: column.color }}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody style={{ backgroundColor: 'bg-background/10' }}>
    {airports ? (
      airports.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell
                    key={`${rowIndex}-${column.key}`}
                    style={{ width: column.width, textAlign: column.key === 'iata' ? 'left' : column.align  }}
                    className={column.key === 'iata' ? 'font-extrabold antialiased text-fuchsia-800 dark:text-pink-700' : ''}
                  >
                    {row[column.key] || 'N/A'} {/* Display 'N/A' if value is missing or null */}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={`empty-${index}`} style={{ width: column.width, align: column.align }}>No data available</TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className='mt-10'>
        <Button size="sm" variant="flat" onClick={handlePrevPage} disabled={currentPage === 0}>Previous</Button>
        <span className='mx-4 text-base font-normal font-roboto text-xs dark:text-slate-300'>{`Page ${currentPage + 1} of ${totalPages}`}</span>
        <Button size="sm"  variant="flat" onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Next</Button>
      </div>
    </div>
  );
}
