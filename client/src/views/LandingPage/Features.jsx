import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import GroupWork from "@material-ui/icons/GroupWork";
import Airplay from "@material-ui/icons/Airplay";
import LocationOn from "@material-ui/icons/LocationOn";
import Extension from "@material-ui/icons/Extension";
import ChildFriendly from "@material-ui/icons/ChildFriendly";
import WatchLater from "@material-ui/icons/WatchLater";
import Code from "@material-ui/icons/Code";
import FormatPaint from "@material-ui/icons/FormatPaint";
import Dashboard from "@material-ui/icons/Dashboard";
import ViewCarousel from "@material-ui/icons/ViewCarousel";
import AccessTime from "@material-ui/icons/AccessTime";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Mood from "@material-ui/icons/Mood";
import ImageSearch from "@material-ui/icons/ImageSearch";
import Description from "@material-ui/icons/Description";


// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import featuresStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/featuresStyle.jsx";

import iphone from "assets/img/sections/iphone.png";
import iphone2 from "assets/img/sections/iphone2.png";
import bg9 from "assets/img/bg9.jpg";
import view from "assets/img/examples/view.jpg";


function Features({ ...props }) {
  const { classes, ...rest } = props;
  return (
    <div className="cd-section" {...rest}>
      <div className={classes.container}>
        {/* Feature 3 START */}
        <div className={classes.features3}>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
            <Card
                raised
                background
                style={{ height: '500px', backgroundImage: `url(${view})` }}
              >
                <CardBody background>
                  {/* <a href="#" onClick={e => e.preventDefault()}>
                    <h2 style={{color: 'white'}}className={classes.cardTitleWhite}>
                      ADVENTURIER
                    </h2>
                  </a> */}
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
              <h2 className={classes.title}>Trouvez votre partenaire de cordée</h2>
              <InfoArea
                className={classes.infoArea}
                icon={Mood}
                title="Trouvez des équipiers"
                description="Faites connaître votre prochaine aventure pour trouver des compagnons de route."
                iconColor="info"
              />
              <InfoArea
                className={classes.infoArea}
                icon={ImageSearch}
                title="Cherchez une aventure"
                description="Recherchez votre prochaine aventure parmi les annonces."
                iconColor="info"
              />
              <InfoArea
                className={classes.infoArea}
                icon={Description}
                title="Inspirez-vous"
                description="Des idées de parcours et de projets dans toutes les disciplines, pour tous les niveaux."
                iconColor="info"
              />
            </GridItem>
          </GridContainer>
        </div>
        {/* Feature 3 END */}
    </div>
    </div>
  );
}

export default withStyles(featuresStyle)(Features);
