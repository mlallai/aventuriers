import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";
import image from "assets/img/mountain.jpg";
import GridContainer from "components/Grid/GridContainer.jsx";
import FooterBar from "views/Footer/FooterBar.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
const dashboardRoutes = [];

class PrivatePolicy1 extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  render() {
    const { classes, ...rest } = this.props;
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Adventurer"
          links={
            !isAuthenticated ? (
              <HeaderLinks dropdownHoverColor="info" />
            ) : (
              <HeaderLinksAuth dropdownHoverColor="info" />
            )
          }
          fixed
          changeColorOnScroll={{
            height: 100,
            color: "white"
          }}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <Card className={classes.cardSignup}>
                <h2 className={classes.cardTitle}>Private Policy</h2>
                <CardBody>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={5} md={5}>
                      <div style={{ margin: "10px" }}>
                        Adventurer is committed to protecting your privacy and
                        developing technology that gives you a powerful and safe
                        online experience. This Privacy Policy (the "Policy")
                        applies to the System and Services and governs online
                        data collection and usage. By using the System or
                        Services you consent to the data practices described in
                        this Policy. All capitalized words not defined herein
                        shall have the meanings ascribed to them in the Terms of
                        Use.
                        <h4>Collection of your Personal Information</h4>
                        Adventurer collects personally identifiable information,
                        including, but not limited to, your e-mail address,
                        name, sport practices, sport projects intended, and
                        telephone number. Additionally, provided your consent,
                        Adventurer may collect location data received from a
                        GPS-enabled device or other mechanism that you have set
                        up in order to show your location to other Users or
                        provide information, including target advertising or
                        promotions, to you specific to your geographic locality
                        via the System. Many GPS-enabled devices allow users to
                        "turn off" location-enabling data being sent to
                        Adventurer or any other party. If you do not wish to
                        provide us with your location, please disable the
                        location-enabling functionality on your device or simply
                        update your preferences on the System to preclude
                        collection of your location data. Adventurer may also
                        collects anonymous demographic information, which is not
                        unique to you, such as your ZIP code, age, gender,
                        preferences, interests, and favorites. There is also
                        information about your computer or mobile device
                        hardware and software that is automatically collected by
                        Adventurer. This information can include: your IP
                        address, mobile device type and model, browser type,
                        device ID, domain names, access times and referring web
                        site addresses. This information is used by Adventurer
                        for the operation of the System, to maintain quality of
                        the System, and to provide general statistics regarding
                        use of the System. Please keep in mind that if you
                        directly disclose personally identifiable information or
                        personally sensitive data through the System or Services
                        (including, for clarity, the Communication Services),
                        this information may be collected and used by others.
                        (Note: Adventurer does not read any of your private
                        online communications with other Users of the System or
                        Services.) We will retain your personally identifiable
                        information for the period necessary to fulfill the
                        purposes outlined in this Policy unless otherwise
                        required or permitted by law.
                        <h4>
                          Collection of the Personally Identifiable Information
                          of Others
                        </h4>
                        In addition to your personally identifiable information,
                        Adventurer also may collect the personally identifiable
                        information of others. If you so choose, the System may
                        be used to upload and store your contacts (or individual
                        entries) as part of the Services, for the purpose of
                        enhancing your experience by leveraging these contacts
                        in various ways, including (i) suggesting potential
                        contacts through the System with whom you have not yet
                        met, (ii) giving you the option to choose whether to
                        invite contacts in your address book who are not yet
                        users of the Adventurer System or Services to use
                        Adventurer in order to grow your Adventurer network, and
                        (iii) any other services or tools which Adventurer may
                        acquire or develop in the future to enhance your
                        experience using the System and the Services.
                        Information of your contacts may include names, e-mail
                        addresses, phone numbers, and other identifiers. Your
                        contacts information may be uploaded to the system
                        directly from the devices you use to access the System
                        or by explicitly granting the System authorization to
                        access your contacts information stored on third party
                        sites or services.
                        <h4>Third Party Web Sites</h4>
                        You may have the option to enter third party sites or
                        pages through the System. Adventurer cannot be assured
                        that such third party sites or pages follow
                        Adventurer’s, or equivalent, privacy policies. As such,
                        we have no responsibility or liability for the actions
                        or policies of such third party sites or pages, nor do
                        we endorse any product or service that may be mentioned
                        or offered in such sites, and are not otherwise
                        responsible for the content or privacy practices of such
                        sites.
                        <h4>
                          Use of your Personal Information and the Personal
                          Information of Others
                        </h4>
                        Adventurer collects and uses your personally
                        identifiable information and such other personally
                        identifiable information of others you may provide us,
                        to operate the System and deliver the services you have
                        requested. Adventurer may also use your personally
                        identifiable information to inform you of other products
                        or services available from Adventurer and its
                        affiliates. Adventurer may also contact you via surveys
                        to conduct research about your opinion of current
                        services or of potential new services that may be
                        offered by Adventurer. Adventurer may monitor the
                        websites and pages our customers visit within the
                        System, in order to determine what Adventurer services
                        are the most popular among Adventurer’s customers or
                        users. This data is used to deliver customized content
                        and advertising within the System to customers whose
                        behavior indicates that they are interested in a
                        particular subject area. Except as set forth in this
                        Policy, we will not use, disclose, or transfer your
                        personally identifiable information or the personally
                        identifiable information of others you have provided us
                        unless (1) you expressly authorize us to do so; (2) it
                        is necessary to allow our service providers or agents to
                        provide services for us, (3) it is necessary in order to
                        provide our products or services to you (and contacting
                        you when necessary), (4) we are sending you other
                        information that may be useful to you, (5) subject to
                        applicable contractual or legal restrictions, it is
                        disclosed to entities that perform marketing services on
                        our behalf or to other entities with whom we have joint
                        marketing agreements, (6) it is necessary to protect the
                        confidentiality or security of your records, (7) subject
                        to applicable contractual or legal restrictions, it is
                        necessary in connection with a sale of all or
                        substantially all of the assets of Adventurer or the
                        merger of Adventurer into another entity or any
                        consolidation, share exchange, combination,
                        reorganization, or like transaction in which Adventurer
                        is not the survivor, (8) it is necessary in connection
                        with other business purposes including, without
                        limitation, customer care, service quality, business
                        management and operation, risk assessment, security,
                        fraud and crime prevention/detection, monitoring,
                        research and analysis, marketing, customer purchasing
                        preferences and trends and dispute resolution, (9) it is
                        necessary to comply with law enforcement, governmental
                        mandate, or other legal requirement, if appropriate, for
                        your protection or in connection with an investigation
                        or prosecution of possible unlawful activity; (10) it is
                        necessary for us to provide it to our attorneys,
                        accountants, regulators, auditors or other advisors; or
                        (11) it is otherwise necessary for us to disclose it as
                        required or permitted by law. We use various web site
                        analytics tools and technologies regarding activities on
                        our web sites that require storage of web session data.
                        The overall aim of these tools is to aid in making our
                        web sites easy to use, to proactively identify and
                        correct error conditions and to provide more relevant
                        advertising and content to you. These tools and
                        technologies are also used to assist web site visitors
                        who report problems in the use of our web sites. Stored
                        web session data is used in accordance with this privacy
                        policy.
                        <h4>
                          Disclosure of Personally Identifiable Information to
                          Third Parties
                        </h4>
                        Adventurer does not sell, rent, or lease its customer
                        lists or the identity of individual customers to third
                        parties. Adventurer may, from time to time, contact you
                        on behalf of external business partners about a
                        particular offering that may be of interest to you. In
                        those cases, your unique personally identifiable
                        information is not transferred to the third party.
                        Adventurer may share personally identifiable information
                        with trusted partners to help us perform statistical
                        analysis, send you email or postal mail, provide
                        customer support, or arrange for deliveries. All such
                        third parties are contractually prohibited from using
                        personally identifiable information provided by
                        Adventurer except to provide these services to
                        Adventurer, and they are required to maintain the
                        confidentiality of your information with equal or
                        greater protections than those provided by Adventurer.
                        Adventurer shall not use or disclose sensitive
                        personally identifiable information, such as race,
                        religion, or political affiliations to any entity,
                        except as required by statute, regulation, or order of a
                        government tribunal, without your express consent.
                        Adventurer will disclose your personally identifiable
                        information, without notice, only if required to do so
                        by law or in the good faith belief that such action is
                        necessary to: (a) conform to the edicts of the law or
                        comply with legal process served on Adventurer or the
                        System; (b) protect and defend the rights or property of
                        Adventurer; and, (c) act under exigent circumstances to
                        protect the personal safety of users of Adventurer or
                        the public. Additionally, with respect to personally
                        identifiable information of third parties provided to us
                        by you via the System, we do not share such information
                        with any other users of the System or third parties,
                        unless (i) you expressly authorize us to do so, or (ii)
                        we are required to do so by operation of law or
                        regulatory requirement.
                        <h4>Use of Cookies</h4>
                        The System use cookie technology to help you personalize
                        your online experience. A "cookie" is a text file that
                        is placed on your hard disk by a web page server.
                        Cookies cannot be used to run programs or deliver
                        viruses to your computer. Cookies are uniquely assigned
                        to you, and can only be read by a web server in the
                        domain that issued the cookie to you. One of the primary
                        purposes of cookies is to provide a convenience feature
                        to save you time. The purpose of a cookie is to alert a
                        web server that you have returned to a specific page.
                        For example, if you personalize Adventurer pages, or
                        register with Adventurer sites or services, a cookie
                        helps Adventurer to recall your specific information on
                        subsequent visits. This simplifies the process of
                        recording your personally identifiable information, such
                        as billing addresses, shipping addresses, and so on.
                        When you return to the same System, the information you
                        previously provided can be retrieved, so you can easily
                        use the Adventurer features that you customized. You
                        have the ability to accept or decline cookies. Most web
                        browsers automatically accept cookies, but you can
                        usually modify your browser setting to decline cookies
                        if you prefer. If you choose to decline cookies, you may
                        not be able to fully experience the interactive features
                        of the Adventurer services or web sites you visit.
                        <h4>
                          Security of your Personally Identifiable Information
                        </h4>
                        Adventurer secures your personally identifiable
                        information, and the personally identifiable information
                        of others, from unauthorized access, use or disclosure.
                        Adventurer secures such personally identifiable
                        information you provide on computer servers in a
                        controlled, secure environment, protected from
                        unauthorized access, use or disclosure. When personally
                        identifiable information is transmitted to other web
                        sites, it is protected through the use of encryption,
                        such as the Secure Socket Layer (SSL) protocol.
                        <h4>Communications With Adventurer.</h4>
                        We appreciate your questions and comments about the
                        System and Services and welcome your messages to
                        recipients listed on the System including messages or
                        emails provided to our customer support. We will share
                        your communications with those within our organization
                        who are most capable of addressing the issues contained
                        in your message. We may archive your message for a
                        certain period of time or discard it, but your e-mail
                        address and e-mail will only be used in accordance with
                        this Policy.
                        <h4>Promotions and Advertisements.</h4>
                        We may send you e-mails or other communications and
                        third party advertisements with promotional offers if
                        you opt-in to receiving such communications or
                        advertisements. If you would no longer like to receive
                        special promotion information, advertisements, or other
                        messages from us or third party advertisers, please
                        email at contact@adventurer-app.com , follow the
                        "Unsubscribe" instructions on such messages, or update
                        your setting and preferences on the System. Please allow
                        us a reasonable period of time in order to satisfy your
                        request, as some advertising campaigns or promotions may
                        already be in process at the time you request to no
                        longer be sent such advertisements or promotions.
                        <h4>Social Media Platforms and Web sites.</h4>
                        By visiting any of our pages that are contained on a
                        social media platform or web site, you are representing
                        and warranting to us that you have reviewed the
                        applicable privacy policy and terms of use of such
                        platform or web site and that you will abide by all such
                        provisions contained therein. Adventurer offers
                        social-type features on the System , please be aware
                        that these areas may allow you to publicly post, and
                        share with other users, certain messages, content, or
                        other information (e.g., profile updates and
                        information, job postings, pictures, requests for
                        information from other users, recommendations, etc.).
                        Although we may take certain precautions to protect
                        those who use these areas of the System, we encourage
                        you to be wary of giving out any personally identifiable
                        information, or any personally identifiable information
                        of others to which you may have access, in such forums.
                        The information you post can be collected and used by
                        people you don't know. We cannot guarantee the privacy
                        and safety of these areas and are therefore not
                        responsible for any information you choose to post. Your
                        use of these features is fully at your own risk.
                        <h4>Special Policy for Job Applicants.</h4>
                        Any personally identifiable information that you provide
                        to us when applying for a career position with us will
                        be used solely to consider and act upon your
                        application. We may retain your personally identifiable
                        information for a period of time, but only for as long
                        as necessary for such purposes or as otherwise required
                        or permitted by law. We may disclose your personally
                        identifiable information to our agents for the purpose
                        of evaluating your qualifications for the particular
                        position you applied for, for other available positions
                        or as otherwise required by law. We may also disclose
                        your personally identifiable information to third
                        parties hired by us to collect, maintain, and analyze
                        candidates for career positions or as otherwise required
                        by law.
                        <h4>No Information Collected from Children</h4>
                        Adventurer will never ask for or knowingly collect
                        information from children. We are strongly committed to
                        preserving online privacy for all of our web site
                        visitors, including children. We do not knowingly
                        collect information about children or sell products to
                        children. Consistent with the Children's Online Privacy
                        Protection Act, we will not knowingly collect any
                        information from children under the age of 13.
                        Furthermore, we may restrict entries to any contests,
                        sweepstakes or promotions to entrants who are at least
                        18 years of age.
                        <h4>Changes to this Policy</h4>
                        We may change this Policy at any time and from time to
                        time. The most recent version of the Policy is reflected
                        by the version date located at the bottom of this
                        Policy. If we make any material changes to our Policy,
                        those changes will apply to the personally identifiable
                        information collected after the effective date listed on
                        the Policy, and we will notify you by placing a notice
                        on the System prior to the change becoming effective. We
                        encourage all users to periodically review this Policy
                        for the latest information on our privacy practices. We
                        treat the data of everyone who uses the System in
                        accordance with this Policy, whatever their Do-Not-Track
                        setting or use of any other mechanism that provides them
                        with the ability to exercise choice about the collection
                        of their personally identifiable information. We give
                        you choices about turning off tailored advertising,
                        sharing your information with third parties, and
                        receiving promotional offers. You can exercise your
                        choices by emailing us at contact@adventurer-app.com,
                        following the "Unsubscribe" instructions on promotional
                        messages, or updating your setting and preferences on
                        the System.
                        <h4>Contact Information</h4>
                        Adventurer welcomes your comments regarding this Policy.
                        If you believe that Adventurer has not adhered to this
                        Policy, please contact Adventurer at
                        contact@adventurer-app.com. We will use reasonable
                        efforts to promptly determine and remedy the problem.
                      </div>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridContainer>
          </div>
        </div>
        <FooterBar />
      </div>
    );
  }
}

PrivatePolicy1.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(
  withStyles(signupPageStyle)(PrivatePolicy1)
);
