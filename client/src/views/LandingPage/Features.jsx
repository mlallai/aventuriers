import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Mood from "@material-ui/icons/Mood";
import ImageSearch from "@material-ui/icons/ImageSearch";
import Description from "@material-ui/icons/Description";


// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import featuresStyle from "assets/jss/material-kit-pro-react/views/sectionsSections/featuresStyle.jsx";

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
