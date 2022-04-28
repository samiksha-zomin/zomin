import React from 'react';
import ReactPlayer from 'react-player';

import Heading from '../Heading';


function LandingOverview(props) {
    return (
        <div className="overview">
        <Heading content="Overview" design="h4 mb-4" />
        <ReactPlayer
            width="100%"
            min-height="360px"
            url={props.partnerOverview} />
    </div>
    )
}

export default LandingOverview;
