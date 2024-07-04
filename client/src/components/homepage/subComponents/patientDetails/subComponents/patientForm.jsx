import React, { useState } from 'react';
import axios from 'axios';
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn
} from 'mdb-react-ui-kit';

function PatientForm() {
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [error, setError] = useState({});

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if (!name) {
            formIsValid = false;
            errors["name"] = "*Please enter the name.";
        }

        // Add more validations here as per your requirements

        setError(errors);
        return formIsValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({}); // Reset error messages before attempting to submit
        if (validateForm()) {
            const patientData = {
                name,
                dateOfBirth,
                gender,
                phoneNumber,
                bloodType,
            };

            try {
                const response = await axios.post('/add_patient/', patientData);
                console.log(response.data.message);
                // Reset form fields after successful submission
                setName('');
                setDateOfBirth('');
                setGender('');
                setPhoneNumber('');
                setBloodType('');
                setError({}); // Clear any errors
            } catch (err) {
                // Handle errors as before
            }
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <MDBRow className="mb-3 mt-3">
                <MDBCol>
                    <MDBInput label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
                <MDBCol>
                    <MDBInput label="Date of Birth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
                </MDBCol>
                <MDBCol>
                    <MDBInput label="Gender" type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
                </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
                <MDBCol>
                    <MDBInput label="Phone Number" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </MDBCol>
                <MDBCol>
                    <MDBInput label="Blood Type" type="text" value={bloodType} onChange={(e) => setBloodType(e.target.value)} required />
                </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3 text-center">
                <MDBCol>
                    <MDBBtn type="submit">Add Patient Details</MDBBtn>
                </MDBCol>
            </MDBRow>
        </form>
    )
}

export default PatientForm;