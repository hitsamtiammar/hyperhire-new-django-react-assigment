import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

const baseQueryFunc: BaseQueryFn<
    FetchArgs,
    unknown,
    FetchBaseQueryError
> = async(args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
        baseUrl: BASE_URL
    });

    const result = await baseQuery(args, api, extraOptions)

    return result;
}

export const baseApi = createApi({
    reducerPath: 'baseApiSlice',
    baseQuery: baseQueryFunc,
    refetchOnMountOrArgChange: 30,
    refetchOnReconnect: true,
    endpoints: () => ({})
})
