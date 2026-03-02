import axios from "axios";


const API = axios.create({

  baseURL: "http://localhost:3000/api",

  headers: {

    "Content-Type": "application/json",

  },

});



/*
=====================================
MULTI STEP STUDENT SIGNUP
=====================================
*/

export const registerStep = (step, data, studentId) => {

  return API.post(

    "/students/register-step",

    {

      step: step,

      data: data,

      studentId: studentId

    }

  )

  .then(res => res.data);

};



/*
=====================================
OTHER STUDENT APIs (optional)
=====================================
*/

export const registerStudent = (data) =>

  API.post("/students/register", data);



export const loginStudent = (data) =>

  API.post("/students/login", data);



export const getStudentProfile = (id) =>

  API.get(`/students/${id}`);



export const updateStudent = (id, data) =>

  API.put(`/students/${id}`, data);



export const registerAlumni = (data) =>

  API.post("/alumni/register", data);



export const adminLogin = (data) =>

  API.post("/admin/login", data);



export default API;