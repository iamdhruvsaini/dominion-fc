import getBaseURL from '@/utils/baseURL'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const playerPositionApi = createApi({
    reducerPath: 'playerPositionApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${getBaseURL()}/api/position`,
        credentials: 'include',
    }),
    tagTypes: ['PlayerPosition'],
    endpoints: (builder) => ({

        getDefendersPlayers: builder.query({
            query: ({ page = 1, player, country, position, age }) => {
                let queryString = `/defenders?page=${page}`;
                
                if (player) queryString += `&player=${encodeURIComponent(player)}`;
                if (country) queryString += `&country=${encodeURIComponent(country)}`;
                if (position) queryString += `&position=${encodeURIComponent(position)}`;
                if (age) queryString += `&age=${age}`;
      
                return queryString;
            },
            providesTags: ['PlayerPosition']
        }),
        getMidFieldersPlayers: builder.query({
            query: ({ page = 1, player, country, position, age }) => {
                let queryString = `/midfielders?page=${page}`;
                
                if (player) queryString += `&player=${encodeURIComponent(player)}`;
                if (country) queryString += `&country=${encodeURIComponent(country)}`;
                if (position) queryString += `&position=${encodeURIComponent(position)}`;
                if (age) queryString += `&age=${age}`;
      
                return queryString;
            },
            providesTags: ['PlayerPosition']
        }),
        getForwardsPlayers: builder.query({
            query: ({ page = 1, player, country, position, age }) => {
                let queryString = `/forwards?page=${page}`;
                
                if (player) queryString += `&player=${encodeURIComponent(player)}`;
                if (country) queryString += `&country=${encodeURIComponent(country)}`;
                if (position) queryString += `&position=${encodeURIComponent(position)}`;
                if (age) queryString += `&age=${age}`;
      
                return queryString;
            },
            providesTags: ['PlayerPosition']
        }),
        getGoalkeepersPlayers: builder.query({
            query: ({ page = 1, player, country, position, age }) => {
                let queryString = `/goalkeepers?page=${page}`;
                
                if (player) queryString += `&player=${encodeURIComponent(player)}`;
                if (country) queryString += `&country=${encodeURIComponent(country)}`;
                if (position) queryString += `&position=${encodeURIComponent(position)}`;
                if (age) queryString += `&age=${age}`;
      
                return queryString;
            },
            providesTags: ['PlayerPosition']
        }),
        getTrendingPlayers: builder.query({
            query: () => {
                let queryString = `/trending`;
                return queryString;
            },
            providesTags: ['PlayerPosition']
        }),
        getAllPlayers:builder.query({
            query: ({ page = 1, player, country, position, age }) => {
                let queryString = `/all-players?page=${page}`;
                
                if (player) queryString += `&player=${encodeURIComponent(player)}`;
                if (country) queryString += `&country=${encodeURIComponent(country)}`;
                if (position) queryString += `&position=${encodeURIComponent(position)}`;
                if (age) queryString += `&age=${age}`;
      
                return queryString;
            },
            providesTags: ['PlayerPosition']

        })
    }),
});

export const {
    useGetDefendersPlayersQuery,
    useGetMidFieldersPlayersQuery,
    useGetForwardsPlayersQuery, 
    useGetGoalkeepersPlayersQuery,
    useGetTrendingPlayersQuery,
    useGetAllPlayersQuery,
} = playerPositionApi;


export default playerPositionApi;
