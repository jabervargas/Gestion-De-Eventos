from rest_framework import generics, permissions
from .serializers import RegistroPublicoSerializer


class RegistroPublicoView(generics.CreateAPIView):
    serializer_class = RegistroPublicoSerializer
    permission_classes = [permissions.AllowAny]