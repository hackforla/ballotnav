from datetime import datetime
import structlog

from sqlalchemy import Column, Integer, DateTime, String
from ballotnav.extensions import ma, db_orm

logger = structlog.get_logger()


class Dropoff(db_orm.Model):
    __tablename__ = "dropoffs"

    id = Column(Integer, primary_key=True, index=True)
    state_name = Column(String(length=20), nullable=False)
    state_short_code = Column(String(length=2), nullable=False)
    county = Column(String(length=100), nullable=False)
    position = Column(String(length=100))
    contact_name = Column(String(length=100))
    address_1 = Column(String(length=255))
    address_2 = Column(String(length=255))
    email = Column(String(length=255))
    phone = Column(String(length=32))
    fax = Column(String(length=32))
    county_website = Column(String(length=255))
    source_url = Column(String(length=255))
    created_at = Column("created_at", DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column("updated_at", DateTime(timezone=True), default=datetime.utcnow)

    def __repr__(self):
        return """<Dropoff(
            id=%s, state_name=%s, state_short_code=%s, county=%s, address_1=%s, county_website=%s,
            source_url=%s,updated_at=%s)>""" % (
            self.id,
            self.state_name,
            self.state_short_code,
            self.county,
            self.address_1,
            self.county_website,
            self.updated_at,
            self.source_url,
        )

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
                "address_1",
                "address_2",
                "phone",
                "email",
                "updated_at"
            )

    @classmethod
    def base(self, session):
        return session.query(Dropoff)

    @classmethod
    def create(self, dropoff_location: dict):
        """ create a dropoff entry """
        record = []
        try:
            record = Dropoff(**dropoff_location)
            db_orm.session.add(record)
            db_orm.session.commit()
            logger.msg("Added record to the session", id=record.id, county=record.county)
        except Exception as e:
            logger.msg("Error creating record", exc=e, dropoff=dropoff_location)
        return record

    @classmethod
    def get(self, params: dict):
        """ get dropoff records """

        logger.msg("Get with params: ", params=params)
        query = self.base(db_orm.session)
        res = []
        try:
            # res = query.filter_by(county=params.get("county"), state_short_code=params.get("state_short_code")).all()
            res = query.filter_by(**params).all()
            logger.msg("Get records to the session", count=len(res) if res else 0, records=res)
        except Exception as e:
            logger.msg("Error creating record", exc=e, params=params)
        return res
