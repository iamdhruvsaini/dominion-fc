import getBaseURL from '@/utils/baseURL'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const predictionApi= createApi({
    reducerPath: 'predictionApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${getBaseURL()}/api/prediction`,
        credentials:'include',
    }),
    tagTypes:['PREDICTION'],

    endpoints: (builder) => ({

      predictBestPlaying11: builder.mutation({
        query: (formData) => {
            return {
              url: '/predict-11',
              method: 'POST',
              body: formData,
            }
          },
        providesTags:['PREDICTION']
      }),

    }),
  })

  export const {usePredictBestPlaying11Mutation} = predictionApi;
  export default predictionApi;