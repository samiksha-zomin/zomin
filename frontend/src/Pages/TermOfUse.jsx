import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { Container, Row, Col } from "react-bootstrap";
import Heading from "../Components/Heading";
import Logo from "../Components/Logo";

function TermOfUse() {
  return (
    <div id="termofuse" className="termofuse">
      <HelmetProvider>
        <Helmet>
          <title> Term of Use | Zom - IN </title>
        </Helmet>
      </HelmetProvider>
      <Container fluid className="h-100 searchbox">
        <Row className="py-3 px-5 text-center">
          <Heading content="Term of Use" design="h1" />
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
            <Heading content="Overview" design="h4" />
            <ol>
              <li>
                <p>
                  “Site” or “Zom-In shall include any information or services
                  made available by Topnotch, regardless of the medium, and
                  shall include, without limitation any affiliated websites,
                  mobile applications, videos, products and applications we make
                  available. We reserve the right at any time, and from time to
                  time, to modify, suspend or discontinue (temporarily or
                  permanently) the Site, or any part of the Site, with or
                  without notice.
                </p>
              </li>
              <li>
                <p className="fw-bold">
                  The Site is not intended for users under 13 years of age. If
                  you are under 13, do not use the Site and do not provide us
                  with any personal information.
                </p>
              </li>
              <li>
                We make no claims that the Site or any of its content is
                accessible or appropriate outside of Malaysia. Access to the
                Site may not be legal by certain persons or in certain
                countries. If you access the Site from outside Malaysia, you do
                so on your own initiative and are responsible for compliance
                with local laws.
              </li>
            </ol>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading content="Disclaimer" design="h4" />
            <p>
              The information available through the Site is provided solely for
              informational purposes on an “as is” basis at user’s sole risk.
              The information is not meant to be, and should not be construed as
              advice or used for investment purposes. Topnotch makes no
              guarantees as to the accurateness, quality, or completeness of the
              information and Topnotch shall not be responsible or liable for
              any errors, omissions, or inaccuracies in the information or for
              any user’s reliance on the information. User is solely responsible
              for verifying the information as being appropriate for user’s
              personal use, including without limitation, seeking the advice of
              a qualified professional regarding any specific questions a user
              may have.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading
              content="Our Right to Modify These Terms of Use"
              design="h4"
            />
            <p>
              We reserve the right to change these Terms of Use at any time. You
              should check this page regularly. The changes will appear on the
              Site and will be effective when we post the changes. Your
              continued use of the Site means you agree to and accept the
              changes.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading content="Our Privacy Policy" design="h4" />
            <p>
              Our Privacy Policy contains further information about how data is
              collected, used and made available on or by our Site. We encourage
              you to read it, <a href="/privacypolicy">here</a>.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading content="Topnotch Intellectual Property " design="h4" />
            <h5>Your Limited License to our Intellectual Property</h5>
            <p>
              The materials used and displayed on the Site, including but not
              limited to text, software, photographs, graphics, illustrations
              and artwork, video, music and sound, and names, logos, trademarks
              and service marks, are the property of Topnotch, or its affiliates
              or licensors and are protected by copyright, trademark and other
              laws. Any such content may be used solely for your personal,
              non-commercial use. You agree not to modify, reproduce,
              retransmit, distribute, disseminate, sell, publish, broadcast or
              circulate any such material without the prior written permission
              of Topnotch. Topnotch grants you a personal, non-exclusive,
              non-transferable, revocable license to use the Site and any
              materials on the site for non-commercial purposes subject to these
              Terms of Use.
            </p>
            <h5>Topnotch Trademarks and Logos</h5>
            <p>
              The terms Topnotch, www.topnotchgroup.com.my and other Topnotch
              trademarks and services marks, and associated logos and all
              related names, logos, product and service names, designs and
              slogans are trademarks of Topnotch or its affiliates or licensors.
              You may not use such marks without the prior written permission of
              Topnotch. All other names, logos, product and service names,
              designs and slogans on the Site are the trademarks of their
              respective owners.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading content="Reliance on Information on Site" design="h4" />
            <h5>
              We have no obligation to, and you should not expect us to, review
              content on our Site, including User Contributions (defined below)
              or contributions by our independent contributors.
            </h5>
            <h5>About our Contributors</h5>
            <p>
              Topnotch seeks out content providers in particular subject matters
              as independent contractor contributors to the Site. Topnotch does
              not represent or guarantee that any contributor has achieved any
              particular level of expertise or knowledge or has any specific
              qualifications or credentials, without limitation, as to the
              subject matter to which their contributions relate. To the extent
              we refer to each of these contributors as an expert, you must
              understand we rely on the information they provide us and we are
              not obligated to independently verify or attempt to confirm any
              information they provide, nor their qualifications or credentials.
              Topnotch also is not obligated to monitor or independently
              research or verify any content they contribute. Contributors, even
              if characterized as an expert, are not employees of Topnotch or
              its affiliates and Topnotch cannot and does not represent or
              warrant the accuracy, completeness or truthfulness of the
              qualifications or credentials of any contributor, nor of any other
              users of the Site.
            </p>
            <h5>
              Please do not rely on Site content, including User Contributions
              and content from our independent contractor contributors. Content
              is provided for general information purposes only and can never
              take into account your unique, personal circumstances and needs.
              You acknowledge and agree that any reliance or actions you take in
              violation of your agreement with us shall be at your sole and
              exclusive risk and Topnotch shall have no responsibility or
              liability to you whatsoever. You also acknowledge and agree that
              communications on or through the Site, whether with content
              providers or other users, are at your own risk and are not covered
              by any privilege or confidentiality obligation that might apply if
              you were to obtain your own professional advice.
            </h5>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading content="Prohibited Uses of the Site" design="h4" />
            <p>
              You may use the Site only for lawful purposes and in accordance
              with these Terms of Use. You agree not to use the Site:
            </p>
            <ol>
              <li>
                <p>
                  In any way that violates any applicable federal, local or
                  international law or regulation.
                </p>
              </li>
              <li>
                <p>
                  For the purpose of exploiting, harming or attempting to
                  exploit or harm minors in any way by exposing them to
                  inappropriate content, asking for personally identifiable
                  information or otherwise
                </p>
              </li>
              <li>
                <p>
                  To transmit, or procure the sending of, any advertising or
                  promotional material, including any “junk mail”, “chain
                  letter” or “spam” or any other similar solicitation.
                </p>
              </li>
              <li>
                <p>
                  To impersonate or attempt to impersonate Topnotch, a Topnotch
                  employee, another user or any other person or entity
                  (including, without limitation, by using email addresses or
                  screen names associated with any of the foregoing).
                </p>
              </li>
              <li>
                <p>
                  To engage in any other conduct that restricts or inhibits
                  anyone’s use or enjoyment of the Site, or which, as determined
                  by us, may harm Topnotch or users of the Site or expose them
                  to liability.
                </p>
              </li>
            </ol>
            <p>Additionally, you agree not to:</p>
            <ol>
              <li>
                <p>
                  "Scrape” or disaggregate data from the Site (whether by manual
                  or automated means) for any commercial, marketing, or data
                  compiling or enhancing purpose.
                </p>
              </li>
              <li>
                <p>
                  Introduce any viruses, trojan horses, worms, logic bombs or
                  other material which is malicious or technologically harmful.
                </p>
              </li>
              <li>
                <p>
                  Attempt to gain unauthorized access to, interfere with, damage
                  or disrupt any parts of the Site, the server on which the Site
                  is stored, or any server, computer or database connected to
                  the Site.
                </p>
              </li>
              <li>
                <p>
                  Otherwise attempt to interfere with the proper working of the
                  Site.
                </p>
              </li>
            </ol>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading
              content="Content That You Make Availabel on the Site"
              design="h4"
            />
            <h5>User Contributions</h5>
            <p>
              The Site may contain message boards, chat rooms, personal web
              pages or profiles, forums, bulletin boards and other interactive
              features (collectively, “Interactive Services”) that allow users
              to post, submit, publish, display or transmit to other users or
              other persons (hereinafter, “post”) content or materials
              (collectively, “User Contributions”) on or through the Site.
            </p>
            <p>
              You voluntarily disclose personal information (e.g., user name,
              email address) on the Site, such as on a forum, chat room or on
              any other user or member-generated pages, that information can be
              viewed in search engines, collected and used by others and may
              result in unsolicited contact from other parties.{" "}
              <span className="fw-bold">
                We advise that you not post any personal or other sensitive
                information on our Site.
              </span>
            </p>
            <p>
              Any User Contribution you post to the Site will be considered
              non-confidential and non-proprietary. By providing any User
              Contribution on the Site, you grant us and our affiliates and
              service providers, and each of their and our respective licensees,
              successors and assigns the right to use, reproduce, modify,
              perform, display, distribute and otherwise disclose to third
              parties any such material for any purpose.
            </p>
            <p>You represent and warrant that:</p>
            <ol>
              <li>
                <p>
                  You own or control all rights in and to the User Contributions
                  and have the right to grant the license granted above to us
                  and our affiliates and service providers, and each of their
                  and our respective licensees, successors and assigns.
                </p>
              </li>
              <li>
                <p>
                  All of your User Contributions do and will comply with these
                  Terms of Use.
                </p>
              </li>
            </ol>
            <p>
              You understand and acknowledge that you are responsible for any
              User Contributions you submit or contribute, and you, not the
              Company, have full responsibility for such content, including its
              legality, reliability, accuracy and appropriateness. We are not
              responsible, or liable to any third party, for the content or
              accuracy of any User Contributions posted by you or any other user
              of the Site.
            </p>
            <h5>Monitoring and Enforcement; Termination</h5>
            <p>We have the right to:</p>
            <ol>
              <li>
                <p>
                  Remove or refuse to post any User Contributions for any or no
                  reason in our sole discretion.
                </p>
              </li>
              <li>
                <p>
                  Take any action with respect to any User Contribution that we
                  deem necessary or appropriate in our sole discretion,
                  including if we believe that such User Contribution violates
                  the Terms of Use, including the content standards below,
                  infringes any intellectual property right or other right of
                  any person or entity, threatens the personal safety of users
                  of the Site or the public or could create liability for the
                  Company.
                </p>
              </li>
              <li>
                <p>
                  Disclose your identity or other information about you to any
                  third party who claims that material posted by you violates
                  their rights, including their intellectual property rights or
                  their right to privacy.
                </p>
              </li>
              <li>
                <p>
                  Take appropriate legal action, including without limitation,
                  referral to law enforcement, for any illegal or unauthorized
                  use of the Site.
                </p>
              </li>
              <li>
                <p>
                  Terminate or suspend your access to all or part of the Site
                  for any or no reason, including without limitation, any
                  violation of these Terms of Use.
                </p>
              </li>
            </ol>
            <p>
              Without limiting the foregoing, we have the right to fully
              cooperate with any law enforcement authorities or court order
              requesting or directing us to disclose the identity or other
              information related to anyone posting any materials on or through
              the Site. YOU WAIVE AND HOLD HARMLESS THE COMPANY AND ITS
              AFFILIATES, AGENTS, LICENSEES AND SERVICE PROVIDERS FROM ANY
              CLAIMS RESULTING FROM ANY ACTION TAKEN BY ANY OF THE FOREGOING
              PARTIES DURING OR AS A RESULT OF ITS INVESTIGATIONS AND FROM ANY
              ACTIONS TAKEN AS A CONSEQUENCE OF INVESTIGATIONS BY EITHER THE
              COMPANY/SUCH PARTIES OR LAW ENFORCEMENT AUTHORITIES.
            </p>
            <p>
              We cannot and do not undertake to review all material before it is
              posted on the Site, and cannot ensure prompt removal of
              objectionable material after it has been posted. Accordingly, we
              assume no liability for any action or inaction regarding
              transmissions, communications or content provided by any user or
              third party. We have no liability or responsibility to anyone for
              performance or nonperformance of the activities described in this
              section.
            </p>
            <h5>Content Standards</h5>
            <p>
              These content standards apply to any and all User Contributions
              and use of Interactive Services. User Contributions must in their
              entirety comply with all applicable federal, state, local and
              international laws and regulations. Without limiting the
              foregoing, User Contributions must not:
            </p>
            <ol>
              <li>
                Contain any material which is defamatory, obscene, indecent,
                abusive, offensive, harassing, violent, hateful, inflammatory or
                otherwise objectionable.
              </li>
              <li>
                Promote sexually explicit or pornographic material, violence, or
                discrimination based on race, sex, religion, nationality,
                disability, sexual orientation or age.
              </li>
              <li>
                Infringe any patent, trademark, trade secret, copyright or other
                intellectual property or other rights of any other person.
              </li>
              <li>
                Violate the legal rights (including the rights of publicity and
                privacy) of others or contain any material that could give rise
                to any civil or criminal liability under applicable laws or
                regulations or that otherwise may be in conflict with these
                Terms of Use and our <a href="/privacypolicy">Privacy Policy</a>
                .
              </li>
              <li>Be likely to deceive any person.</li>
              <li>
                Promote any illegal activity, or advocate, promote or assist any
                unlawful act.
              </li>
              <li>
                Cause annoyance, inconvenience or needless anxiety or be likely
                to upset, harass, embarrass, alarm or annoy any other person.
              </li>
              <li>
                Impersonate any person, or misrepresent your identity or
                affiliation with any person or organization.
              </li>
              <li>
                Promote commercial activities or sales, such as contests,
                sweepstakes and other sales promotions, barter or advertising.
              </li>
              <li>
                Give the impression that they emanate from or are endorsed by us
                or any other person or entity, if that is not the case.
              </li>
            </ol>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading content="Your Indemnification of Us" design="h4" />
            <p>
              You agree to indemnify, defend and hold harmless Topnotch, and its
              officers, directors, owners, employees, agents, information
              providers, affiliates, licensors and licensees (collectively, the
              “Indemnified Parties”) from and against any and all liability and
              costs, including, without limitation, reasonable attorneys’ fees,
              incurred by the Indemnified Parties in connection with any claim
              arising out of (a) any User Contributions, or (b) breach by you or
              any user of your account or these Terms of Use or any
              representations, warranties and covenants contained in these Terms
              of Use. You shall cooperate fully and reasonably in the defense of
              any such claim. Topnotch reserves the right, at its own expense,
              to assume the exclusive defense and control of any matter subject
              to indemnification by you.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading content="LIABILITY DISCLAIMER" design="h4" />
            <p>
              YOUR USE OF THE SITE IS AT YOUR OWN RISK. NEITHER TOPNOTCH NOR ANY
              OF ITS SUBSIDIARIES, DIVISIONS, AFFILIATES, AGENTS,
              REPRESENTATIVES OR LICENSORS (INCLUDING OUR INDEPENDENT CONTRACTOR
              CONTRIBUTORS) SHALL BE LIABLE TO YOU OR ANYONE ELSE FOR ANY LOSS
              OR INJURY OR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL,
              SPECIAL, PUNITIVE OR SIMILAR DAMAGES ARISING OUT OF YOUR ACCESS OR
              USE OF, OR YOUR INABILITY TO ACCESS OR USE, THE SITE AND THE
              INFORMATION AVAILABLE ON THE SITE OR ARISING OUT OF ANY ACTION
              TAKEN IN RESPONSE TO OR AS A RESULT OF ANY INFORMATION AVAILABLE
              ON THE SITE. YOU HEREBY WAIVE ANY AND ALL CLAIMS AGAINST TOPNOTCH
              AND ITS SUBSIDIARIES, DIVISIONS, AFFILIATES, AGENTS,
              REPRESENTATIVES AND LICENSORS (INCLUDING OUR INDEPENDENT
              CONTRACTOR CONTRIBUTORS) ARISING OUT OF YOUR USE OF THE SITE AND
              THE INFORMATION AVAILABLE THEREON.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading
              content="Third Party Links, Advertisements, Websites and Content"
              design="h4"
            />
            <p>
              Do not review or monitor any websites, advertisements, or other
              media linked to or available through the Site and are not
              responsible for the content of any such third party advertisements
              or linked websites. Prior to purchasing any third party products
              or services described on the Site, you are advised to verify
              pricing, product quality and other information necessary to make
              an informed purchase. Neither Zom-In nor its parent or any of its
              subsidiaries, divisions, affiliates, agents, representatives or
              licensors shall have any liability arising from your purchases of
              third party products or services based upon the information
              provided on the Site, and we shall not receive or review
              complaints regarding such purchases.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading content="Disputes" design="h4" />
            <p>
              These Terms of Use and any disputes arising out of or related to
              the Site shall be governed by, and construed and enforced in
              accordance with, the laws of Malaysia. In the event of any such
              dispute, you irrevocably consent to exclusive jurisdiction and
              venue in the courts in Malaysia.
            </p>
            <p>
              ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR
              RELATING TO THESE TERMS OF USE OR THE SITE MUST BE COMMENCED
              WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES, OTHERWISE,
              SUCH CAUSE OF ACTION OR CLAIM IS PERMANENTLY BARRED AND YOU HEREBY
              AGREE TO WAIVE SUCH CAUSE OF ACTION OR CLAIM AFTER SUCH DATE.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading content="Waiver and Severability" design="h4" />
            <p>
              No waiver by Topnotch of any term or condition set forth in these
              Terms of Use shall be deemed a further or continuing waiver of
              such term or condition or a waiver of any other term or condition,
              and any failure of Topnotch to assert a right or provision under
              these Terms of Use shall not constitute a waiver of such right or
              provision.
            </p>
            <p>
              If any provision of these Terms of Use is held by a court or other
              tribunal of competent jurisdiction to be invalid, illegal or
              unenforceable for any reason, such provision shall be eliminated
              or limited to the minimum extent such that the remaining
              provisions of the Terms of Use will continue in full force and
              effect.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading content="Entire Agreement" design="h4" />
            <p>
              The failure of us to exercise or enforce any right or provision of
              these Terms of Service shall not constitute a waiver of such right
              or provision.
            </p>
            <p>
              These Terms of Service and any policies or operating rules posted
              by us on this site or in respect to The Service constitutes the
              entire agreement and understanding between you and us and govern
              your use of the Service, superseding any prior or contemporaneous
              agreements, communications and proposals, whether oral or written,
              between you and us (including, but not limited to, any prior
              versions of the Terms of Service).
            </p>
            <p>
              Any ambiguities in the interpretation of these Terms of Service
              shall not be construed against the drafting party.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading content="Governing Law" design="h4" />
            <p>
              These Terms of Service and any separate agreements whereby we
              provide you Services shall be governed by and construed in
              accordance with the laws of Malaysia.
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10">
            <Heading content="How to Contact Us" design="h4" />
            <p>
              Questions about the Terms of Service should be sent to us at{" "}
              <a href="mailto:hello@zom-in.com/zomin">hello@zom-in.com/zomin</a>
              .
            </p>
            <p>
              Address: B-06-20, Empire Subang SOHO, Jalan SS16/1, 47500 Subang
              Jaya, SELANGOR DARUL EHSAN{" "}
            </p>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-10 text-center">
            <Heading content="Thank you for visiting Zom-In.com" design="h4" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TermOfUse;
