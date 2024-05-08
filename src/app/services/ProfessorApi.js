import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const ProfessorApi = createApi(
    {
        reducerPath: 'ProfessorApi',
        baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/'}),
        
        endpoints: (builder) => ({
            getProfessors: builder.query({
                query: (start) => `professor?_start=${start}&_end=${start + 10}`,
                providesTags: ['Professors']
            }),

            deleteProfessor: builder.mutation({ 
                query: (id) => ({
                    url: `professor/${id}`,
                    method: 'DELETE',

                }),
                invalidatesTags: ['Professors']
            }), 

            createProfessor: builder.mutation({ 
                query: (info) => ({
                    url: `professor`,
                    method: 'POST',
                    body: {
                        id: info[0],
                        name: info[1],
                        lastName: info[2],
                        course: info[3],
                    }

                }),
                invalidatesTags: ['Professors']
            })
        })
    }
)

export const {
    useGetProfessorsQuery,
    useDeleteProfessorMutation,
    useCreateProfessorMutation

} = ProfessorApi;

