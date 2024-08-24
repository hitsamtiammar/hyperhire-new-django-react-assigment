import { baseApi } from "./baseApi";
import { GetAllDataResponse, GetRootResponse } from "./menuItemApi.interface";

export const menuItemApiSlice = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getRootMenuItem: builder.query<GetRootResponse, void>({
            query: () => ({
                url: 'view-root/',
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            }),
            transformResponse: (response: GetRootResponse) => response,
            transformErrorResponse: (error) => {
                return error
            }
        }),
        getAllDataFromRootId: builder.query<GetAllDataResponse, string>({
            query: (params) => ({
                url: `view-data/${params}`,
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            }),
            transformResponse: (response: GetAllDataResponse) => response,
            transformErrorResponse: (error) => {
                return error
            }
        })
    })
})

export const {
    useGetRootMenuItemQuery,
    useLazyGetAllDataFromRootIdQuery
} = menuItemApiSlice
