import { baseApi } from "./baseApi";
import {  AddRequest, AddResponse, GetAllDataResponse, GetRootResponse, UpdateDeleteResponse, UpdateRequest } from "./menuItemApi.interface";

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
        deleteMenuItem: builder.mutation<UpdateDeleteResponse, string>({
            query: (params) => ({
                url: `delete/${params}`,
                method: 'DELETE',
                headers: {
                    Accept: 'application/json'
                }
            }),
            transformResponse: (response: UpdateDeleteResponse) => response,
            transformErrorResponse: (error) => {
                return error
            }
        }),
        updateMenuItem: builder.mutation<UpdateDeleteResponse, UpdateRequest>({
            query: (params) => ({
                url: 'update/',
                method: 'PUT',
                body: params,
                headers: {
                    Accept: 'application/json'
                }
            }),
            transformResponse: (response: UpdateDeleteResponse) => response,
            transformErrorResponse: (error) => {
                return error
            }
        }),
        addMenuItem: builder.mutation<AddResponse, AddRequest>({
            query: (params) => ({
                url: 'add/',
                method: 'POST',
                body: params,
                headers: {
                    Accept: 'application/json'
                }
            }),
            transformResponse: (response: AddResponse) => response,
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
    useLazyGetAllDataFromRootIdQuery,
    useDeleteMenuItemMutation,
    useUpdateMenuItemMutation,
    useAddMenuItemMutation
} = menuItemApiSlice
