from rest_framework import generics, permissions
from .serializers import SalonSerializer
from .models import Salon


class SalonListCreateView(generics.ListCreateAPIView):
    queryset = Salon.objects.all()
    serializer_class = SalonSerializer
    permission_classes = [permissions.IsAuthenticated]