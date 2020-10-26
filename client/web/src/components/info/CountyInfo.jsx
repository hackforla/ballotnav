import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Moment from 'react-moment'
import { Drawer } from 'rsuite'

const CountyInfo = ({ open, close, data }) => {
  const {
    name: stateName,
    isLateRegistrationPossible: lateRegistration,
    urls: stateUrls,
    importantDates: stateImportantDates,
  } = data.stateData

  const {
    name: countyName,
    importantDates: countyImportantDates,
    phones: countyPhones,
    urls: countyUrls,
  } = data.jurisdictionData

  const renderDateInfos = (dates) => {
    return dates.map((date, index) => (
      <p key={index}>
        <b>{date.importantDateTypeName}: </b>
        {renderDate(date)}
      </p>
    ))
  }

  const renderDate = (date) => {
    const formatDate = (date) => {
      const formattedDate = new Date(date)
      return <Moment date={formattedDate} format={'MMM Do, LT'} />
    }

    const formatDateRangeEnd = (date) => {
      const formattedDate = new Date(date)
      return <Moment date={formattedDate} format={'LT'} />
    }

    switch (date.dateType) {
      case 'deadline':
        return <span>{formatDate(date.endTime)}</span>
      case 'range':
        return (
          <span>
            {formatDate(date.beginTime)} - {formatDateRangeEnd(date.endTime)}
          </span>
        )
      default:
        return null
    }
  }

  const renderUrls = (urls) => {
    return urls.map((url) => {
      if (url.isEmail) {
        return (
          <div key={url.id} className="links">
            <p className="email">Email address: </p>
            <a
              href={'mailto:' + url.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {url.url}
            </a>
          </div>
        )
      } else {
        return (
          <div key={url.id} className="links">
            <a href={url.url} target="_blank" rel="noopener noreferrer">
              {url.name}
            </a>
          </div>
        )
      }
    })
  }

  const renderPhones = (phones) => {
    function formatPhoneNumber(phoneNumberString) {
      var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
      var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        var intlCode = match[1] ? '+1 ' : ''
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
      }
      return null
    }

    return phones.map((phone) => (
      <p key={phone.id}>{formatPhoneNumber(phone.number)}</p>
    ))
  }

  return (
    <Drawer
      className="county-info"
      show={open}
      onHide={close}
      placement="bottom"
      size="lg"
    >
      <Drawer.Header>
        <h2>
          {countyName}, {stateName}
        </h2>
      </Drawer.Header>
      <Drawer.Body>
        <p>
          We have found the most credible and up to date election information to
          be on{' '}
          <a
            href="https://www.vote.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            vote.org
          </a>
          .
        </p>
        <h4>State Information</h4>
        <h5 id="important-dates">Important Dates</h5>
        {renderDateInfos(stateImportantDates)}
        <h5>Links</h5>
        {renderUrls(stateUrls)}
        <h5>
          Late Registration Possible: {lateRegistration === 'N' ? 'No' : 'Yes'}
        </h5>
        <h4>County Information</h4>
        <h5 id="important-dates">Important Dates</h5>
        {renderDateInfos(countyImportantDates)}
        <h5>Links</h5>
        {renderUrls(countyUrls)}
        <h5>Phone numbers</h5>
        {renderPhones(countyPhones)}
      </Drawer.Body>
    </Drawer>
  )
}

const mapStateToProps = (state) => ({
  data: state.data,
})

export default connect(mapStateToProps)(CountyInfo)

CountyInfo.propTypes = {
  data: PropTypes.object,
}
