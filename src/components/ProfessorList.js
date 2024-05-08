import React, { useState } from "react";
import { useGetProfessorsQuery, useDeleteProfessorMutation, useCreateProfessorMutation } from "../app/services/ProfessorApi";
import '../styles/styles.css'

function ProfessorList() {

    const [start, setStart] = useState(0);
    const { data: professors, isLoading, isFetching, isError, error } = useGetProfessorsQuery(start);
    const [deleteProfessor] = useDeleteProfessorMutation();
    const [createProfessor] = useCreateProfessorMutation();


    function deleteData(id) {
        
        deleteProfessor(id);

    }

    function submitProfessor(event) {
        event.preventDefault();
        const form = event.target;
        const name = form['p-name'].value;
        const lastName = form['p-lastName'].value;
        const id = form['pid'].value;
        const course = form['p-course'].value;
        createProfessor([id, name, lastName, course]);
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

        <div className="professors">

            <div className='professor-list'>
                <h1>لیست اساتید</h1>
                <div className="professor-container">
                    <table>
                        <tr >
                            <th >شماره</th>
                            <th>نام</th>
                            <th>نام خانوادگی</th>
                            <th >شماره پرسنلی</th>
                            <th >درس</th>

                        </tr>
                        {

                            professors.map((professor) => (
                                <tr className="text-center tr">
                                    <td >{++number}</td>
                                    <td>{professor.name}</td>
                                    <td>{professor.lastName}</td>
                                    <td>{professor.id}</td>
                                    <td>{professor.course}</td>
                                    <td>
                                        <button className="delete" onClick={() => deleteData(professor.id)}>حذف</button>
                                    </td>

                                </tr>
                            ))

                        }

                    </table>

                </div>


                <div className="next-prev">
                    <button className="btn-prev" disabled={start < 1} onClick={() => setStart((prev) => prev - 10)}>قبلی</button>
                    <button className="btn-next" disabled={professors.length < 10} onClick={() => setStart((prev) => prev + 10)}>بعدی</button>
                </div>

            </div>

            <div dir='rtl' className="addProfessor">
                <form action="" onSubmit={(event) => submitProfessor(event)}>

                    نام : <input type="text" id="p-name" required></input><br /><br />
                    نام خانوادگی : <input type="text" id="p-lastName" required></input><br /><br />
                    شماره پرسنلی : <input type="text" id="pid" required></input><br /><br />
                    درس : <input type="text" id="p-course" required></input><br /><br />

                    <button type="submit" className="btn">افزودن استاد</button>


                </form>
                <div className="explanation">توضیحات : با افزودن یک استاد، یک استاد به پایان لیست اساتید افزوده می شود.
                </div>
            </div>


        </div>


    )
}

export default ProfessorList;