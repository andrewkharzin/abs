// Import React and other necessary modules
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table';
import { Button } from "@nextui-org/button";
import AWBNumberCell from "./renders/AWBNumberCell";
import ShipperCell from "./renders/ShipperCell";
import BookFlightCell from "./renders/boofFlight";
import Loading from "./loading";


// Define the component
export default function Shipments() {
  // State variables
  const [awbs, setAwbs] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const supabase = createClient();

  const fetchTotalCount = async () => {
    try {
      const { count: totalCount } = await supabase
        .from('awbs')
        .select('count', { count: 'exact' })
        .single();

      return totalCount;
    } catch (error) {
      console.error('Error fetching total count:', error.message);
      return 0;
    }
  };


  // Fetch data from Supabase on component mount and when currentPage changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error, count } = await supabase.from('awbs').select(
          `
          awb_prefix,
          awb_number,
          book_type,
          awb_cargo_details (
            nature_of_goods,
            number_of_pieces,
            gross_weight,
            volume,
          ),
          shc (
            code,
            description
          ),
          flights (
            flight_number,
            departure_airport,
            destination_airport,
            scheduled_departure,
            scheduled_arrival,
            airport_transfer,
            flight_number2
             ),
          bookstatus ( status, description ),
          shippers (
            fido,
            address,
            city,
            zip,
            phone
          ),
          consignees (
            fido,
            address,
            city,
            zip,
            phone
          )

          `
        ).range(currentPage * 10, (currentPage + 1) * 10 - 1);
        if (error) {
          throw error;
        }
        console.log('Awbs data fetched successfully:', data);
        setAwbs(data);

        // Fetch the count separately
        const totalCount = await fetchTotalCount();
        console.log('Total count:', totalCount);
        setTotalPages(Math.max(Math.ceil(totalCount / 10), 1)); // Ensure totalPages is at least 1
      } catch (error) {
        console.error('Error fetching awbs:', error.message);
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
    { key: 'awb_number', width: '30%', label: 'AWB',  align: "left", color: "foreground" },
    { key: 'flight_number', width: '20%', label: 'Flight',  align: "left", color: "foreground" },
    { key: 'name', width: '40%', label: 'Shipper', align: "left", color: "foreground" },
    // { key: 'name', width: '40%', label: 'Consignee',  align: "left",  color: "violet" },
    // { key: 'nature_of_goods', label: 'N/G',  align: "left", className: "font-roboto font-bold text-sm uppercase", color: "violet" },

  ];

  // Render the component
  return (
    <div className="w-full flex flex-col gap-4">
      <Table aria-label="Shipments Table">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key} style={{ width: column.width, color: column.color }}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {awbs ? (
            awbs.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="mx-auto py-2 dark:hover:bg-gray-700/30 hover:bg-slate-500/40">
                <TableCell
                    key={`${rowIndex}-awb_number`}
                    style={{ width: columns[0].width }}

                  >
                    {row['awb_number'] ? (
                      <AWBNumberCell
                        awbPrefix={row['awb_prefix']}
                        awbNumber={row['awb_number']}
                        natureOfGoods={row['awb_cargo_details'] ? row['awb_cargo_details']['nature_of_goods'] || 'N/A' : 'N/A'}
                        quantity={row['awb_cargo_details'] ? row['awb_cargo_details']['number_of_pieces'] || 'N/A' : 'N/A'}
                        weight={row['awb_cargo_details'] ? row['awb_cargo_details']['gross_weight'] || 'N/A' : 'N/A'}
                        volume={row['awb_cargo_details'] ? row['awb_cargo_details']['volume'] || 'N/A' : 'N/A'}
                        bookStatus={row['bookstatus']['status']}
                        bookStatusDescription={row['bookstatus']['description']}
                        shrCode={row['shc']['code']}
                      />
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell
                     key={`${rowIndex}-flight_number`}
                  >
                    {row['flight'] ? (
                      <BookFlightCell
                        flightNumber={row['flights']['flight_number']}
                        departureAirport={row['flights']['departure_airport']}
                        destinationAirport={row['flights']['destination_airport']}
                        scheduledDeparture={row['flights']['scheduled_departure']}
                        scheduledArrival={row['flights']['scheduled_arrival']}
                        transferAirport={row['flights']['airport_transfer']}
                        flightNumber2={row['flights']['flight_number2']}
                        flightType={row['book_type']}
                        />
                    ) : (
                      'N/A'
                    )}

                  </TableCell>
                  <TableCell
                  key={`${rowIndex}-shipper_name`}


                >
                  {row['awb_number'] ? (
                      <ShipperCell
                        shipperName={row['shippers']['fido']}
                        shipperAddress={row['shippers']['address']}
                        shipperCity={row['shippers']['city']}
                        shipperZip={row['shippers']['zip']}
                        shipperPhone={row['shippers']['phone']}

                        consigneeName={row['consignees']['fido']}
                        consigneeAddress={row['consignees']['address']}
                        consigneeCity={row['consignees']['city']}
                        consigneeZip={row['consignees']['zip']}
                        consigneePhone={row['consignees']['phone']}
                      />
                    ) : (
                      'N/A'
                    )}
                </TableCell>


              </TableRow>
            ))
          ) : (
            // Render a row with 'No data available' message if awb data is null
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={`empty-${index}`} style={{ width: column.width }}><Loading /></TableCell>
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
