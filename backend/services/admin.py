from django.contrib import admin
from .models import ServiceCategory, Service, ServiceRequest


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'provider', 'category', 'location', 'availability', 'created_at']
    list_filter = ['category', 'availability', 'created_at']
    search_fields = ['title', 'description', 'provider__username', 'location']
    ordering = ['-created_at']


@admin.register(ServiceRequest)
class ServiceRequestAdmin(admin.ModelAdmin):
    list_display = ['service', 'requester', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['service__title', 'requester__username']
    ordering = ['-created_at']