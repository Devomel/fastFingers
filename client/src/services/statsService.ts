import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface DataItem {
   date: string;
   speed: number;
   accuracy: number;
}

export const statsService = createApi({
   reducerPath: "statsService",
   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
   endpoints: (builder) => ({
      getStats: builder.query<DataItem[], string>({
         query: (userId) => ({
            url: `/stats/${userId}`,
            method: "GET"
         })
      }),
      addStats: builder.mutation<void, { userId: string; data: DataItem }>({
         query: ({ userId, data }) => ({
            url: `/stats/${userId}`,
            method: "POST",
            body: data,
         }),
      }),
   }),
});


