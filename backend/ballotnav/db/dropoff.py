""" dropoff database schema """
from datetime import datetime

from sqlalchemy import Column, Integer, DateTime, String
from ballotnav.extensions import db_orm as orm


class Dropoff(orm.Model):
    __tablename__ = "dropoffs"

    id = Column(Integer, primary_key=True, index=True)
    state_name = Column(String(length=20), nullable=False, unique=True)
    state_short_code = Column(String(length=2), nullable=False, unique=True)
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
