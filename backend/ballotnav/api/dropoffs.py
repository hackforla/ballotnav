""" dropoff api """
from flask import Blueprint
import structlog

dropoffs = Blueprint("dropoffs", __name__)

logger = structlog.get_logger()


@dropoffs.route("/dropoff", methods=["GET"])
def get_location():
    """ get member object by id, phone, or mem_id """
    logger.info(f"Logging this call")

    # hard coded as example
    return {"locations": [{"name": "office A"}, {"name": "officeB"}]}, 200
