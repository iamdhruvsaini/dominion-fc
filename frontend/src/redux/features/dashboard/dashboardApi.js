import getBaseURL from '@/utils/baseURL'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const dashboardApi= createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${getBaseURL()}/api/dashboard`,
        credentials:'include',

    }),
    tagTypes:['Dashboard'],

    endpoints: (builder) => ({

      getPlayerPositionCount: builder.query({
        query: () => `/player-position-count`,
        providesTags:['Dashboard']
      }),

      getRecentSoldPlayer:builder.query({
        query:()=>"/recent-sold-player",
        providesTags:['Dashboard']
      }),

      getPlayerDetailsByID:builder.query({
        query:(id)=>`/player-detail/${id}`,
        providesTags:['Dashboard']
    }),

    }),
  })

  export const { useGetPlayerPositionCountQuery ,useGetRecentSoldPlayerQuery,useGetPlayerDetailsByIDQuery} = dashboardApi;
  export default dashboardApi;