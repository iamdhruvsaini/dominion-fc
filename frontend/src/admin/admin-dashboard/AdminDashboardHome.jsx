import BoxLoading from "@/components/BoxLoading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import {
  useGetHomeStatsQuery,
  useGetSoldPlayersQuery,
} from "@/redux/features/admin/adminApi";
import { useGetTrendingPlayersQuery } from "@/redux/features/position/playerPositionApi";
import { getSocket } from "@/utils/socket";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const AdminDashboardHome = () => {
  const {
    data: stats,
    isLoading: isStatsLoading,
    refetch: refetchStats,
  } = useGetHomeStatsQuery();
  const {
    data: soldPlayers,
    isLoading: isSoldPlayersLoading,
    refetch: refetchSoldPlayers,
  } = useGetSoldPlayersQuery(undefined, { pollingInterval: 0 }); // ❌ No polling
  const {
    data: trendingPlayers,
    isLoading: isTrendingPlayersLoading,
    refetch: refetchTrendingPlayers,
  } = useGetTrendingPlayersQuery(undefined, { pollingInterval: 0 }); // ❌ No polling

  useEffect(() => {
    const socket = getSocket();

    const handlePlayerUpdate = async () => {
      await refetchStats();
      await refetchSoldPlayers();
      await refetchTrendingPlayers();
    };

    socket.off("playerUpdated", handlePlayerUpdate);
    socket.on("playerUpdated", handlePlayerUpdate);

    return () => {
      socket.off("playerUpdated");
    };
  }, []);

  if (isSoldPlayersLoading || isStatsLoading || isTrendingPlayersLoading) {
    return <BoxLoading />;
  }

  return (
    <main className="flex flex-1 flex-col gap-4">
      <div className="flex w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 md:gap-6">
          {/* Dashboard Stats */}
          <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Players
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats?.data?.total_players}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Countries</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats?.data?.total_countries}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Trending Players
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats?.data?.trending_players}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Sold Players
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats?.data?.total_players_sold}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trending & Sold Players Section */}
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-4">
            {/* Trending Players */}
            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Trending Players</CardTitle>
                  <CardDescription>
                    Recent trending players on the website.
                  </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link to="/admin/portal/trending-players">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player Name</TableHead>
                      <TableHead>Player ID</TableHead>
                      <TableHead>Nationality</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trendingPlayers?.data
                      ?.slice(0, 10)
                      .map((player, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="font-medium">
                              {player.short_name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {player.player_id}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              {player.nationality_name}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Recently Sold Players */}
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Recently Sold</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">
                {soldPlayers?.data?.slice(0, 8).map((player, index) => (
                  <div className="flex items-center gap-4" key={index}>
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src={player.player_face_url} alt="Avatar" />
                      <AvatarFallback>{player.short_name}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {player.short_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {player.nationality_name}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      $ {player.wage_eur}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </main>
  );
};

export default AdminDashboardHome;
