import React from 'react';
import Heading from '../Heading';

function LandingAbout(props) {
    return (
        <div className="about">
        <Heading content="About" design="h4 mb-4 text-center" />


            <div dangerouslySetInnerHTML={{ __html: props.partnerAbout.replace(/href/g, "target='_blank' href") }} />


        </div>
    )
}

export default LandingAbout;
