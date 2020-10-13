import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ResultHeader = ({
  search,
}) => {
  if (search) {
    var state = search.context[search.context.length - 2].text;

    var city;
    if (search.context[search.context.length - 3]) {
      city = search.context[search.context.length - 3].text;
    } else {
      city = search.text;
    }
  }

  return (
    <div className="result-header">
      {search &&
        <>
          <p>{city}, {state}</p>
          <a>Important election information</a>
          <div id="election-info">
            <p>California</p>
            <span>Last updated: September 14, 2020</span>
            <p>
              We have found the most credible and up to date state and EAJ changes to be on <a>vote.org</a>.
            </p>
            <a>California Secretary of State</a>
            <p>Subscribe</p>
            <p>Last-minute changes to details about how to vote should be expected. Sign up for SMS notifications for updates to your Secretary of State website. Mobile messaging rates may apply.</p>
            <p>Write your phone number to receive State's updates</p>
            <form>
              <input is-info type="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder='(158)-234-6678' />
              <button is-primary>Subscribe</button>
            </form>
          </div>
        </>
      }
    </div>
  );
}

const mapStateToProps = state => ({
  search: state.searches[state.searches.length - 1],
});

export default connect(mapStateToProps)(ResultHeader);

ResultHeader.propTypes = {
  search: PropTypes.object,
}