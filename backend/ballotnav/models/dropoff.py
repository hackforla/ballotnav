import structlog

from ballotnav.extensions import ma, db_orm
from ballotnav.db import Dropoff

logger = structlog.get_logger()


class DropoffsModel(ma.Schema):
    """ dropoffs data access methods """

    class Meta:
        # fields to return
        fields = (
            "id",
            "state_name",
            "updated_at",
            "contact_name",
            "county",
            "source_url",
            "county_website",
            "phone",
            "email",
        )

    def __init__(self, app=None):
        self.app = app

    def create(self, dropoff_location: dict):
        """ create a dropoff entry """
        with self.app.app_context():
            record = []
            try:
                record = Dropoff(**dropoff_location)
                db_orm.session.add(record)
                db_orm.session.commit()
                logger.msg("Added record to the session", record=record)
            except Exception as e:
                logger.msg("Error creating record", exc=e, dropoff=dropoff_location)
            return record

    def get(self, dropoff_location: dict):
        """ create a dropoff entry """
        with self.app.app_context():
            record = []
            try:
                record = Dropoff(**dropoff_location)
                db_orm.session.add(record)
                db_orm.session.commit()
                logger.msg("Added record to the session", record=record)
            except Exception as e:
                logger.msg("Error creating record", exc=e, dropoff=dropoff_location)
            return record
