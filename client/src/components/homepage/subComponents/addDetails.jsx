import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBContainer,
} from "mdb-react-ui-kit";

const AddDetails = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState({});
  const [patients, setPatients] = useState(null);



  const toggleFormVisibility = () => setShowForm(!showForm);

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!firstName || !lastName) {
      formIsValid = false;
      errors["name"] = "*Please enter both first and last name.";
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
        firstName,
        lastName,
        dateOfBirth,
        gender,
        address,
        medicalHistory,
      };

      try {
        const response = await axios.post('/add_patient/', patientData);
        console.log(response.data.message);
        // Reset form fields after successful submission
        setFirstName('');
        setLastName('');
        setDateOfBirth('');
        setGender('');
        setAddress('');
        setMedicalHistory('');
        setError({}); // Clear any errors
      } catch (err) {
        // Handle errors as before
      }
    }
  };

  return (
    <MDBContainer>
      <MDBRow className='d-flex justify-content-between w-100'>
        <MDBCol className='d-flex justify-content-start mt-3'>
          <h6>Registered Patients</h6>
        </MDBCol>
        <MDBCol className='d-flex justify-content-end'>
          <MDBBtn onClick={toggleFormVisibility}>New Patient</MDBBtn>
        </MDBCol>
      </MDBRow>
      {showForm && <form onSubmit={handleSubmit}>
        <MDBRow className="mb-3 mt-3">
          <MDBCol>
            <MDBInput label="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </MDBCol>
          <MDBCol>
            <MDBInput label="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
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
            <MDBInput label="Address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </MDBCol>
          <MDBCol>
            <MDBInput label="Medical History" type="text" value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)} required />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-3 text-center">
          <MDBCol>
            <MDBBtn type="submit">Add Patient Details</MDBBtn>
          </MDBCol>
        </MDBRow>
      </form>}
      {patients == null ?
        <p>No Registered Patients</p>
        :
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Medical History</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {patients.map((patient, index) => (
              <tr key={index}>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.dateOfBirth}</td>
                <td>{patient.gender}</td>
                <td>{patient.address}</td>
                <td>{patient.medicalHistory}</td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      }
    </MDBContainer>
  );
};

export default AddDetails;