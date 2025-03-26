import React, { useEffect, useState } from 'react'
import StudentNav from "../StudentNav/StudentNav";
import axios from "axios";
import Student from '../Student/Student';

const URL = "http://localhost:5000/students";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function StudentDetails() {

  const  [students, setStudents] = useState();
  useEffect(()=> {
    fetchHandler().then((data) => setStudents(data.students));
  },[])

  return (
    <div>
      <StudentNav/>
      <h1>Student Details Display Page</h1>
      <div>
        {students && students.map((student,i) => (
          <div key={i}>
            <Student student={student}/>
            </div>
       ))}
      </div>
    </div>
  )
}

export default StudentDetails