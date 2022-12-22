import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const usersAdapter = createEntityAdapter({})
const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      // query: () => `/users`,
      query: ({ page = 1, limit = 10, sort = 'createdAt', order = 'ASC', search = '' }) => `/users?page=${page}&limit=${limit}&search=${search}&sortBy=${sort}&order=${order}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedUsers = responseData.data.map((user) => {
          user.id = user._id
          return user
        })
        return usersAdapter.setAll(responseData, loadedUsers)
      },
      // providesTags: (result, error, page) => (result ? [...result.data.map(({ id }) => ({ type: 'User' })), { type: 'User', id: 'PARTIAL-LIST' }] : [{ type: 'User', id: 'PARTIAL-LIST' }]),
      providesTags: (result, error, page) => (result ? [{ type: 'User', id: 'PARTIAL-LIST' }, ...result.ids.map((id) => ({ type: 'User', id }))] : [{ type: 'User', id: 'PARTIAL-LIST' }])
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: '/users',
        method: 'POST',
        body: {
          ...initialUserData
        }
      }),
      invalidatesTags: [{ type: 'User', id: 'PARTIAL-LIST' }]
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: '/users',
        method: 'PATCH',
        body: {
          ...initialUserData
        }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'User', id },
        { type: 'User', id: 'PARTIAL-LIST' }
      ]
    })
  })
})

export const { useGetUsersQuery, useAddNewUserMutation, useUpdateUserMutation, useDeleteUserMutation } = usersApiSlice

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)
