""" dropoff api """
from flask import Blueprint, current_app
import structlog
from webargs import fields
from webargs.flaskparser import use_args

from ballotnav.models import Dropoff, dropoff_schema

dropoffs = Blueprint("dropoffs", __name__)
logger = structlog.get_logger()


@dropoffs.route("/dropoffs", methods=["GET"])
@use_args({"state_name": fields.Str(), "county": fields.Str()}, location="querystring")
def get_location(args):
    """ get location """
    res = Dropoff.get(dict(county=args.get("county"), state_short_code=args.get("state_name")))

    if not res:
        logger.msg("No locations found", args=args)
        return {"dropoffs": [], "status": "error"}, 404
    return {"dropoffs": dropoff_schema.dump(res, many=True)}, 200


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

    res = Dropoff.create(args)

    if not res:
        return {"status": "error"}, 400
    return {"status": "ok", "dropoffs": {**dropoff_schema.dump(res)}}, 201
