from django.db import models
from django.core.exceptions import ValidationError

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

    code = models.IntegerField(unique=True)  
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    name = models.CharField(max_length=255)
    purchase_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    detail = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')

    def clean(self):
        if self.code <= 0:
            raise ValidationError({"code": "Code ต้องเป็นตัวเลขบวก"})
        if not self.name.strip():
            raise ValidationError({"name": "กรุณากรอกชื่ออุปกรณ์"})

    def __str__(self):
        return f"{self.code} - {self.name}"
