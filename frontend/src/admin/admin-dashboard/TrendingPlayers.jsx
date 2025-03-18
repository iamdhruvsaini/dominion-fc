import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTrendingPlayersQuery } from "@/redux/features/position/playerPositionApi";
import React from "react";

const TrendingPlayers = () => {
    
  const { data: trendingPlayers, isLoading: isTrendingPlayerLoading } = useGetTrendingPlayersQuery();

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Trending Players</CardTitle>
          <CardDescription>Recent trending players on website.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="">Player Id</TableHead>
              <TableHead className="">Age</TableHead>
              <TableHead className="">Nationality</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trendingPlayers?.data?.map((player, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{player.short_name}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{player.player_id}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{player.age}</div>
                </TableCell>

                <TableCell>
                  <div className="font-medium">{player.nationality_name}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TrendingPlayers;
