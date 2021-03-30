import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 10px',
    margin: '0 auto',
    maxWidth: theme.layout.pageWidth,
    '& ul': {
      listStyleType: 'disc',
      paddingInlineStart: 40,
    },
    '& li': {
      display: 'list-item',
    },
    '& h1': {
      fontSize: '1.8em',
      lineHeight: 1.6,
      marginTop: 10,
    },
    '& h2': {
      fontSize: '1.4em',
      lineHeight: 1.4,
      margin: '10px 0',
    },
    '& h3': {
      fontSize: '1.1em',
      lineHeight: 1.6,
      marginTop: 10,
    },
  },
}))

const Privacy = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h1>Privacy Policy</h1>

      <br />

      <p>
        We respect your privacy, and recognize that we must maintain and use
        your information responsibly.
      </p>

      <p>
        <a href="https://www.ballotnav.org/">https://www.ballotnav.org/</a> is a
        nonprofit website run by Hack for LA which is a brigade of Code for
        America Labs, Inc. ("Code for America", "we", "us", "our"). This Privacy
        Policy describes how we collect, use, and protect your personal
        information on BallotNav’s website (
        <a href="https://www.ballotnav.org/">https://www.ballotnav.org/</a>). By
        submitting your personal information on our websites, you agree to the
        terms in this Privacy Policy. If you do not agree with these terms,
        please do not use our websites.
      </p>

      <h2>Overview</h2>

      <ul>
        <li>
          We may collect information from you when you visit and take actions on
          our website. We use this information to provide the services you've
          requested.
        </li>

        <li>
          We use cookies (such as those stored by Google Analytics) to provide a
          better experience and improve our website.
        </li>

        <li>
          We will not knowingly disclose or sell your personal information to
          any third party, except as provided in this privacy policy.
        </li>

        <li>
          Protecting your personal information is extremely important to us and
          we take all reasonable measures to do so.
        </li>
      </ul>
      <h2>The personal information we collect</h2>

      <h3>
        Visiting{' '}
        <a href="https://www.ballotnav.org/">https://www.ballotnav.org/</a>{' '}
      </h3>

      <ul>
        <li>
          We may automatically collect and store data about your visit to{' '}
          <a href="https://www.ballotnav.org/">https://www.ballotnav.org/</a>:{' '}
        </li>
        <ul>
          <li>Domain from which you access the Internet</li>

          <li>
            Operating system on your computer and information about the browser
            you used when visiting the site
          </li>

          <li>Date and time of your visit</li>

          <li>Pages you visited</li>

          <li>
            Address of the website that connects you to the Site (such as
            google.com or bing.com)
          </li>

          <li>The queries you make on our site.</li>
        </ul>

        <li>
          None of the information we collect about you when you visit{' '}
          <a href="https://www.ballotnav.org/">https://www.ballotnav.org/</a> is
          personally identifiable unless you submit your contact information in
          the form on the Contact Us submit page.
        </li>

        <li>
          We use this non personally identifiable information to understand how
          the{' '}
          <a href="https://www.ballotnav.org/">https://www.ballotnav.org/</a>{' '}
          website is used, to improve the website, and to monitor usage for
          security purposes.
        </li>

        <li>
          We will not collect personal information from you without your
          knowledge and consent, except in a few limited circumstances as
          described in this policy.
        </li>
      </ul>
      <h3>
        Signing up for notifications at{' '}
        <a href="https://www.ballotnav.org/">https://www.ballotnav.org/</a>:{' '}
      </h3>

      <ul>
        <li>
          When signing up for notifications the information stored is limited
          to:{' '}
        </li>
        <ul>
          <li>Phone Number </li>

          <li>Date / Time created</li>

          <li>
            (State and/or Election Administration Jurisdiction) location for
            which you would like updates for
          </li>
        </ul>
      </ul>
      <h3>Filling in Webforms such as Contact Us</h3>

      <ul>
        <li>We have a form for feedback.</li>

        <li>
          When you submit the contact us form, your comment, and any other data
          you submit, will be sent to Hack for LA. The data included here is
          limited to the fields filled out in the forum.{' '}
        </li>

        <li>
          If you are interested in additional information about Hack for LA or
          Code for America, feel free to reach out.
        </li>

        <li>
          We use the personal data we collect to understand how people ask us
          questions and to improve the experience of doing so.
        </li>
      </ul>
      <h3>Filling in Webforms such as Volunteer With Us</h3>
      <ul>
        <li>We have a form for signing up to volunteer with BallotNav. </li>

        <li>
          When you submit the volunteer form, the data you submit will be sent
          to Hack for LA. The data included here is limited to the fields filled
          out in the forum.{' '}
        </li>
        <ul>
          <li>First name</li>

          <li>Last name </li>

          <li>Your email address </li>

          <li>Volunteer Interests </li>

          <li>Skills </li>

          <li>Experience </li>

          <li>Professional Profile link (Linkedin, etc.)</li>

          <li>Location (general)</li>

          <li>Domain from which you access the internet</li>

          <li>IP address</li>

          <li>
            Operating system on your computer and information about the browser
            you used when visiting the site
          </li>

          <li>Date and time when you submit the form</li>

          <li>
            Address of the page on our website, or the third-party website that
            connected you to sign-up form
          </li>
        </ul>

        <li>
          If you are interested in additional information about Hack for LA or
          Code for America, feel free to reach out.
        </li>

        <li>
          We use the personal data we collect to understand how people ask us
          questions and to improve the experience of doing so.
        </li>
      </ul>
      <h3>Google Analytics</h3>

      <ul>
        <li>
          We use Google Analytics to understand how visitors use our site and to
          gather aggregate performance metrics.
        </li>

        <li>
          We’ve set up Google Analytics so that it doesn’t collect your full IP
          address.
        </li>

        <li>
          We don’t collect any personally identifiable information using Google
          Analytics, and we do not combine the information collected through
          Google Analytics with any personally identifiable information.
        </li>

        <li>
          Google Analytics places a cookie on your web browser to identify you
          as a unique user. This cookie cannot be used by anyone but Google.
          Google's ability to use and share information collected by Google
          Analytics about your visits to this site is restricted by the
          <a href="http://www.google.com/analytics/terms/us.html">
            {' '}
            Google Analytics Terms of Use
          </a>{' '}
          and the{' '}
          <a href="http://www.google.com/policies/privacy/">
            Google Privacy Policy
          </a>
          .
        </li>
      </ul>
      <h2>Cookies and other tracking technologies</h2>

      <ul>
        <li>
          Cookies are small text files that websites place on the computers and
          mobile devices of people who visit those websites. Pixel tags (also
          called web beacons) are small blocks of code placed on websites and
          emails.
        </li>

        <li>
          We use cookies and other technologies like pixel tags to remember your
          preferences, enhance your online experience, and to gather data on how
          you use our Sites to improve the way we promote our content, programs,
          and events.
        </li>

        <li>
          Your use of our Sites indicates your consent to such use of Cookies.
        </li>
      </ul>
      <h3>Third party service providers</h3>

      <p>
        We use third-party service providers to track and analyze statistical
        usage and volume information from our Site users. These third-party
        service providers use persistent Cookies to help us to improve the user
        experience, manage the content on our Sites, and analyze how users
        navigate and use the Sites.
      </p>

      <p>
        Third-party service providers we may use include{' '}
        <a href="https://analytics.google.com/">Google Analytics</a>,
        <a href="https://mixpanel.com/"> Mixpanel</a>,
        <a href="https://www.hotjar.com/"> Hotjar</a>,
        <a href="https://www.eventbrite.com/"> Eventbrite</a>,
        <a href="https://donorbox.org/"> Donorbox</a>,
        <a href="https://medium.com/"> Medium</a>,
        <a href="https://twitter.com/?lang=en"> Twitter</a>,
        <a href="https://www.facebook.com/"> Facebook</a>,
        <a href="https://www.linkedin.com/"> LinkedIn</a>, Airtable.
      </p>

      <h3>How to opt-out of the use of cookies</h3>

      <p>
        Most browsers are initially set up to accept HTTP cookies. If you want
        to restrict or block the cookies that are set by our Site, or any other
        site, you can do so through your browser setting. The ‘Help’ function in
        your browser should explain how. Alternatively, you can visit{' '}
        <a href="http://www.aboutcookies.org">www.aboutcookies.org</a>, which
        contains comprehensive information on how to do this on a wide variety
        of browsers. You will find general information about cookies and details
        on how to delete cookies from your machine.
      </p>

      <h2>As required by law and similar disclosures</h2>

      <ul>
        <li>
          We may access, preserve, and disclose your information if we believe
          doing so is required or appropriate to:{' '}
        </li>
        <ul>
          <li>
            comply with law enforcement requests and legal process, such as a
            court order or subpoena;
          </li>

          <li>respond to your requests; or</li>

          <li>protect your, our, or others’ rights, property, or safety.</li>
        </ul>

        <li>
          For the avoidance of doubt, the disclosure of your information may
          occur if you post any objectionable content on or through the Site.
        </li>
      </ul>
      <h2>Consent</h2>

      <ul>
        <li>
          We may also disclose information from you or about you or your devices
          with your permission.
        </li>
      </ul>
      <h2>Children’s privacy</h2>

      <ul>
        <li>
          We do not knowingly collect, maintain, or use personal information
          from children under 13 years of age, and no part of our Site is
          directed to children.
        </li>

        <li>
          If you learn that a child has provided us with personal information in
          violation of this Privacy Policy, then you may alert us at{' '}
          <a href="mailto:privacy@hackforla.org">privacy@hackforla.org</a> and
          reference “BallotNav” in the subject line.
        </li>
      </ul>
      <h2>Security</h2>

      <ul>
        <li>
          We make reasonable efforts to protect your information by using
          physical and electronic safeguards designed to improve the security of
          the information we maintain. However, as our Services are hosted
          electronically, we can make no guarantees as to the security or
          privacy of your information.
        </li>
      </ul>
      <h2>Right to be forgotten and rectification</h2>

      <ul>
        <li>
          You may request that we delete your personal data that is stored in
          our databases at any time. Requests can be submitted to{' '}
          <a href="mailto:privacy@hackforla.org">privacy@hackforla.org</a> and
          reference “BallotNav” in the subject line.
        </li>
      </ul>
      <h2>Changes</h2>

      <p>
        We may change this Privacy Policy from time to time. Please check this
        page frequently for updates as your continued use of this site after any
        changes in this Privacy Policy will constitute your acceptance of the
        changes.
      </p>

      <h2>Effective Date</h2>

      <p>This version of the policy is effective October 1, 2020.</p>

      <h2>Questions</h2>

      <p>
        If you have any questions, comments, concerns, or complaints related to
        our websites, please contact us by email at ballotnav@hackforla.org, or
        by mail at:
      </p>

      <p>
        Code for America
        <br />
        Ref: Hack for LA, BallotNav
        <br />
        155 9th Street
        <br />
        San Francisco, CA 94103
      </p>
      <br />
    </div>
  )
}

export default Privacy
