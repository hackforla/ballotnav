""" flask extensions set on the app during bootstrapping """

from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate

db_orm = SQLAlchemy(session_options={"expire_on_commit": False})
migrate = Migrate()
ma = Marshmallow()
