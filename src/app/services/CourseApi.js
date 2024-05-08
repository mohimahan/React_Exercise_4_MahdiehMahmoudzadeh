import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const CourseApi = createApi(
    {
        reducerPath: 'CourseApi',
        baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/'}),
        
        endpoints: (builder) => ({
            getCourses: builder.query({
                query: (start) => `course?_start=${start}&_end=${start + 10}`,
                providesTags: ['Courses']
            }),

            getCoursesAll: builder.query({
                query: () => `course`,
                providesTags: ['Courses']
            }),

            deleteCourse: builder.mutation({ 
                query: (id) => ({
                    url: `course/${id}`,
                    method: 'DELETE',

                }),
                invalidatesTags: ['Courses']
            }), 

            createCourse: builder.mutation({ 
                query: (info) => ({
                    url: `course`,
                    method: 'POST',
                    body: {
                        id: info[0],
                        courseName: info[1],
                        courseCredit: info[2],
                        professorName: info[3],
                        professorLastName: info[4],
          
                    }

                }),
                invalidatesTags: ['Courses']
            })
        })
    }
)

export const {
    useGetCoursesQuery,
    useGetCoursesAllQuery,
    useDeleteCourseMutation,
    useCreateCourseMutation

} = CourseApi;

