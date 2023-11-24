from django.db import models

class Gender(models.TextChoices):
    FEMALE = 'Female', 'Female'
    MALE = 'Male', 'Male'
