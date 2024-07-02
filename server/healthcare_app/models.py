from django.db import models
from django.contrib.auth.models import User

class Guardian(models.Model):
    GuardianID = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=255)
    LastName = models.CharField(max_length=255)
    Email = models.OneToOneField(User, on_delete=models.CASCADE)
    PhoneNumber = models.CharField(max_length=20)
    Address = models.TextField()
    RelationshipToPatient = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.FirstName} {self.LastName}"

class Patient(models.Model):
    PatientID = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=255)
    LastName = models.CharField(max_length=255)
    DateOfBirth = models.DateField()
    Gender = models.CharField(max_length=10)
    Address = models.TextField()
    MedicalHistory = models.TextField()
    GuardianID = models.ForeignKey(Guardian, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.FirstName} {self.LastName}"

class Prescription(models.Model):
    PrescriptionID = models.AutoField(primary_key=True)
    PatientID = models.ForeignKey(Patient, on_delete=models.CASCADE)
    DoctorName = models.CharField(max_length=255)
    MedicationName = models.CharField(max_length=255)
    Dosage = models.CharField(max_length=255)
    Frequency = models.CharField(max_length=255)
    StartDate = models.DateField()
    EndDate = models.DateField()
    Notes = models.TextField()

    def __str__(self):
        return f"{self.MedicationName} for {self.PatientID.FirstName} {self.PatientID.LastName}"

class PrescriptionLog(models.Model):
    LogID = models.AutoField(primary_key=True)
    PrescriptionID = models.ForeignKey(Prescription, on_delete=models.CASCADE)
    PatientID = models.ForeignKey(Patient, on_delete=models.CASCADE)
    Date = models.DateField()
    Time = models.TimeField()
    Status = models.CharField(max_length=255)
    Notes = models.TextField()

    def __str__(self):
        return f"Log {self.LogID} for Prescription {self.PrescriptionID}"