import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Heading from "../Components/Heading";

function TermOfBusiness() {
  return (
    <div className="mx-auto text-center my-5">
      <Container className="px-5">
        <Heading content="'ZOM-IN' by TopNotch'" design="h3" />
        <Heading
          content="TERMS OF BUSINESS FOR THE 'ZOM-IN' PROGRAM"
          design="h3 fw-bold"
        />
        <p className="text-start">
          THIS AGREEMENT is made on the 13th of September 2019.
        </p>
        <Container className="px-5">
          <Row className="text-start">
            <Col sm={2}>
              <p>BETWEEN</p>
            </Col>
            <Col sm={10}>
              <p>Agensi Pekerjaan TopNotch SDN BHD [1077479-X]</p>
              <p>(Here in after referred to as “TopNotch ”)</p>
            </Col>
          </Row>

          <Row className="text-start">
            <Col sm={2}>
              <p>AND</p>
            </Col>
            <Col sm={10}>
              <p>Company that agreed with Zom-In Terms of Busienss</p>
              <p>(Here in after referred to as “Business Partner”)</p>
            </Col>
          </Row>
        </Container>
        <Container className="my-5 mx-3 text-start">
          <Heading content="1. Purpose of the Agreement" design="h4" />
          <p>
            This agreement describes the understanding and commitments of both
            parties to this collaborative effort via ‘ZOM-IN’ platform.
          </p>
          <p>
            ZOM-IN Platform is described as: An online platform created for
            young minds and Business Partners to empower and inspire one another
            via programmes created by Zom-In and promotes Business Partner's
            business and branding.
          </p>
        </Container>

        <Container className="my-5 mx-3 text-start">
          <Heading content="2. Roles And Responsibilities" design="h4" />
          <ol>
            <li>
              Business Partner agrees to commit resources and efforts to the
              collaboration as follows:
            </li>
            <p>
              Shall provide exclusive promotion to TopNotch’s subscribers ‘The
              Real Life Experience ‘/Launch-IN{" "}
            </p>
            <p>
              The Real Life Experience is described as: Students from the
              University/College gain experience by working on real-life project
              assigned by the Business Partner. At the same time this will
              enable the Business Partner to identify talents for future
              internship or fresh graduate hiring.
            </p>
            <p>
              Launch – In: "A platform that ties with Zom-In that will allow
              students from the University/College to showcase their projects or
              entrepreneur skills by publishing their prototypes or ideas in the
              Launch-In page. Business Partner will be notified via the monthly
              Newsletter. The Business Partner can then evaluate and make
              assessment to determine suitable candidates for either mentor
              programme or exploring business opportunities.
            </p>
            <li>
              TopNotch agrees to commit resources and efforts to the
              collaboration as follows :
            </li>
            <p>Shall provide the marketing platform called ‘ZOM-IN’. </p>
            <p>
              Make available greater exposure for Business Partner by sharing
              Business Partner's information on "ZOM-IN"{" "}
            </p>
            <p>
              Sharing information on ‘ZOM-IN’ via TopNotch’s blog, FaceBook,
              Instagram, Newsletters and Zom-In website publication period which
              is aligned with the duration of the agreement as stated in clause
              3.{" "}
            </p>
          </ol>
        </Container>

        <Container className="my-5 mx-3 text-start">
          <Heading content="3. Duration" design="h4" />
          <p>
            This agreement commences from the above written date and shall
            continue in force unless terminated in accordance to clause 4
            (Termination).
          </p>
        </Container>

        <Container className="my-5 mx-3 text-start">
          <Heading content="4. Termination of this agreement" design="h4" />
          <p>
            TopNotch and Business Partner reserve the rights to withdraw from or
            terminate this agreement without assigning any reason by giving to
            the other at least 14 days written notice . TopNotch retains sole
            discretion in determining the structure and contents of the ‘ZOM-IN
            platform.
          </p>
        </Container>

        <Container className="my-5 mx-3 text-start">
          <Heading content="5. Amendments" design="h4" />
          <p>
            This agreement may be amended only through mutual written agreement
            by TopNotch and Business Partner.{" "}
          </p>
        </Container>

        <Container className="my-5 mx-3 text-start">
          <Heading content="6. Other General Terms" design="h4" />
          <ul>
            <li>
              The Business Partner acknowledges that the TopNotch is relying, on
              the Business Partner’s representations, expertise and experience
              in performing all aspects of the obligations identified in this
              Agreement with diligence, good faith and by qualified personnel.
            </li>
            <li>
              The Business Partner shall not make any representation, enticement
              or any form of offer to students on its behalf or on behalf of
              TopNotch that is intended to induce the Participants to accept any
              form of offering, unless such have been approved in writing by
              TopNotch.
            </li>
            <li>
              Both Parties shall, in the course of providing services to
              TopNotch, comply with the Personal Data Protection Act 2010 and
              with any other applicable legislation governing the collection,
              use, storage, and disclosure of personal information. Both Parties
              acknowledge that, for the duration of this Agreement, it must have
              in place and must maintain appropriate policies, practices,
              controls and procedures to ensure it engages only in the lawful
              collection, storage, use and disclosure of personal information.
            </li>
            <li>
              Both Parties acknowledges that, in the course of its collaboration
              ,it will acquire information about certain matters which are
              confidential in nature, which information is and shall remain the
              exclusive property of the other, including but not limited to each
              other’s: trade secrets; lists of present and prospective
              customers; financial information; business plans, forecasts and
              market strategies; systems, processes, discoveries, inventions,
              research and development, formulas and technology, plans, and
              designs (the “Information”). Both Parties acknowledge that the
              Information could be used to the detriment of the other and that
              its use or disclosure to third parties could cause irreparable
              harm. Accordingly, the Botb Parties undertake to treat the
              Information confidentially and not to disclose it to any third
              party or use it for any purpose either during the effective period
              of this Agreement, except as may be necessary in the course of the
              collaboration and further undertakes not to circumvent by dealing
              directly or indirectly with any party involved in this project or
              poach any staff member of each other except with the prior written
              permission of the other. This confidentiality and non
              circumvention undertaking shall apply where relevant vice- versa
              between both parties and shall continue to remain in force after
              termination or expiration of this Agreement for a period of two
              years ,
            </li>
            <li>
              Both Parties agree to indemnify each other against all claims,
              complaints, actions, assessments, damages, awards, penalties,
              fines, costs incurred related to each party’s performance of
              duties and obligations under this Agreement including but not
              limited to the unlawful collection, use, storage and disclosure of
              personal information under privacy.
            </li>
          </ul>
        </Container>

        <Heading
          content="We hereby understand and accept the terms and conditions contained in
          this Agreement."
          design="h3"
        />
      </Container>
    </div>
  );
}

export default TermOfBusiness;
