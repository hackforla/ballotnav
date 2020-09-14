""" models """
from .dropoff import DropoffModel, DropoffSchema

dropoff_schema = DropoffSchema()
dropoffs_schema = DropoffSchema(many=True)
