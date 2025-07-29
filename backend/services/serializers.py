from rest_framework import serializers
from .models import ServiceCategory, Service, ServiceRequest
from accounts.serializers import UserSerializer


class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'description', 'created_at']


class ServiceSerializer(serializers.ModelSerializer):
    provider = UserSerializer(read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Service
        fields = ['id', 'title', 'description', 'category', 'category_name', 'provider', 
                 'location', 'price_range', 'availability', 'contact_info', 'created_at', 'updated_at']
        read_only_fields = ['id', 'provider', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['provider'] = self.context['request'].user
        return super().create(validated_data)


class ServiceRequestSerializer(serializers.ModelSerializer):
    requester = UserSerializer(read_only=True)
    service_title = serializers.CharField(source='service.title', read_only=True)
    provider = UserSerializer(source='service.provider', read_only=True)

    class Meta:
        model = ServiceRequest
        fields = ['id', 'service', 'service_title', 'requester', 'provider', 'message', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'requester', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['requester'] = self.context['request'].user
        return super().create(validated_data)