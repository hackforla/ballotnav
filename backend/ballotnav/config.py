""" flask app configuration """
import os

ENV_CONFIG_PATHS = {"default": "ballotnav.config.DefaultConfiguration", "test": "ballotnav.config.TestingConfiguration"}


class DefaultConfiguration(object):
    DEBUG = True
    REGION = "us-west-2"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = "postgres://ballotnav:pgpass@db:5432/main"


class TestingConfiguration(DefaultConfiguration):
    TESTING = True


def configure_app(app, flask_env=None):
    if not flask_env:
        app_config_name = os.getenv("FLASK_ENV", "default")

    app.config.from_object(ENV_CONFIG_PATHS[app_config_name])
