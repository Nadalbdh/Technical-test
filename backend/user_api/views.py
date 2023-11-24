from rest_framework import viewsets, status
from .models import UserProfile
from .serializers import UserProfileSerializer, UserSerializer
from rest_framework.response import Response


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        queryset = UserProfile.objects.all()
        hometown = self.request.query_params.get('hometown')
        min_age = self.request.query_params.get('min_age')
        max_age = self.request.query_params.get('max_age')
        gender = self.request.query_params.get('gender')

        if hometown:
            queryset = queryset.filter(hometown__icontains=hometown)

        if min_age is not None:
            queryset = queryset.filter(age__gte=min_age)

        if max_age is not None:
            queryset = queryset.filter(age__lte=max_age)

        if gender:
            queryset = queryset.filter(gender=gender)

        return queryset
    
    def update(self, request, *args, **kwargs):
        user_profile = self.get_object()
        user = user_profile.user

        user.first_name = request.data.get('first_name', user.first_name)
        user.last_name = request.data.get('last_name', user.last_name)
        user.save()

        return super().update(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        try:
            user_data = {
                'username': request.data['first_name'].lower() + "_" + request.data['last_name'].lower(),
                'first_name': request.data['first_name'],
                'last_name': request.data['last_name'],
            }

            user_serializer = UserSerializer(data=user_data)
            user_serializer.is_valid(raise_exception=True)
            user = user_serializer.save()

            profile_data = {
                'user': user.id,
                'age': request.data['age'],
                'hometown': request.data['hometown'],
                'gender': request.data['gender'],
            }
            profile_serializer = self.get_serializer(data=profile_data)
            profile_serializer.is_valid(raise_exception=True)
            profile_serializer.save()

            return Response(profile_serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
