"""create initial tables

Revision ID: ea4d6d0e6316
Revises: 
Create Date: 2020-09-11 17:30:46.083111

"""
from datetime import datetime
from alembic import op
import sqlalchemy as sa
from sqlalchemy import (
    Column, String, DateTime, BigInteger, ForeignKey
)


# revision identifiers, used by Alembic.
revision = 'ea4d6d0e6316'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # create dropoffs table
    op.create_table(
        "dropoffs",
        Column("id", BigInteger, primary_key=True),
        Column("state_name", String(20), nullable=False),
        Column("state_short_code", String(2), nullable=False),
        Column("county", String(100), nullable=False),
        Column("position", String(100)),
        Column("contact_name", String(100)),
        Column("address_1", String(255)),
        Column("address_2", String(255)),
        Column("email", String(255)),
        Column("fax", String(32)),
        Column("phone", String(32)),
        Column("county_website", String(255)),
        Column("source_url", String(255)),
        Column("created_at", DateTime(timezone=True), default=datetime.utcnow),
        Column("updated_at", DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    )

    # create rules table
    op.create_table(
        "rules",
        Column("id", BigInteger, primary_key=True),
        Column("name", String(255), nullable=False),
        Column("description", String(255), nullable=False)
    )


def downgrade():
    op.drop_table("rules")
    op.drop_table("dropoffs")
