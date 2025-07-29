from django.core.management.base import BaseCommand
from services.models import ServiceCategory


class Command(BaseCommand):
    help = 'Populate initial service categories'

    def handle(self, *args, **options):
        categories = [
            {'name': 'Agronomy Consultation', 'description': 'Expert advice on crop management, soil health, and farming techniques'},
            {'name': 'Drone Services', 'description': 'Aerial photography, crop monitoring, and precision agriculture'},
            {'name': 'Veterinary Support', 'description': 'Animal health services and livestock care'},
            {'name': 'Machinery Rental', 'description': 'Agricultural equipment rental and maintenance'},
            {'name': 'Farm Management', 'description': 'Complete farm operation management services'},
            {'name': 'Pest Control', 'description': 'Integrated pest management and crop protection'},
        ]

        for category_data in categories:
            category, created = ServiceCategory.objects.get_or_create(
                name=category_data['name'],
                defaults={'description': category_data['description']}
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Created category: {category.name}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Category already exists: {category.name}')
                )