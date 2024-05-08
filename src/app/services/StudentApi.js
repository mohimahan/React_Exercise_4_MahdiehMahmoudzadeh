import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const StudentApi = createApi(
    {
        reducerPath: 'StudentApi',
        baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/' }),

        endpoints: (builder) => ({
            getStudents: builder.query({
                query: (start) => `student?_start=${start}&_end=${start + 10}`,
                providesTags: ['Students']
            }),

            getStudentsAll: builder.query({
                query: () => `student`,
                providesTags: ['Students']
            }),

            deleteStudent: builder.mutation({
                query: (id) => ({
                    url: `student/${id}`,
                    method: 'DELETE',

                }),
                invalidatesTags: ['Students']
            }),

            createStudent: builder.mutation({
                query: (info) => ({
                    url: `student`,
                    method: 'POST',
                    body: {
                        id: info[0],
                        name: info[1],
                        lastName: info[2],
                        major: info[3],
                        selectedCourses: info[4]
                    }

                }),
                invalidatesTags: ['Students']
            }),

            updateStudent: builder.mutation({
                query: ({ id, selectedCourses }) => ({
                    url: `student/${id}`,
                    method: 'PATCH',
                    body: {
                        selectedCourses

                    }
                }),
                invalidatesTags: ['Students'],
            })
        })
    }
)

export const {
    useGetStudentsQuery,
    useGetStudentsAllQuery,
    useDeleteStudentMutation,
    useCreateStudentMutation,
    useUpdateStudentMutation

} = StudentApi;

