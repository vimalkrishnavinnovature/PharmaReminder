import json
from django.http import JsonResponse
from django.shortcuts import render
from healthcare_app.models import Guardian
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User

    
#add guardian to database
@login_required
@csrf_exempt
def add_guardian(request):
    try:
        user = request.user
        guardian_data = json.loads(request.body)
        
        guardian, created = Guardian.objects.get_or_create(
            Email=user,
            defaults={
                'FirstName': guardian_data.get('FirstName'),  
                'LastName': guardian_data.get('LastName'),  
                'PhoneNumber': guardian_data.get('PhoneNumber'),  
                'Address': guardian_data.get('Address'), 
                'RelationshipToPatient': guardian_data.get('RelationshipToPatient') 
            }
        )
        
        if created:
            return JsonResponse({'message': 'Guardian added successfully', 'isGuardianCreated': True, 'GuardianID': guardian.GuardianID}, status=200) 
        else:
            return JsonResponse({'message': 'Guardian already exists','isGuardianCreated':False ,'GuardianID': guardian.GuardianID}, status=200)

    except Exception as e:
        return JsonResponse({'message': f'An error occurred: {str(e)}'}, status=500)
    
#Update Guardian
@login_required
@csrf_exempt
def update_guardian(request):
    try:
        user = request.user
        guardian_data = json.loads(request.body)
        
        # Directly fetch the guardian associated with the logged-in user
        guardian = Guardian.objects.get(Email=user)
        
        # Update the guardian's details
        guardian.FirstName = guardian_data.get('FirstName', guardian.FirstName)
        guardian.LastName = guardian_data.get('LastName', guardian.LastName)
        guardian.PhoneNumber = guardian_data.get('PhoneNumber', guardian.PhoneNumber)
        guardian.Address = guardian_data.get('Address', guardian.Address)
        guardian.RelationshipToPatient = guardian_data.get('RelationshipToPatient', guardian.RelationshipToPatient)
        guardian.save()
        
        return JsonResponse({'message': 'Guardian updated successfully'}, status=200)

    except Guardian.DoesNotExist:
        return JsonResponse({'message': 'Guardian not found'}, status=404)
    except Exception as e:
        return JsonResponse({'message': f'An error occurred: {str(e)}'}, status=500)

#View Guardian details
@csrf_exempt
@login_required
def view_guardian(request):
    try:
        guardian = request.user.guardian
        if not guardian.FirstName:
            error_message = 'First name is empty'
            return JsonResponse({'profileEmpty': True, 'message': error_message}, status=459)
        return JsonResponse({
            'GuardianID': guardian.GuardianID,
            'FirstName': guardian.FirstName,
            'LastName': guardian.LastName,
            'Email': guardian.Email.email,
            'PhoneNumber': guardian.PhoneNumber,
            'Address': guardian.Address,
            'RelationshipToPatient': guardian.RelationshipToPatient
        }, status=200)
    except Guardian.DoesNotExist:
        error_message = 'Guardian not found'
        return JsonResponse({'profileEmpty': True, 'message': error_message}, status=460)