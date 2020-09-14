import structlog

from ballotnav.extensions import ma, db_orm
from ballotnav.db import Dropoff

logger = structlog.get_logger()


class DropoffSchema(ma.Schema):
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


class DropoffModel(ma.Schema):
    """ dropoffs data access methods """
    def __init__(self, app=None, **kwargs):
        self.app = app

    def base(self, session):
        return session.query(Dropoff)

    def create(self, dropoff_location: dict):
        """ create a dropoff entry """
        with self.app.app_context():
            record = []
            try:
                record = Dropoff(**dropoff_location)
                db_orm.session.add(record)
                db_orm.session.commit()
                logger.msg("Added record to the session", id=record.id, county=record.county)
            except Exception as e:
                logger.msg("Error creating record", exc=e, dropoff=dropoff_location)
            return record

    def get(self, params: dict):
        """ get dropoff records """

        query = self.base(db_orm.session)
        res = []
        try:
            res = query.filter(Dropoff.county == params.get("county"))
            logger.msg("Get records to the session", count=len(res) if res else 0)
        except Exception as e:
            logger.msg("Error creating record", exc=e, params=params)
        return res
