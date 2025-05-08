from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from .models import User, UserProfile


# Signals to create a UserProfile whenever a new User is created
@receiver(post_save, sender=User)
def post_save_create_profile_receiver(sender, instance, created, **kwargs):
    print(f"Created: {created}")
    if created:
        UserProfile.objects.create(user=instance)
    else:
        try:
            profile = UserProfile.objects.get(user=instance)
        except UserProfile.DoesNotExist:
            UserProfile.objects.create(user=instance)

# Optional: Pre-save signal for user
@receiver(pre_save, sender=User)
def pre_save_profile_receiver(sender, instance, **kwargs):
    pass