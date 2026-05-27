import React, { useState } from 'react';

function PatientForm() {
    const [patientData, setPatientData] = useState({
        name: '',
        age: '',
        gender: '',
        diseases: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send data to the API
        console.log('Patient Data:', patientData);
    };

    return (
        <div>
            <h2>Register Patient</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:
                    <input type="text" name="name" onChange={handleChange} />
                </label>
                <br />
                <label>Age:
                    <input type="number" name="age" onChange={handleChange} />
                </label>
                <br />
                <label>Gender:
                    <select name="gender" onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </label>
                <br />
                <label>Diseases:
                    <input type="text" name="diseases" placeholder="Comma-separated" onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PatientForm;