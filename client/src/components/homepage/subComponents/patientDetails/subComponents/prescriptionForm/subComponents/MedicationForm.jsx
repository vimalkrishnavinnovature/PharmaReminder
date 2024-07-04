import React, { useState } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBContainer, MDBBtn } from 'mdb-react-ui-kit';

const MedicationForm = ({ medication, index,saveMedicationAtIndex}) => {
    const [medicationName, setMedicationName] = useState(medication.medicationName);
    const [label, setLabel] = useState(medication.label);
    const [dosage, setDosage] = useState(medication.dosage);
    const [notificationTime, setNotificationTime] = useState(medication.notificationTime );
    const [frequency, setFrequency] = useState(medication.frequency);
    const [startDate, setStartDate] = useState(medication.startDate);
    const [endDate, setEndDate] = useState(medication.endDate);
    //Implement this function to handle changes in current medication form 
    const handleMedicationChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'medicationName':
                setMedicationName(value);
                break;
            case 'label':
                setLabel(value);
                break;
            case 'dosage':
                setDosage(value);
                break;
            case 'notificationTime':
                setNotificationTime(value);
                break;
            case 'frequency':
                setFrequency(value);
                break;
            case 'startDate':
                setStartDate(value);
                break;
            case 'endDate':
                setEndDate(value);
                break;
            default:
                break;
        }
    };


    //Save Medication Data
    const handleSaveMedication = () => {
        // Call the new prop function with the current medication data
        saveMedicationAtIndex(index, {
            medicationName,
            label,
            dosage,
            notificationTime,
            frequency,
            startDate,
            endDate
        });
    };

    return (
        <MDBContainer className='medication-container'>
            <MDBRow className="mb-3">
                <MDBCol>
                    <MDBInput label="Medication Name" type="text" name="medicationName" value={medicationName} onChange={handleMedicationChange} required />
                </MDBCol>
                <MDBCol>
                    <MDBInput label="Label" type="text" name="label" value={label} onChange={handleMedicationChange} required />
                </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
                <MDBCol>
                    <MDBInput label="Dosage" type="text" name="dosage" value={dosage} onChange={handleMedicationChange} required />
                </MDBCol>
                <MDBCol>
                    <MDBInput label="Notification Time" type="time" name="notificationTime" value={notificationTime} onChange={handleMedicationChange} required />
                </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3">
                <MDBCol>
                    <MDBInput label="Frequency" type="text" name="frequency" value={frequency} onChange={handleMedicationChange} required />
                </MDBCol>
                <MDBCol>
                    <MDBInput label="Start Date" type="date" name="startDate" value={startDate} onChange={handleMedicationChange} required />
                </MDBCol>
                <MDBCol>
                    <MDBInput label="End Date" type="date" name="endDate" value={endDate} onChange={handleMedicationChange} required />
                </MDBCol>
            </MDBRow>
            <MDBRow className="mb-3 text-center">
                <MDBCol>
                    <MDBBtn onClick={handleSaveMedication} color='secondary'>Save Medication</MDBBtn>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );

}


export default MedicationForm;