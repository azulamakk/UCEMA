from rest_framework import generics, permissions, filters
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import ServiceCategory, Service, ServiceRequest
from .serializers import ServiceCategorySerializer, ServiceSerializer, ServiceRequestSerializer


class ServiceCategoryListView(generics.ListAPIView):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer
    permission_classes = [AllowAny]


class ServiceListCreateView(generics.ListCreateAPIView):
    serializer_class = ServiceSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchBackend, filters.OrderingFilter]
    filterset_fields = ['category', 'availability', 'location']
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['created_at', 'title']
    ordering = ['-created_at']

    def get_queryset(self):
        return Service.objects.select_related('provider', 'category').all()

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [AllowAny()]


class ServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ServiceSerializer
    
    def get_queryset(self):
        return Service.objects.select_related('provider', 'category').all()

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [permissions.IsAuthenticated()]
        return [AllowAny()]

    def perform_update(self, serializer):
        if self.get_object().provider != self.request.user:
            raise permissions.PermissionDenied("You can only edit your own services")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.provider != self.request.user:
            raise permissions.PermissionDenied("You can only delete your own services")
        instance.delete()


class MyServicesView(generics.ListAPIView):
    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Service.objects.filter(provider=self.request.user).select_related('category')


class ServiceRequestListCreateView(generics.ListCreateAPIView):
    serializer_class = ServiceRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'provider':
            return ServiceRequest.objects.filter(service__provider=user).select_related('service', 'requester')
        else:
            return ServiceRequest.objects.filter(requester=user).select_related('service', 'service__provider')


class ServiceRequestDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = ServiceRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'provider':
            return ServiceRequest.objects.filter(service__provider=user)
        else:
            return ServiceRequest.objects.filter(requester=user)