import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { Container, Row, Col } from "react-bootstrap";
import Heading from "../Components/Heading";
import Logo from "../Components/Logo";

function PrivacyPolicy() {
  return (
    <div id="privacyPolicy" className="privacyPolicy">
      <HelmetProvider>
        <Helmet>
          <title> Privacy Policy | Zom - IN </title>
        </Helmet>
      </HelmetProvider>
      <Container fluid className="h-100 searchbox">
        <Row className="py-3 px-5 text-center">
          <Heading content="Privacy Policy" design="h1" />
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-10 p-3 text-center">
            <Logo />
            <Heading content="'ZOM-IN' by TopNotch" design="h3 m-1" />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <p>
              Zom-In.com is owned and operated by Agensi Pekerjaan Topnotch Sdn
              Bhd (Company Registration No. 1077479 – X) (“Topnotch”, “Us”,
              “We”, or “Our”). This Privacy Policy describes how we collect,
              use, disclose, process and protect personally identifiable
              information (“Personal Data”) that you (the “User”) may provide in
              connection with
            </p>
            <p>
              Zom-In’s services are available through the website located at
              www.zom-in.com/zomin (“Zom-In” “Site”,”Website”). Personal Data
              means data, whether true or not, about an individual who can be
              identified from that data, or from that data and other information
              to which the organisation has or is likely to have access.
              References to the Site are deemed to include derivatives thereof,
              including but not necessarily limited to mobile websites and
              applications. By visiting or using the Site, you agree and consent
              to the collection, use, disclosure and processing of your Personal
              Data in accordance with this Privacy Policy and/or the Website
              Terms. If you do not agree to the Privacy Policy below, please
              leave the Site immediately.
            </p>
            <p>
              From time to time, Zom-In may revise this Privacy Policy to
              reflect changes in the law, our Personal Data collection and use
              practices, the features of our Site, or advances in technology. If
              we make revisions that change the way we collect or use your
              Personal Data, those changes will be posted in this Privacy Policy
              and the effective date will be noted at the beginning of this
              Privacy Policy. Therefore, you should review this Privacy Policy
              periodically so that you are up to date on our most current
              policies and practices.
            </p>
            <p>
              Zom-In will also prominently post such material changes prior to
              implementing the change. If you do not agree with any changes or
              modifications to the Privacy Policy, please do not continue using
              the Site. You will be deemed to have consented to any modification
              of the Privacy Policy when you use the Site after the effective
              date of the modification.
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading
              content="Section 1 - WHAT DO WE DO WITH YOUR INFORMATION?"
              design="h4"
            />
            <p>
              When you register a membership or purchase something from our
              website, as part of the buying and selling process, we collect the
              personal information you give us including but not limited to your
              name, address and email address.
            </p>
            <p>
              When you browse our website, we also automatically receive your
              computer’s internet protocol (IP) address in order to provide us
              with information that helps us learn about your browser and
              operating system.
            </p>
            <p>
              Email marketing: With your permission, we may send you emails
              about our site, new products and other updates.
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading content="Section 2 - CONSENT" design="h4" />
            <h5>How do you get my consent?</h5>

            <p>
              When you provide us with personal information to complete a
              transaction, verify your credit card, place an order, arrange for
              a delivery or return a purchase, we deem you have consented to our
              collecting it and using it for that specific reason only.
            </p>
            <p>
              If we ask for your personal information for a secondary reason,
              like marketing, we will either ask you directly for your expressed
              consent, or provide you with an opportunity to say no.
            </p>
            <h5>How do I withdraw my consent?</h5>
            <p>
              If after you opt-in, you change your mind, you may withdraw your
              consent for us to contact you, for the continued collection, use
              or disclosure of your information, at anytime, by contacting us at
              hello@zom-in.com/zomin.
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading content="Section 3 - DISCLOSURE" design="h4" />
            <p>
              We may disclose your personal information if we are required by
              law to do so or if you violate our Terms of Service.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading content="Section 4 - THIRD-PARTY SERVICES" design="h4" />
            <p>
              In general, the third-party providers used by us will only
              collect, use and disclose your information to the extent necessary
              to allow them to perform the services they provide to us.
            </p>
            <p>
              However, certain third-party service providers, such as payment
              gateways and other payment transaction processors, have their own
              privacy policies in respect to the information we are required to
              provide to them for your purchase-related transactions. Your
              purchase transaction data is stored only as long as is necessary
              to complete your purchase transaction. After that is complete,
              your purchase transaction information is deleted.
            </p>
            <p>
              For these providers, we recommend that you read their privacy
              policies so you can understand the manner in which your personal
              information will be handled by these providers.
            </p>
            <p>
              In particular, remember that certain providers may be located in
              or have facilities that are located at different jurisdiction than
              either you or us. So if you elect to proceed with a transaction
              that involves the services of a third-party service provider, then
              your information may become subject to the laws of the
              jurisdiction(s) in which that service provider or its facilities
              are located.
            </p>
            <p>
              As an example, if you are located in Malaysia and your transaction
              is processed by a payment gateway located in the Malaysia, then
              your personal information used in completing that transaction may
              be subject to disclosure under Malaysia legislation, including the
              Patriot Act.
            </p>
            <p>
              Once you leave our website or are redirected to a third-party
              website or application, you are no longer governed by this Privacy
              Policy or our website’s Terms of Service.
            </p>

            <h5>Links:</h5>
            <p>
              When you click on links on our website, they may direct you away
              from our site. We are not responsible for the privacy practices of
              other sites and encourage you to read their privacy statements.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading content="Section 5 - SECURITY" design="h4" />
            <p>
              To protect your personal information, we take reasonable
              precautions and follow industry best practices to make sure it is
              not inappropriately lost, misused, accessed, disclosed, altered or
              destroyed.
            </p>
            <p>
              If you provide us with your credit card information, the
              information is encrypted using secure socket layer technology
              (SSL) and stored with a AES-256 encryption. Although no method of
              transmission over the Internet or electronic storage is 100%
              secure, we follow all PCI-DSS requirements and implement
              additional generally accepted industry standards.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading content="Section 6 - AGE OF CONSENT" design="h4" />
            <p>
              By using this site, you represent that you are at least of the age
              of majority in your state or province of residence and you have
              given us your consent to allow any of your minor dependents to use
              this site, where legally appropriate.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading
              content="Section 7 - CHANGES TO THIS PRIVACY POLICY"
              design="h4"
            />
            <p>
              We reserve the right to modify this privacy policy at any time, so
              please review it frequently. Changes and clarifications will take
              effect immediately upon their posting on the website. If we make
              material changes to this policy, we will notify you here that it
              has been updated, so that you are aware of what information we
              collect, how we use it, and under what circumstances, if any, we
              use and/or disclose it.
            </p>
            <p>
              If our site is acquired or merged with another company, you hereby
              consent that your information may be transferred to the new owners
              so that we may continue to sell products to you.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading content="QUESTIONS AND CONTACT INFORMATION" design="h4" />
            <p>
              If you would like to: access, correct, amend or delete any
              personal information we have about you, register a complaint, or
              simply want more information contact our Privacy Compliance
              Officer at{" "}
              <a href="mailto:hello@zom-in.com/zomin">hello@zom-in.com/zomin</a>
              .
            </p>
            <h5>Effective June 2018</h5>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center">
        <Col className="col-10 text-center">
          <Heading content="Thank you for visiting Zom-In.com" design="h3" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PrivacyPolicy;
