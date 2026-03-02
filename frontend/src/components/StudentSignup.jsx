import React, { useState } from "react";
import "./StudentSignup.css";
import { registerStep } from "./api";

export default function Signup(){

const [step,setStep]=useState(1);

const [studentId,setStudentId]=useState(null);

const [form,setForm]=useState({});


const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};



const next=async()=>{

const res=await registerStep(step,form,studentId);

if(step===1)
setStudentId(res.student_id);

setStep(step+1);

};



return(

<div className="container">

<div className="card">

<h2>Student Signup</h2>

<p>Step {step}/7</p>


{/* STEP 1 */}

{step===1 && (

<>

<input name="roll_number" placeholder="Roll Number" onChange={handleChange}/>

<button onClick={next}>Next</button>

</>

)}



{/* STEP 2 PERSONAL */}

{step===2 && (

<>

<input name="first_name" placeholder="First Name" onChange={handleChange}/>

<input name="last_name" placeholder="Last Name"/>

<input name="full_name" placeholder="Full Name"/>

<input type="date" name="date_of_birth"/>

<select name="gender">

<option>Male</option>

<option>Female</option>

</select>

<input name="blood_group"/>

<input name="nationality"/>

<input name="religion"/>

<input name="caste_category"/>

<input name="aadhaar_number"/>

<input name="pan_number"/>

<input name="passport_number"/>

<input name="profile_photo_url"/>

<button onClick={next}>Next</button>

</>

)}



{/* STEP 3 CONTACT */}

{step===3 && (

<>

<input name="email"/>

<input name="phone_number"/>

<input name="alternate_phone_number"/>

<button onClick={next}/>

</>

)}



{/* STEP 4 ADDRESS */}

{step===4 && (

<>

<input name="address_line1"/>

<input name="address_line2"/>

<input name="city"/>

<input name="state"/>

<input name="pincode"/>

<input name="country"/>

<button onClick={next}/>

</>

)}



{/* STEP 5 GUARDIAN */}

{step===5 && (

<>

<input name="father_name"/>

<input name="father_phone"/>

<input name="father_occupation"/>

<input name="mother_name"/>

<input name="mother_phone"/>

<input name="mother_occupation"/>

<input name="guardian_name"/>

<input name="guardian_phone"/>

<input name="guardian_relation"/>

<button onClick={next}/>

</>

)}



{/* STEP 6 ACADEMIC */}

{step===6 && (

<>

<input name="batch_year"/>

<input type="date" name="admission_date"/>

<input type="date" name="expected_graduation_date"/>

<input name="current_year"/>

<input name="current_semester"/>

<input name="section"/>

<input name="academic_status"/>

<button onClick={next}/>

</>

)}



{/* STEP 7 LOGIN */}

{step===7 && (

<>

<input name="username"/>

<input type="password" name="password"/>

<button onClick={next}>Finish</button>

</>

)}

</div>

</div>

);

}