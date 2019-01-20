import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui icons
import Mail from "@material-ui/icons/Mail";

import mountainAdv from "assets/img/examples/mountainAdv.jpeg";

import styles from "assets/jss/material-kit-pro-react/views/componentsSections/preFooter.jsx";

const SectionPreFooter = props => {
  const { classes } = props;
  return (
    <div>
      <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />{" "}
      <meta name="viewport" content="width=device-width, initial-scale=1" />{" "}
      <br />
      <br />
      <div
        className={classNames(
          classes.subscribeLine,
          classes.subscribeLineImage
        )}
        style={{ backgroundImage: `url(${mountainAdv})` }}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              xs={12}
              sm={6}
              md={6}
              className={classNames(classes.mlAuto, classes.mrAuto)}
            >
              <div className={classes.textCenter}>
                <h3 className={classes.title}>
                  Inscrivez-vous à notre newsletter
                </h3>
                <p className={classes.description}>
                  Recevez notre newsletter bourrée de bons plans toutes les
                  semaines
                </p>
              </div>
              <Card raised className={classes.card}>
                <CardBody className={classes.cardBody}>
                  <form>
                    <GridContainer>
                      <GridItem xs={12} sm={6} md={6} lg={8}>
                        <CustomInput
                          id="emailPreFooter"
                          formControlProps={{
                            fullWidth: true,
                            className: classes.cardForm
                          }}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Mail />
                              </InputAdornment>
                            ),
                            placeholder: "Votre email..."
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6} lg={4}>
                        <Button
                          color="warning"
                          block
                          className={classes.subscribeButton}
                        >
                          <span style={{ color: "black", fontWeight: "bold" }}>
                            Envoyer
                          </span>
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </form>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default withStyles(styles)(SectionPreFooter);
