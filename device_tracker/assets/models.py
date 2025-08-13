from django.db import models

class Asset(models.Model):
    TYPE_CHOICES = [
        ('laptop', 'Laptop'),
        ('printer', 'Printer'),
        ('monitor', 'Monitor'),
        ('other', 'Other'),
    ]

    STATUS_CHOICES = [
        ('available', 'Available'),
        ('in_use', 'In Use'),
        ('repair', 'Repair'),
        ('retired', 'Retired'),
    ]

    code = models.CharField(max_length=50, unique=True)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    name = models.CharField(max_length=255)
    purchase_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    detail = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')

    def __str__(self):
        return f"{self.code} - {self.name}"
