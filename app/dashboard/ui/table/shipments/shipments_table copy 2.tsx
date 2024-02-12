// Import React and other necessary modules
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table';
import { Button } from "@nextui-org/button";
import RenderAwbCell from "./render-cell"

// Define the component
export default function Shipments() {
  // State variables
  const [awb, setAwb] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const supabase = createClient();

  // Fetch data from Supabase on component mount and when currentPage changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error, count } = await supabase.from('awb').select(
          `awb_id,
           awb_number,
           date_of_issue,
            shipper (
              name,
              contact_info
              ),
            consignee(name),
            handlinginformation(
              nature_of_goods,
              special_handling
            )`
          ).range(currentPage * 10, (currentPage + 1) * 10 - 1);
        if (error) {
          throw error;
        }
        console.log('Airports data fetched successfully:', data);
        setAwb(data);

        // Fetch the count separately
        const { count: totalCount } = await supabase.from('awb').select('count', { count: 'exact' }).single();
        console.log('Total count:', totalCount);
        setTotalPages(Math.max(Math.ceil(totalCount / 10), 1)); // Ensure totalPages is at least 1
      } catch (error) {
        console.error('Error fetching airports:', error.message);
      }
    };
    fetchData();
  }, [currentPage, supabase]); // Add supabase to the dependency array

  // Handlers for pagination
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  // Define table columns
  const columns = [
    { key: 'awb_number', label: 'AWB',  align: "left", className: "font-roboto font-black text-sm uppercase", color: "violet" },
    { key: 'date_of_issue', label: 'D/I',  align: "left", className: "font-roboto font-bold text-sm uppercase", color: "violet" },
    { key: 'name', label: 'Shipper', width: '90%', align: "left", className: "font-roboto font-bold text-sm uppercase", color: "violet" },
    { key: 'name', label: 'Consignee',  align: "left", className: "font-roboto font-bold text-sm uppercase", color: "violet" },
    { key: 'nature_of_goods', label: 'N/G',  align: "left", className: "font-roboto font-bold text-sm uppercase", color: "violet" },

  ];

  // Render the component
  return (
    <div style={{ width: '500px', overflowX: 'auto' }}>
      <Table aria-label="Airports Table">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key} style={{ width: column.width, align: column.align, className: column.className, color: column.color }}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody style={{ backgroundColor: 'bg-background/10' }}>
          {awb ? (
            awb.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {/* Render AWB number with prefix and hyphen */}
                <TableCell
                  key={`${rowIndex}-awb_number`}
                  style={{ width: columns[0].width, textAlign: columns[0].align, color: columns[0].color }}
                  className={columns[0].className}
                >
                  {row['awb_number'] ? (
                    <>
                      {row['awb_number'].substring(0, 3)}-{row['awb_number'].substring(3)}
                    </>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                {/* <TableCell>
                  <RenderAwbCell value={row['awb_number']} />
                </TableCell> */}
                {/* Render other columns as they are */}
                <TableCell
                  key={`${rowIndex}-date_of_issue`}
                  style={{ width: columns[1].width, textAlign: columns[1].align }}
                  className={columns[1].className}
                >
                  {row['date_of_issue'] || 'N/A'}
                </TableCell>
                 {/* Render shipper name */}
                <TableCell
                  key={`${rowIndex}-shipper_name`}
                  style={{ width: columns[2].width, textAlign: columns[2].align }}
                  className={columns[2].className}
                >
                  {row['shipper'] ? row['shipper']['name'] || 'N/A' : 'N/A'}
                </TableCell>
                {/* Render consignee name */}
                <TableCell
                  key={`${rowIndex}-consignee_name`}
                  style={{ width: columns[2].width, textAlign: columns[2].align }}
                  className={columns[2].className}
                >
                  {row['consignee'] ? row['consignee']['name'] || 'N/A' : 'N/A'}
                </TableCell>
                 {/* Render handling information */}
                 <TableCell
                  key={`${rowIndex}-handlinginformation_nature_of_goods`}
                  style={{ width: columns[2].width, textAlign: columns[2].align }}
                  className={columns[2].className}
                >
                  {row['handlinginformation'] ? row['handlinginformation']['nature_of_goods'] || 'N/A' : 'N/A'}
                </TableCell>
              </TableRow>
            ))
          ) : (
            // Render a row with 'No data available' message if awb data is null
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={`empty-${index}`} style={{ width: column.width, align: column.align }}>No data available</TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Pagination controls */}
      <div className='mt-10'>
        <Button size="sm" variant="flat" onClick={handlePrevPage} disabled={currentPage === 0}>Previous</Button>
        <span className='mx-4 text-base font-normal font-roboto text-xs dark:text-slate-300'>{`Page ${currentPage + 1} of ${totalPages}`}</span>
        <Button size="sm" variant="flat" onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Next</Button>
      </div>
    </div>
  );
}
