import React, { useState, useEffect } from 'react';
import PatientForm from './subComponents/patientForm';
import PrescriptionForm from './subComponents/prescriptionForm/PrescriptionsForm';
import './patientDetails.css';
import deleteIcon from '../../../../resources/patientDetails/deleteIcon.png';
import viewIcon from '../../../../resources/patientDetails/viewIcon.png';
import editIcon from '../../../../resources/patientDetails/editIcon.png';
import {
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtnGroup,
  MDBContainer,
} from "mdb-react-ui-kit";

const PatientDetails = () => {
  const [showForm, setShowForm] = useState(false);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [selectedPatientID, setSelectedPatientID] = useState(null);
  const [patients, setPatients] = useState(null);

  const toggleFormVisibility = () => setShowForm(!showForm);

  const togglePrescriptionFormVisibility = (patientID) => {
    setSelectedPatientID(patientID);
    setShowPrescriptionForm(true);
  }

  useEffect(() => {
    const fetchPatients = async () => {
      setPatients([
        {
          "PatientID": 1,
          "Name": "John Doe",
          "DateOfBirth": "1985-02-15",
          "Gender": "Male",
          "PhoneNumber": "555-1234",
          "BloodType": "A+"
        },
        {
          "PatientID": 2,
          "Name": "Jane Smith",
          "DateOfBirth": "1990-06-24",
          "Gender": "Female",
          "PhoneNumber": "555-5678",
          "BloodType": "O-"
        },
        // Add more patients as needed
      ]);
    }

    fetchPatients();
  }, []);





  return (
    <MDBContainer className='patient-details-parent' fluid>
      <MDBRow className='d-flex justify-content-between w-100'>
        <MDBCol className='d-flex justify-content-start mt-3'>
          <h6>Registered Patients</h6>
        </MDBCol>
        <MDBCol className='d-flex justify-content-end'>
          <MDBBtn size='sm' onClick={toggleFormVisibility}>New Patient</MDBBtn>
        </MDBCol>
      </MDBRow>
      {showForm && <PatientForm />}
      {showPrescriptionForm && <PrescriptionForm
        setShowPrescriptionForm={setShowPrescriptionForm}
        patientID={selectedPatientID}
        setPatientID={setSelectedPatientID}
      />}
      {!showPrescriptionForm && (patients == null ? (
        <p>No Registered Patients</p>
      ) : (
        <MDBTable responsive='md'>
          <MDBTableHead>
            <tr>
              <th>PatientID</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>Blood Type</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {patients.map((patient, index) => (
              <tr key={index}>
                <td>{patient.PatientID}</td>
                <td>{patient.Name}</td>
                <td>{patient.DateOfBirth}</td>
                <td>{patient.Gender}</td>
                <td>{patient.PhoneNumber}</td>
                <td>{patient.BloodType}</td>
                <td>
                  <MDBBtnGroup size='sm'>
                    <MDBBtn color='info'>
                      <img src={viewIcon} className='custom-icons' alt='view' />
                    </MDBBtn>
                    <MDBBtn color='warning'>
                      <img src={editIcon} className='custom-icons' alt='edit' onClick={() => togglePrescriptionFormVisibility(patient.patientID)} />
                    </MDBBtn>
                    <MDBBtn color='danger'>
                      <img src={deleteIcon} className='custom-icons' alt='delete' />
                    </MDBBtn>
                  </MDBBtnGroup>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      ))}
    </MDBContainer>
  );
};

export default PatientDetails;