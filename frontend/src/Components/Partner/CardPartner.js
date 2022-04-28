import React from 'react';

import { Card, Button } from 'react-bootstrap';

//Icon
import { BiChevronsRight } from "react-icons/bi";


function CardPartner(props) {

    var partnerLink = "/partner/" + props.cardHeader.toLowerCase().trim().split(/\s+/).join('-');
    
    return (
            <Card className="cardPartner position-relative mx-1" >
                <div className="text-center cardImg">
                    <img src={props.cardImage} className="rounded" alt="..." />
                </div>
                <dt className="col-12 h5 text-truncate">{props.cardHeader}</dt>
                <div className="col-12">
                    <span className="badge rounded-pill bg-info text-dark">{props.cardMeta}</span>
                </div>
                <div className="col-12 mt-2 mb-4 module line-clamp">
                  <div dangerouslySetInnerHTML={{ __html: props.cardDesc.replace(/href/g, "target='_blank' href") }} />
                </div>
                <div className="col-12 position-absolute bottom-0 start-50 translate-middle-x mt-5 mb-2">
                    <Button  value={partnerLink} href={partnerLink} variant="outline-primary"> Read More<BiChevronsRight />
                    </Button>
                </div>

            </Card>
    )
}

export default CardPartner;
