import React, { useState } from 'react';
import { MDBRow, MDBCol, MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import './prescriptionsForm.css';
import closeIcon from '../../../../../../resources/home/closeIcon.png';
import PrescriptionForm from './subComponents/PrescriptionForm';

//Prescriptions Parent Form Component
const PrescriptionsForm = ({ setShowPrescriptionForm, patientID, setPatientID }) => {
    const [selectedPrescription, setSelectedPrescription] = useState(0);
    const [isPrescriptionExpanded, setIsPrescriptionExpanded] = useState(true);
    const [prescriptions, setPrescriptions] = useState([
        {
            condition: '',
            doctorName: '',
            medications: [{
                medicationName: '',
                label: '',
                dosage: '',
                notificationTime: '00:00',
                frequency: '',
                startDate: '',
                endDate: ''
            }]
        }
    ]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //const response = await axios.post('/add_prescription/', { prescriptions });
            //console.log(response.data.message);
            console.log("Submitting main form")
            console.log(prescriptions);
        } catch (err) {
            console.error(err);
        }
    };

    const handleClose = () => {
        setShowPrescriptionForm(false);
        setPatientID(null);
    }
    
    //Prescription specific functions
    //Add New Prescription To The Form
    const handleAddPrescription = (e) => {
        e.preventDefault();
    
        // Check if the last prescription in the list is filled out
        const lastPrescription = prescriptions[prescriptions.length - 1];
        const isLastPrescriptionFilled = lastPrescription && Object.keys(lastPrescription).every(key => {
            if (key === 'medications') {
                // For medications, check if the last medication is filled out
                const lastMedication = lastPrescription.medications[lastPrescription.medications.length - 1];
                return lastMedication && Object.values(lastMedication).every(value => value.trim() !== '');
            }
            return lastPrescription[key].trim() !== '';
        });
    
        if (isLastPrescriptionFilled || prescriptions.length === 0) {
            console.log('Adding new prescription');
            setPrescriptions([...prescriptions, {
                condition: '',
                doctorName: '',
                medications: [{
                    medicationName: '',
                    label: '',
                    dosage: '',
                    notificationTime: '00:00',
                    frequency: '',
                    startDate: '',
                    endDate: ''
                }]
            }]);
            // Set the newly added prescription as selected and expanded
            setSelectedPrescription(prescriptions.length);
            setIsPrescriptionExpanded(true);
        } else {
            alert('Please fill out the last prescription before adding a new one.');
            console.log('Please fill out the last prescription before adding a new one.');
        }
    };

    
    const expandPrescription = (index) => {
        setSelectedPrescription(index);
        setIsPrescriptionExpanded(true);
    };

    const savePrescriptionAtIndex = (index, prescription) => {
        setPrescriptions(prescriptions.map((item, i) => {
            if (i === index) {
                return prescription; // Replace the current prescription with the new one
            }
            return item; // Return the item unchanged
        }));
        setIsPrescriptionExpanded(false);
    };



    return (
        <MDBContainer className='mt-3 main-container'>
            <MDBRow className='d-flex justify-content-end'>
                <MDBCol className='d-flex justify-content-end'>
                    <img src={closeIcon} className='custom-close-icon' onClick={handleClose} />
                </MDBCol>
            </MDBRow>
            <form onSubmit={handleSubmit}>
                {prescriptions.map((prescription, index) => (
                    index===selectedPrescription && isPrescriptionExpanded ?
                        <PrescriptionForm
                            key={index}
                            index={index}
                            savePrescriptionAtIndex={savePrescriptionAtIndex}
                            prescription={prescription}
                        />
                        :
                        <MDBRow key={index} className='mb-3'>
                        <MDBCol>
                            <span onClick={() => expandPrescription(index)}>
                                {prescription.condition ? prescription.condition : 'No Prescription'} →
                            </span>
                        </MDBCol>
                    </MDBRow>

                ))}
                <MDBRow>
                    <MDBCol className='d-flex justify-content-end'>
                        <MDBBtn className='mb-3' size='sm' color='teritiary' onClick={(e) => handleAddPrescription(e)}>Add Another Prescription</MDBBtn>  
                    </MDBCol>
                </MDBRow>
                <MDBRow className="mb-3 text-center">
                    <MDBCol>
                        <MDBBtn type="submit" size='lg'>Submit Prescription</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </form>
        </MDBContainer>
    );
}

export default PrescriptionsForm;