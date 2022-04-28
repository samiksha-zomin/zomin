import React from "react";
import { Row, Col } from "react-bootstrap";

import Heading from "../Heading";

function ZomINBg() {
  return (
    <Row>
      <Col sm={12} className="mx-auto" id="compBg">
        <Heading
          content="Company Background"
          design="fw-bold fs-5 bg-info text-white rounded text-center mb-3"
        />
        <div className="mx-3">
          <p>
            Zom-In is the subsidiary company of TopNotch, an established HR
            consulting firm in Malaysia.
          </p>
          <p>
            Established in late 2018, our co-founders noticed a declining trend
            of fresh graduates being subjectively rejected- being perceived as
            overly dependent and inadequately prepared for work in the corporate
            world.
          </p>
          <p>
            At Zom-In, we all come to work every day because we want to close
            the concerning divide between students and employers- the invisible
            barrier between regional entrepreneurs and unhoned young minds.
            Everyone is guessing. Students do not know what to do after
            graduating from their studies; entrepreneurs are hesitating to
            provide company investment in training fresh graduates in fear of
            losing resources and time.
          </p>
          <p>
            Throughout the history of the recruitment business, people turn to
            online job-oriented platforms to seek career advice and opportunity.
            Our commitment to transparency is to make the recruitment process
            for both students and employers more comprehensive.
          </p>
          <p>
            Today, we provide a series of employment-oriented programmes, tools,
            and content- all for the purpose of inspiring and empowering both
            parties. We aspire to make our platform the devoted bridge that
            connects both the companies and employees.
          </p>
        </div>
      </Col>
    </Row>
  );
}

export default ZomINBg;
