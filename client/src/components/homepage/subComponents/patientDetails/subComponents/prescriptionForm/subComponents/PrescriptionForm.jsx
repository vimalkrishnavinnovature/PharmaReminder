import React, { useState } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn,MDBContainer } from 'mdb-react-ui-kit';
import MedicationForm from './MedicationForm'; // Update the import path as necessary
//Prescription child component
const PrescriptionForm = ({ prescription,index,savePrescriptionAtIndex }) => {
    const [doctorName, setDoctorName] = useState(prescription.doctorName);
    const [condition, setCondition] = useState(prescription.condition);
    const [medications, setMedications] = useState(prescription.medications);
    const [selectedMedication, setSelectedMedication] = useState(0);
    const [isMedicationExpanded, setIsMedicationExpanded] = useState(true);
    //Implement this function to handle changes in this current prescription form
    const handlePrescriptionChange = (e) => {
        const { name, value } = e.target;
        if (name === "doctorName") {
            setDoctorName(value);
        } else if (name === "condition") {
            setCondition(value);
        }
    };

    const handleSavePrescription = (e) => {
        e.preventDefault();
        savePrescriptionAtIndex(index, {
            condition,
            doctorName,
            medications
        });
    }


    //Medication Specific Functions
    const expandMedication = (index) => {
        setSelectedMedication(index);
        setIsMedicationExpanded(true);
    }

    //Implement this function to update the medication data at a specific index
    const saveMedicationAtIndex = (index, medication) => {
        setMedications(medications.map((item, i) => {
            if (i === index) {
                return medication; // Replace the current medication with the new one
            }
            return item; // Return the item unchanged
        }));
        setIsMedicationExpanded(false);

    };


    //Implement this function to add a new medication to this current prescription form
    const handleAddMedication = (e) => {
        e.preventDefault();

        // Check if the last medication in the list is filled out
        const lastMedication = medications[medications.length - 1];
        const isLastMedicationFilled = lastMedication && Object.values(lastMedication).every(value => value.trim() !== '');

        if (isLastMedicationFilled || medications.length === 0) {
            console.log('Adding new medication');
            setMedications([...medications, {
                medicationName: '',
                label: '',
                dosage: '',
                notificationTime: '00:00',
                frequency: '',
                startDate: '',
                endDate: ''
            }]);
            // Set the newly added medication as selected and expanded
            setSelectedMedication(medications.length);
            setIsMedicationExpanded(true);
        } else {
            alert('Please fill out the last medication before adding a new one.'); console.log('Please fill out the last medication before adding a new one.');
        }
    };


    return (
        <MDBContainer  className='mt-3 prescription-container'>
            <MDBRow className="mb-3 mt-3">
                <MDBCol>
                    <MDBInput label="Condition" type="text" name="condition" value={condition} onChange={handlePrescriptionChange} required />
                </MDBCol>
            </MDBRow>
            <MDBRow className='mb-3'>
                <MDBCol>
                    <MDBInput label="Doctor Name" type="text" name="doctorName" value={doctorName} onChange={handlePrescriptionChange} required />
                </MDBCol>
            </MDBRow>

            {medications.map((medication, index) => (
                index === selectedMedication && isMedicationExpanded ? <MedicationForm key={index} medication={medication} index={index} saveMedicationAtIndex={saveMedicationAtIndex} /> :
                    //provide the medication name which when clicked expands the medication form
                    <MDBRow key={index} className='mb-3'>
                        <MDBCol>
                            <span onClick={() => expandMedication(index)}>
                                {medication.medicationName ? medication.medicationName : 'No Medication'} →
                            </span>
                        </MDBCol>
                    </MDBRow>
            ))}
            <MDBRow>
                <MDBCol className='d-flex justify-content-end'>
                    <MDBBtn className='mb-3' size='sm' color='teritiary' onClick={(e) => handleAddMedication(e)}>Add Medication</MDBBtn>
                </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3 text-center">
                <MDBCol>
                    <MDBBtn onClick={handleSavePrescription} color='secondary'>Save Prescription</MDBBtn>
                </MDBCol>
            </MDBRow>
        </MDBContainer>


    );
};

export default PrescriptionForm;