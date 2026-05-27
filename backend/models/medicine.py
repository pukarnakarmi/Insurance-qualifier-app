from django.db import models

class Medicine(models.Model):
    name = models.CharField(max_length=100)
    alternative = models.JSONField()  # Alternative medicines
    is_covered = models.BooleanField(default=False)  # Boolean to denote if covered by insurance

    def __str__(self):
        return self.name