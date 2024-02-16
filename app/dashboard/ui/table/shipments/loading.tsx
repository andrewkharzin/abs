import React from "react";
import {Skeleton} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

// export default function Loading() {
//   return (
//     <Card className="w-[200px] space-y-5 p-4" radius="lg">
//       <Skeleton className="rounded-lg">
//         <div className="h-24 rounded-lg bg-default-300"></div>
//       </Skeleton>
//       <div className="space-y-3">
//         <Skeleton className="w-3/5 rounded-lg">
//           <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
//         </Skeleton>
//         <Skeleton className="w-4/5 rounded-lg">
//           <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
//         </Skeleton>
//         <Skeleton className="w-2/5 rounded-lg">
//           <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
//         </Skeleton>
//       </div>
//     </Card>
//   );
// }



export default function Loading() {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>
        <Skeleton className="rounded-lg">
       <div className="h-4 rounded-lg bg-default-400"></div>
       </Skeleton>
        </TableColumn>
        <TableColumn>
        <Skeleton className="rounded-lg">
         <div className="h-6 rounded-lg bg-default-300"></div>
       </Skeleton>
        </TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
          <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          </TableCell>
          <TableCell>
          <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-300"></div>
          </Skeleton>
          </TableCell>
        </TableRow>

      </TableBody>
    </Table>
  );
}
