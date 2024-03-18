from django.apps import AppConfig

class UserauthsConfig(AppConfig):
    """Configuration for the userauths app."""

    default_auto_field = 'django.db.models.BigAutoField'
    name = 'userauths'

    def ready(self):
        """Override the ready method to perform any post-import setup."""
        pass
