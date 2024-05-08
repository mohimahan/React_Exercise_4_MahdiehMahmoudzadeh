import { configureStore } from "@reduxjs/toolkit";
import { StudentApi } from "./services/StudentApi";
import { CourseApi } from "./services/CourseApi";
import { ProfessorApi } from "./services/ProfessorApi";

export const store = configureStore({
    reducer: {
        [StudentApi.reducerPath]: StudentApi.reducer,
        [CourseApi.reducerPath]: CourseApi.reducer,
        [ProfessorApi.reducerPath]: ProfessorApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(StudentApi.middleware, CourseApi.middleware, ProfessorApi.middleware)
})

