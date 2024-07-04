import React, { useState,useEffect } from 'react';
import axios from 'axios';
import ProfileIcon from '../../../../resources/home/profileIcon.png'
import CloseIcon from '../../../../resources/home/closeIcon.png'
import {
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
    MDBContainer,

} from 'mdb-react-ui-kit';
import './profile.css';

const Profile = ({ setShowProfile, guardianData = null }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [relationshipToPatient, setRelationshipToPatient] = useState('');
    const [error, setError] = useState('');
    //create a useEffect hook to fetch the guardian details on mount
    useEffect(() => {
        if (guardianData) {
            setFirstName(guardianData.FirstName);
            setLastName(guardianData.LastName);
            setEmail(guardianData.Email);
            setPhoneNumber(guardianData.PhoneNumber);
            setAddress(guardianData.Address);
            setRelationshipToPatient(guardianData.RelationshipToPatient);
        }
    }, [guardianData]);


    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        // Add validations here as needed

        setError(errors);
        return formIsValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({}); // Reset error messages before attempting to submit
        if (validateForm()) {
            const guardianData = {
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                PhoneNumber: phoneNumber,
                Address: address,
                RelationshipToPatient: relationshipToPatient,
            };

            try {
                const url = guardianData ? `/guardian/update/` : '/guardian/add/';
                const response = await axios.post(url, guardianData);
                console.log(response.data.message);
                // Reset form fields after successful submission
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhoneNumber('');
                setAddress('');
                setRelationshipToPatient('');
                setError({}); // Clear any errors
            } catch (err) {
                if (err.response) {
                    setError(err.response.data.errors || { form: 'Server error, please try again later.' });
                } else if (err.request) {
                    setError({ form: 'No response from server' });
                } else {
                    setError({ form: 'Error: ' + err.message });
                }
            }
        }
    };

    return (
        <MDBContainer className='custom-parent profile-popup'>
            <MDBContainer className="profile-container">
                <div className="icons-wrapper">
                    <div className="profile-icon-wrapper">
                        <img src={ProfileIcon} alt='Profile Icon' className='icons' />
                    </div>
                    <img src={CloseIcon} alt="Close" onClick={()=>{setShowProfile(false)}} className='close-icon' />
                </div>
                <form onSubmit={handleSubmit}>
                    <MDBRow className="mb-3">
                        <MDBCol md="6" className="mb-md-0 mb-3">
                            <MDBInput label="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBInput label="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-3">
                        <MDBCol md="6" className="mb-md-0 mb-3">
                            <MDBInput label="Phone Number" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBInput label="Relationship to Patient" type="text" value={relationshipToPatient} onChange={(e) => setRelationshipToPatient(e.target.value)} required />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-3">
                        <MDBCol>
                            <MDBInput label="Address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </MDBCol>
                    </MDBRow>
                    <div className="text-center mb-3">
                        <MDBBtn type="submit">{guardianData ? 'Update Details' : 'Add Details'}</MDBBtn>
                    </div>
                    {error && Object.keys(error).length > 0 && (
                        <div className="alert alert-danger" role="alert" style={{ padding: '5px 10px', margin: '10px 0' }}>
                            {Object.values(error).map((errorMessage, index) => (
                                <div key={index}>{errorMessage}</div>
                            ))}
                        </div>
                    )}
                </form>
            </MDBContainer>
        </MDBContainer>
    );
};

export default Profile;