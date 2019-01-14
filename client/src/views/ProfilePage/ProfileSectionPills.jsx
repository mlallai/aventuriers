import React from "react";
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import pillsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/pillsStyle.jsx";

class ProfileSectionPills extends React.Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { classes } = this.props;
    const { isAuthenticated, user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    return (
      // <div className={classes.section}>
        <div className={classes.container}>
          <div id="navigation-pills">
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} lg={12}>
                {/* <h3>
                  <small>Horizontal tabs</small>
                </h3> */}
                <NavPills
                  color="rose"
                  tabs={[
                    {
                      tabButton: "Mon profil",
                      tabContent: (
                        <span>
                          <p>
                            Prénom : {user.firstName}
                          </p>
                          <p>
                            Nom : {user.lastName}
                          </p>
                          <p>
                            Email : {user.email}
                          </p>
                        </span>
                      )
                    },
                    {
                      tabButton: "Mes expériences",
                      tabContent: (
                        <span>
                          <p>
                            Efficiently unleash cross-media information without
                            cross-media value. Quickly maximize timely
                            deliverables for real-time schemas.{" "}
                          </p>
                          <br />
                          <p>
                            Dramatically maintain clicks-and-mortar solutions
                            without functional solutions.
                          </p>
                        </span>
                      )
                    },
                    {
                      tabButton: "Options",
                      tabContent: (
                        <span>
                          <p>
                            Completely synergize resource taxing relationships
                            via premier niche markets. Professionally cultivate
                            one-to-one customer service with robust ideas.{" "}
                          </p>
                          <br />
                          <p>
                            Dynamically innovate resource-leveling customer
                            service for state of the art customer service.
                          </p>
                        </span>
                      )
                    }
                  ]}
                />
              </GridItem>
              {/* <GridItem xs={12} sm={12} md={6} lg={6}>
                <h3>
                  <small>Vertical tabs</small>
                </h3>
                <NavPills
                  horizontal={{
                    tabsGrid: { xs: 12, sm: 4, md: 5 },
                    contentGrid: { xs: 12, sm: 8, md: 7 }
                  }}
                  color="rose"
                  tabs={[
                    {
                      tabButton: "Profile",
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.{" "}
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI.
                          </p>
                        </span>
                      )
                    },
                    {
                      tabButton: "Settings",
                      tabContent: (
                        <span>
                          <p>
                            Efficiently unleash cross-media information without
                            cross-media value. Quickly maximize timely
                            deliverables for real-time schemas.{" "}
                          </p>
                          <br />
                          <p>
                            Dramatically maintain clicks-and-mortar solutions
                            without functional solutions.
                          </p>
                        </span>
                      )
                    },
                    {
                      tabButton: "Options",
                      tabContent: (
                        <span>
                          <p>
                            Completely synergize resource taxing relationships
                            via premier niche markets. Professionally cultivate
                            one-to-one customer service with robust ideas.{" "}
                          </p>
                          <br />
                          <p>
                            Dynamically innovate resource-leveling customer
                            service for state of the art customer service.
                          </p>
                        </span>
                      )
                    }
                  ]}
                />
              </GridItem> */}
            </GridContainer>
            {/* <div className={classes.title}>
              <h3>
                <small>With Icons</small>
              </h3>
            </div>
            <GridContainer>
              <GridItem xs={12} sm={12} md={8} lg={6}>
                <NavPills
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Dashboard",
                      tabIcon: Dashboard,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                        </span>
                      )
                    },
                    {
                      tabButton: "Schedule",
                      tabIcon: Schedule,
                      tabContent: (
                        <span>
                          <p>
                            Efficiently unleash cross-media information without
                            cross-media value. Quickly maximize timely
                            deliverables for real-time schemas.
                          </p>
                          <br />
                          <p>
                            Dramatically maintain clicks-and-mortar solutions
                            without functional solutions. Dramatically visualize
                            customer directed convergence without revolutionary
                            ROI. Collaboratively administrate empowered markets
                            via plug-and-play networks. Dynamically
                            procrastinate B2C users after installed base
                            benefits.
                          </p>
                        </span>
                      )
                    },
                    {
                      tabButton: "Tasks",
                      tabIcon: List,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                        </span>
                      )
                    }
                  ]}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={8} lg={6}>
                <NavPills
                  color="primary"
                  horizontal={{
                    tabsGrid: { xs: 12, sm: 3, md: 4 },
                    contentGrid: { xs: 12, sm: 9, md: 8 }
                  }}
                  tabs={[
                    {
                      tabButton: "Dashboard",
                      tabIcon: Dashboard,
                      tabContent: (
                        <span>
                          <p>
                            Collaboratively administrate empowered markets via
                            plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                          <br />
                          <p>
                            Dramatically visualize customer directed convergence
                            without revolutionary ROI. Collaboratively
                            administrate empowered markets via plug-and-play
                            networks. Dynamically procrastinate B2C users after
                            installed base benefits.
                          </p>
                        </span>
                      )
                    },
                    {
                      tabButton: "Schedule",
                      tabIcon: Schedule,
                      tabContent: (
                        <span>
                          <p>
                            Efficiently unleash cross-media information without
                            cross-media value. Quickly maximize timely
                            deliverables for real-time schemas.
                          </p>
                          <br />
                          <p>
                            Dramatically maintain clicks-and-mortar solutions
                            without functional solutions. Dramatically visualize
                            customer directed convergence without revolutionary
                            ROI. Collaboratively administrate empowered markets
                            via plug-and-play networks. Dynamically
                            procrastinate B2C users after installed base
                            benefits.
                          </p>
                        </span>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer> */}
          </div>
        </div>
      // </div>
    );
  }
}

ProfileSectionPills.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,   
}
const mapStateToProps = (state) => ({
profile: state.profile,
auth: state.auth,
})

export default connect(mapStateToProps, { getCurrentProfile }) (withStyles(pillsStyle)(ProfileSectionPills));
