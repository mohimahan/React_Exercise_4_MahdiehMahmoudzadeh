import React, { useState } from "react";
import { useGetStudentsQuery, useDeleteStudentMutation, useCreateStudentMutation } from "../app/services/StudentApi";
import '../styles/styles.css'

function StudentList() {

    const [start, setStart] = useState(0);
    const { data: students, isLoading, isFetching, isError, error } = useGetStudentsQuery(start);
    const [deleteStudent] = useDeleteStudentMutation();
    const [createStudent] = useCreateStudentMutation();


    function addStudentToList(event) {
        event.preventDefault();
        const form = event.target;
        const name = form['name'].value;
        const lastName = form['lastName'].value;
        const id = form['id'].value;
        const major = form['major'].value;
        const emptyArray = [];
        createStudent([id, name, lastName, major, emptyArray]);
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

        <div className="students">

            <div className='student-list'>
                <h1>لیست دانشجویان</h1>
                <div className="container">
                    <table >
                        <tr>
                            <th>شماره</th>
                            <th>نام</th>
                            <th>نام خانوادگی</th>
                            <th>شماره دانشجویی</th>
                            <th>رشته تحصیلی</th>

                        </tr>
                        {

                            students.map((student) => (
                                <tr className="text-center">
                                    <td >{++number}</td>
                                    <td>{student.name}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.id}</td>
                                    <td>{student.major}</td>
                                    <td>
                                        <button className="delete" onClick={() => deleteStudent(student.id)}>حذف</button>
                                    </td>

                                </tr>
                            ))

                        }

                    </table>

                </div>


                <div className="next-prev">
                    <button className="btn-prev" disabled={start < 1} onClick={() => setStart((prev) => prev - 10)}>قبلی</button>
                    <button className="btn-next" disabled={students.length < 10} onClick={() => setStart((prev) => prev + 10)}>بعدی</button>
                </div>

            </div>

            <div dir='rtl' className="addStudent">

                <form action="" onSubmit={(event) => addStudentToList(event)}>
                    نام : <input type="text" id="name" required></input><br /><br />
                    نام خانوادگی : <input type="text" id="lastName" required></input><br /><br />
                    شماره دانشجویی : <input type="text" id="id" required></input><br /><br />
                    رشته تحصیلی : <input type="text" id="major" required></input><br /><br />

                    <button type="submit" className="btn">افزودن دانشجو</button>

                </form>

                <div className="explanation">توضیحات : با افزودن دانشجو، یک دانشجو به پایان لیست افزوده می شود. برای پیمایش لیست دانشجو از دکمه های "قبلی"  و "بعدی" استفاده نمایید.
                </div>   
            </div>


        </div>


    )
}

export default StudentList;