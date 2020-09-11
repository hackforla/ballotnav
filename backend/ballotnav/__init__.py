
from datetime import datetime
import json

from dotenv import load_dotenv
load_dotenv()

from flask import Flask

from ballotnav.api import dropoffs
from ballotnav.config import configure_app
from ballotnav.extensions import db_orm, migrate, ma


def create_app(app_config=None):
    app = Flask(__name__, instance_relative_config=True)

    if app_config is None:
        configure_app(app)

    # initialize the database
    db_orm.init_app(app)
    migrate.init_app(app, db_orm)

    # initialize marshmallow
    ma.init_app(app)

    # register the API routes
    app.register_blueprint(dropoffs, url_prefix="/api")

    # sanity check / headlth check
    @app.route("/ping")
    def ping():
        return json.dumps({"status": "ok", "ping": f"{datetime.utcnow()}"})

    return app
