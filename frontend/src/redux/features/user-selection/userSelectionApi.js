import getBaseURL from '@/utils/baseURL'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userSelectionApi= createApi({
    reducerPath: 'userSelectionApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${getBaseURL()}/api/user-selection/`,
        credentials:'include',
    }),
    tagTypes:['SelectedPlayer'],
    endpoints: (builder) => ({

      addSelectedPlayer: builder.mutation({
        query: (formData) => {
            return {
                url:'/player',
                method:'POST',
                body:formData,
            }
        },
        invalidatesTags: ['SelectedPlayer'],
      }),

      removeSelectedPlayer:builder.mutation({
        query: (formData) => {
          return {
              url:'/selected-player/remove',
              method:'DELETE',
              body:formData,
          }
        },
        invalidatesTags: ['SelectedPlayer'],
      })

    }),


    

  })

  export const {useAddSelectedPlayerMutation,useRemoveSelectedPlayerMutation} = userSelectionApi;
  export default userSelectionApi;