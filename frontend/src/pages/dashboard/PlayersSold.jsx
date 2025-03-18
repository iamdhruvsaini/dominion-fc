import BoxLoading from "@/components/BoxLoading";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetRecentSoldPlayerQuery } from "@/redux/features/dashboard/dashboardApi";

export function PlayersSold() {

  const {data: players = { data: [] },isLoading,isError} = useGetRecentSoldPlayerQuery();

  if(isError){
    return <p>Start the server</p>
    }

  if (isLoading) {
    return <BoxLoading />;
  }

  return (
    <Table>
      <TableCaption> List of the sold players</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Position</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Nationality</TableHead>
          <TableHead className="text-right">Wage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players?.data?.length > 0 ? (
          players.data.map((item, index) => (
            <TableRow key={index} className="font-semibold italic text-gray-700">
              <TableCell>{item.position}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.country}</TableCell>
              <TableCell className="text-right">{item.wage}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan="4" className="text-center">
              No players found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
