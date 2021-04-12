import React from 'react'
import ballotNavLogo from 'assets/logos/ballotnav.svg'

const LandingHeader = () => {
    return (
        <div>
            <img src={ballotNavLogo} style={{display: "flex"}} />
        </div>
    )
};

export default LandingHeader;