import getBaseURL from '@/utils/baseURL'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const statsRankingApi= createApi({
    reducerPath: 'statsRankingApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${getBaseURL()}/api/stats`,
        credentials:'include',
    }),
    tagTypes:['STATS'],
    endpoints: (builder) => ({

      getRanking: builder.query({
        query: (link) => `/${link}`,
        providesTags:['STATS']
        }),

      getComparisonPlayers:builder.query({
        query:({overall,position})=>`/comparison/similar-player/${overall}/${position}`,
      })


      }),
  })

  export const { useGetRankingQuery,useLazyGetComparisonPlayersQuery} = statsRankingApi;
  export default statsRankingApi;