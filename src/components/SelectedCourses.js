import React, { useState, useRef } from "react";
import { useUpdateStudentMutation, useGetStudentsAllQuery } from "../app/services/StudentApi";
import { useGetCoursesAllQuery } from "../app/services/CourseApi";
import '../styles/styles.css';

function SelectedCourses() {

    const inputRef = useRef(null)
    const [selectedCourses, setSelectedCourses] = useState([])
    const { data: students } = useGetStudentsAllQuery();
    const { data: courses } = useGetCoursesAllQuery();
    const [updateStudent] = useUpdateStudentMutation();
    var number = 1;


    function addCourseToList(event) {

        event.preventDefault();
        const form = event.target;
        const id = form['id'].value;
        const courseId = form['courseId'].value;
        var prevSelectedCourses = [];
        var courseIdCredit;
        var sum = 0;

        students.forEach(student => {
            if (student.id == id) {
                prevSelectedCourses = student.selectedCourses
            }
        }); 

        
        courses.forEach(course => {
            prevSelectedCourses.forEach(item => {
                if (course.id == item ) {         
                    sum += Number(course.courseCredit); 
 
                }
            });

            if (course.id == courseId) { 
                courseIdCredit = course.courseCredit;

            }

        });
        

        if ( sum + Number(courseIdCredit) > 20) {
            alert("تا سقف 20 واحد مجاز به انتخاب می باشید")
        } else {updateStudent({ id: id, selectedCourses: [...prevSelectedCourses, courseId] })}
        
    
    }

    function showSelectedCourses() {
        const id = inputRef.current.value;
        var coursesId = [];
        var temp = [];
        students.forEach((item) => {
            if (item.id == id) {
                coursesId = item.selectedCourses
            }
        })

        
        courses.forEach(item => {
            coursesId.forEach(element => {
                if (item.id == element) {
                    temp.push(item)
                }
            })

        });
        setSelectedCourses(temp)
    }


    function deleteSelectedCourses() {
        updateStudent({ id: inputRef.current.value, selectedCourses: [] })
    }

    return (

        <div className="selected-courses">

            <div className='selected-course-list '>
                <h1>لیست دروس انتخابی دانشجو</h1>
                <div className="course-container">
                    <table>
                        <tr className="course-tr">
                            <th className="course-th1">شماره</th>
                            <th>نام درس</th>
                            <th>کد درس</th>
                            <th className="course-th4">تعداد واحد</th>
                            <th className="course-th5">استاد</th>

                        </tr>
                        {

                            selectedCourses.map((course) => (
                                <tr className="text-center tr">
                                    <td>{number++}</td>
                                    <td>{course.courseName}</td>
                                    <td>{course.id}</td>
                                    <td>{course.courseCredit}</td>
                                    <td>{course.professorName + " " + course.professorLastName}</td>
                                </tr>
                            ))

                        }

                    </table>

                </div>

            </div>

            <div dir='rtl' className="add-selected-Course ">

                <form action="" onSubmit={(event) => addCourseToList(event)}>
                    شماره دانشجویی : <input type="text" id="id" placeholder="44567827" required></input><br /><br />
                    کد درس : <input type="text" id="courseId" placeholder="1213" required></input><br /><br />
                    <button type="submit" className="btn btn-add">افزودن درس</button>

                </form>
                <div className="explanation">توضیحات : برای افزودن درس به لیست دروس انتخابی، شماره دانشجویی را از لیست دانشجویان و کد درس را از لیست دروس، انتخاب نموده و در کادر بالا وارد نمایید.
                 با هر بار وارد کردن کد درس و فشردن دکمه، یک درس به دروس انتخابی افزوده می شود. تا سقف 20 واحد مجاز به انتخاب هستید. کد تکراری وارد ننمایید. 
                </div>

                شماره دانشجویی : <input type="text" id="sid" ref={inputRef} placeholder="44567827"></input><br /><br />
                <button className="btn-show" onClick={showSelectedCourses} >نمایش</button>
                <button className="btn-delete" onClick={deleteSelectedCourses}>حذف</button>
                <div className="explanation">توضیحات : برای نمایش دروس انتخابی دانشجو، شماره دانشجویی را وارد نمایید و روی دکمه نمایش کلیک نمایید.
                برای حذف همه دروس انتخابی دانشجو، شماره دانشجویی را وارد نمایید و روی دکمه حذف  کلیک نمایید. بعد از حذف دروس با فشردن دکمه نمایش می توانید ببینید که دروس حذف شده اند.
                </div>

            </div>
        </div>

    )
}

export default SelectedCourses;