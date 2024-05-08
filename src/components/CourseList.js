import React, { useState } from "react";
import { useGetCoursesQuery, useDeleteCourseMutation, useCreateCourseMutation } from "../app/services/CourseApi";
import '../styles/styles.css'

function CourseList() {

    const [start, setStart] = useState(0);
    const { data: courses, isLoading, isFetching, isError, error } = useGetCoursesQuery(start);
    const [deleteCourse] = useDeleteCourseMutation();
    const [createCourse] = useCreateCourseMutation();


    function deleteData(id) { 

        deleteCourse(id);
    }
  
    function addCourseToList(event) {
        event.preventDefault();
        const form = event.target;
        const courseName = form['courseName'].value;
        const id = form['courseId'].value;
        const courseCredit = form['courseCredit'].value;
        const professorName = form['professorName'].value;
        const professorLastName = form['professorLastName'].value;
        createCourse([ id, courseName, courseCredit, professorName, professorLastName ]);
        event.target.reset()
    }

    var number = start;

    if (isLoading || isFetching) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{error.status}</div>
    }

    return (

        <div  className="courses">

           <div className='course-list'>
                <h1>لیست دروس</h1>
                <div className="course-container">
                    <table>
                        <tr>
                            <th>شماره</th>
                            <th>نام درس</th>
                            <th>کد درس</th>
                            <th>تعداد واحد</th>
                            <th>استاد</th>

                        </tr>
                        {   
                
                            courses.map((course) => (
                                <tr className="text-center tr">
                                    <td >{++number}</td>
                                    <td>{course.courseName}</td>
                                    <td>{course.id}</td>
                                    <td>{course.courseCredit}</td>
                                    <td>{course.professorName + " " + course.professorLastName}</td>
                                    <td>
                                        <button className="delete" onClick={() =>  deleteData(course.id)}>حذف</button>
                                    </td>

                                </tr>
                            )) 
                        
                        }

                    </table>

                </div>


                <div className="next-prev">
                    <button className="btn-prev" disabled={start < 1} onClick={() => setStart((prev) => prev - 10)}>قبلی</button>
                    <button className="btn-next" disabled={courses.length < 10 } onClick={() => setStart((prev) => prev + 10)}>بعدی</button>
                </div>

            </div>

            <div dir='rtl' className="addCourse">
                <form action="" onSubmit={(event) => addCourseToList(event)}>

                    نام درس : <input type="text" id="courseName" required></input><br /><br />
                    کد درس : <input type="text" id="courseId" required></input><br /><br />
                    تعداد واحد : <input type="text" id="courseCredit" required></input><br /><br />
                    نام استاد : <input type="text" id="professorName" required></input><br /><br />
                    نام خانوادگی : <input type="text" id="professorLastName" required></input><br /><br />

                  
                    <button type="submit" className="btn">افزودن درس</button>
                  
                </form>
                
                <div className="explanation">توضیحات : با افزودن یک درس، یک درس به پایان لیست دروس افزوده می شود.
                </div>            
            </div>


        </div>


    )
}

export default CourseList;