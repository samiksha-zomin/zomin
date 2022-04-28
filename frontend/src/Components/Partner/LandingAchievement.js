import React from 'react';
import { GiTrophyCup } from "react-icons/gi";

function LandingAchievement(props) {
    return (
        <div>
            <h1><GiTrophyCup />{props.partnerAchievement}</h1>
        </div>
    )
}

export default LandingAchievement;
