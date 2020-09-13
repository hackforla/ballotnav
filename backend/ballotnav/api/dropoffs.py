""" dropoff api """
from flask import Blueprint, current_app
import structlog
from webargs import fields
from webargs.flaskparser import use_args

from ballotnav.models import DropoffsModel

dropoffs = Blueprint("dropoffs", __name__)
logger = structlog.get_logger()


@dropoffs.route("/dropoff", methods=["GET"])
def get_location():
    """ get location """
    logger.info(f"Logging this call")

    # hard coded as example
    return {"locations": [{"name": "office A"}, {"name": "officeB"}]}, 200


@dropoffs.route("/dropoff", methods=["POST"])
@use_args(
    {
        "state_name": fields.Str(required=True),
        "state_short_code": fields.Str(required=True),
        "county": fields.Str(required=True),
        "position": fields.Str(),
        "contact_name": fields.Str(),
        "address_1": fields.Str(),
        "address_2": fields.Str(),
        "email": fields.Str(),
        "fax": fields.Str(),
        "phone": fields.Str(),
        "county_website": fields.Str(),
        "source_url": fields.Str(),
    }
)
def create_location(args):
    """ create a dropoff location entry """
    logger.info(f"CREATE a location call")

    res = DropoffsModel(current_app).create(args)

    if not res:
        return res, 401
    return res, 200
