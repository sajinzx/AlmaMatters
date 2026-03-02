const db = require("../database");

exports.registerStep = (req, res) => {

    const { step, data, studentId } = req.body;


    /*
    ========================================
    STEP 1 — STUDENTS TABLE
    ========================================
    */

    if (step === 1) {

        const sql = `
            INSERT INTO students (roll_number)
            VALUES (?)
        `;

        db.query(sql, [data.roll_number], (err, result) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message: "Error inserting student"
                });

            }

            return res.json({

                message: "Student basic info saved",

                student_id: result.insertId

            });

        });

    }



    /*
    ========================================
    STEP 2 — PERSONAL DETAILS
    ========================================
    */

    else if (step === 2) {

        const sql = `
            INSERT INTO student_personal_details
            (
                student_id,
                first_name,
                last_name,
                full_name,
                date_of_birth,
                gender,
                blood_group,
                nationality,
                religion,
                caste_category,
                aadhaar_number,
                pan_number,
                passport_number,
                profile_photo_url
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [

            studentId,

            data.first_name,
            data.last_name,
            data.full_name,
            data.date_of_birth,
            data.gender,
            data.blood_group,
            data.nationality,
            data.religion,
            data.caste_category,
            data.aadhaar_number,
            data.pan_number,
            data.passport_number,
            data.profile_photo_url

        ],

        (err) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message: "Error inserting personal details"
                });

            }

            res.json({
                message: "Personal details saved"
            });

        });

    }



    /*
    ========================================
    STEP 3 — CONTACT DETAILS
    ========================================
    */

    else if (step === 3) {

        const sql = `
            INSERT INTO student_contact_details
            (
                student_id,
                email,
                phone_number,
                alternate_phone_number
            )
            VALUES (?, ?, ?, ?)
        `;

        db.query(sql, [

            studentId,

            data.email,
            data.phone_number,
            data.alternate_phone_number

        ],

        (err) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message: "Error inserting contact details"
                });

            }

            res.json({
                message: "Contact details saved"
            });

        });

    }



    /*
    ========================================
    STEP 4 — ADDRESS DETAILS
    ========================================
    */

    else if (step === 4) {

        const sql = `
            INSERT INTO student_address_details
            (
                student_id,
                address_line1,
                address_line2,
                city,
                state,
                pincode,
                country
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [

            studentId,

            data.address_line1,
            data.address_line2,
            data.city,
            data.state,
            data.pincode,
            data.country

        ],

        (err) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message: "Error inserting address details"
                });

            }

            res.json({
                message: "Address saved"
            });

        });

    }



    /*
    ========================================
    STEP 5 — GUARDIAN DETAILS
    ========================================
    */

    else if (step === 5) {

        const sql = `
            INSERT INTO student_guardian_details
            (
                student_id,
                father_name,
                father_phone,
                father_occupation,
                mother_name,
                mother_phone,
                mother_occupation,
                guardian_name,
                guardian_phone,
                guardian_relation
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [

            studentId,

            data.father_name,
            data.father_phone,
            data.father_occupation,
            data.mother_name,
            data.mother_phone,
            data.mother_occupation,
            data.guardian_name,
            data.guardian_phone,
            data.guardian_relation

        ],

        (err) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message: "Error inserting guardian"
                });

            }

            res.json({
                message: "Guardian saved"
            });

        });

    }



    /*
    ========================================
    STEP 6 — ACADEMIC DETAILS
    ========================================
    */

    else if (step === 6) {

        const sql = `
            INSERT INTO student_academic_details
            (
                student_id,
                batch_year,
                admission_date,
                expected_graduation_date,
                current_year,
                current_semester,
                section,
                academic_status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [

            studentId,

            data.batch_year,
            data.admission_date,
            data.expected_graduation_date,
            data.current_year,
            data.current_semester,
            data.section,
            data.academic_status

        ],

        (err) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message: "Error inserting academic"
                });

            }

            res.json({
                message: "Academic saved"
            });

        });

    }



    /*
    ========================================
    STEP 7 — LOGIN DETAILS
    ========================================
    */

    else if (step === 7) {

        const sql = `
            INSERT INTO student_login_accounts
            (
                student_id,
                username,
                password_hash,
                account_status
            )
            VALUES (?, ?, ?, ?)
        `;

        db.query(sql, [

            studentId,

            data.username,

            data.password,

            "ACTIVE"

        ],

        (err) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message: "Error creating login"
                });

            }

            res.json({
                message: "Signup completed successfully"
            });

        });

    }



    else {

        res.status(400).json({
            message: "Invalid step"
        });

    }

};