from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.ServiceCategoryListView.as_view(), name='service-categories'),
    path('services/', views.ServiceListCreateView.as_view(), name='service-list-create'),
    path('services/<int:pk>/', views.ServiceDetailView.as_view(), name='service-detail'),
    path('my-services/', views.MyServicesView.as_view(), name='my-services'),
    path('requests/', views.ServiceRequestListCreateView.as_view(), name='service-request-list-create'),
    path('requests/<int:pk>/', views.ServiceRequestDetailView.as_view(), name='service-request-detail'),
]