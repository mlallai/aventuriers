import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { getAdventures } from "../../actions/adventureActions";
import SportFilter from "./SportFilter";
import LevelFilter from "./LevelFilter";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import FooterBar from "views/Footer/FooterBar.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

// sections for this page

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Info from "components/Typography/Info.jsx";

import HeaderLinksAuth from "components/Header/HeaderLinksAuth.jsx";
import Spinner from "components/common/Spinner.js";
import Accordion from "components/Accordion/Accordion.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Badge from "components/Badge/Badge.jsx";

import EcoBadge from "assets/img/logos/EcoBadge.png";

import blogPostsPageStyle from "assets/jss/material-kit-pro-react/views/blogPostsPageStyle.jsx";

const dashboardRoutes = [];

class Adventures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedAdventures: [],
      searchTerm: "",
      searchLoading: false,
      searchResults: []
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    const { filters } = this.props;
    this.handleGetAdventures(filters);
    console.log("this.props.match.params", this.props.match.params);
    // if (this.props.match.params.mainActivity) {
    //   this.setState(
    //     {
    //       searchTerm: this.props.match.params.mainActivity,
    //       searchLoading: true
    //     },
    //     () => this.handleSearchAdventures()
    //   );
    // }
  }

  componentWillReceiveProps(nextProps) {
    const { filters: nextFilters, params: nextParams } = nextProps;
    const { adventure } = nextProps;
    let loadedAdventures;
    if (adventure.adventures) {
      loadedAdventures = adventure.adventures;
      this.setState({ loadedAdventures: loadedAdventures });
    }
    if (nextFilters !== this.props.filters) {
      this.handleGetAdventures(nextFilters);

      if (Object.keys(nextFilters).length === 0) {
        const loadedAdventures = nextProps.adventure.adventures;
        this.handleGetAdventures(nextFilters);
        this.setState({
          loadedAdventures
        });
      }
    }

    if (this.props.match.params) {
      this.setState(
        {
          searchTerm: this.props.match.params.mainActivity,
          searchLoading: true
        },
        () => this.handleSearchAdventures()
      );
    }
  }

  handleSearchChange = event => {
    this.setState(
      {
        searchTerm: event.target.value,
        searchLoading: true
      },
      () => this.handleSearchAdventures()
    );
  };

  handleSearchAdventures = () => {
    const channelAdventures = [...this.state.loadedAdventures];
    const regex = new RegExp(this.state.searchTerm, "gi");
    const searchResults = channelAdventures.reduce((acc, adventure) => {
      if (
        (adventure.title && adventure.title.match(regex)) ||
        (adventure.summary && adventure.summary.match(regex)) ||
        (adventure.location && adventure.location.match(regex)) ||
        (adventure.mainActivity[0] && adventure.mainActivity[0].match(regex)) ||
        (adventure.country && adventure.country.match(regex))
      ) {
        acc.push(adventure);
      }
      return acc;
    }, []);
    this.setState({ searchResults });
    setTimeout(() => this.setState({ searchLoading: false }), 1000);
  };

  handleGetAdventures = (filters = this.props.filters) => {
    // this.setState({ loading: true });
    // this.props.getAdventures(filters, () => {
    //   this.setState({ loading: false });
    // });
    this.props.getAdventures(filters);
  };

  render() {
    const { classes, ...rest } = this.props;
    const { loadedAdventures, loading, searchTerm, searchResults } = this.state;
    // const { adventures, loading } = this.props.adventures;
    const { isAuthenticated } = this.props.auth;

    let adventureItems;
    if (loadedAdventures === null || loading) {
      adventureItems = (
        <h4>
          <Spinner />
        </h4>
      );
    } else if (!this.state.searchTerm) {
      adventureItems = loadedAdventures.map(adv => (
        <GridItem xs={12} sm={6} md={4}>
          <Card plain blog>
            <div>
              <CardHeader
                plain
                image
                style={{ position: "relative", textAlign: "center" }}
              >
                <div style={{ width: "100%" }}>
                  <Link to={`/adventure/${adv._id}`}>
                    {adv.pictures[0] ? (
                      <img src={adv.pictures[0]} alt="..." />
                    ) : (
                      <img
                        style={{ minHeight: "170px" }}
                        src={adv.defaultPictures[0]}
                        alt="..."
                      />
                    )}
                  </Link>
                </div>
                <div style={{ position: "absolute", top: "0px", left: "2px" }}>
                  <GridContainer>
                    <GridItem xs={6}>
                      {adv.from ? (
                        <Badge color="warning">
                          <span style={{ color: "black" }}>
                            <Moment format={"DD/MM/YY"}>{adv.from}</Moment>
                          </span>
                        </Badge>
                      ) : (
                        <Badge color="warning">
                          <span style={{ color: "black" }}>A DEFINIR</span>
                        </Badge>
                      )}
                    </GridItem>
                    <GridItem xs={6}>
                      {adv.ecoLabel.length > 0 ? (
                        <img
                          style={{ width: "25px" }}
                          src={EcoBadge}
                          alt="..."
                        />
                      ) : (
                        ""
                      )}
                    </GridItem>
                  </GridContainer>
                  {/* <GridContainer>
                          <GridItem xs={12}>
                            <span style={{color: '#ffffff', textTransform: 'uppercase', fontSize: '10px', fontWeight: 'bold'}}>Niveau {adv.level}</span>
                          </GridItem>
                          </GridContainer> */}
                  <GridContainer>
                    <GridItem xs={12}>
                      {adv.recurring ? (
                        <Badge color="info">
                          <span style={{ color: "#ffffff" }}>
                            ACTIVITE RECURRENTE
                          </span>
                        </Badge>
                      ) : (
                        ""
                      )}
                    </GridItem>
                  </GridContainer>
                </div>
              </CardHeader>
            </div>
            <CardBody plain>
              <Info>
                <h6 className={classes.cardCategory}>
                  {adv.mainActivity} - {adv.location}
                  <br />
                  <span style={{ color: "#9c27b0" }}>Niveau {adv.level}</span>
                </h6>
              </Info>

              <Link
                to={`/adventure/${adv._id}`}
                onClick={e => e.preventDefault()}
              >
                <h3
                  style={{
                    fontSize: "1.4em",
                    color: "#3C4858",
                    marginTop: "0",
                    marginBottom: "0",
                    minHeight: "65px"
                  }}
                  className={classes.cardTitle}
                >
                  {adv.title}
                </h3>
              </Link>
              {/* {adv.summary ?
                          <div>
                            <p style={{marginBottom: '0', height: '50px', overflow: 'scroll'}} className={classes.description}>
                            {adv.summary}
                            </p>
                          </div>
                          : ''} */}
              <div>
                <Link style={{ color: "black" }} to={`/adventure/${adv._id}`}>
                  {" "}
                  <Button color="warning" size="sm">
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      Voir
                    </span>
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      ));
    } else {
      adventureItems = searchResults.map(result => (
        <GridItem xs={12} sm={6} md={4}>
          <Card plain blog>
            <div>
              <CardHeader
                plain
                image
                style={{ position: "relative", textAlign: "center" }}
              >
                <div style={{ width: "100%" }}>
                  <Link to={`/adventure/${result._id}`}>
                    {result.pictures[0] ? (
                      <img src={result.pictures[0]} alt="..." />
                    ) : (
                      <img
                        style={{ minHeight: "170px" }}
                        src={result.defaultPictures[0]}
                        alt="..."
                      />
                    )}
                  </Link>
                </div>
                <div style={{ position: "absolute", top: "0px", left: "2px" }}>
                  <GridContainer>
                    <GridItem xs={6}>
                      {result.from ? (
                        <Badge color="warning">
                          <span style={{ color: "black" }}>
                            <Moment format={"DD/MM/YY"}>{result.from}</Moment>
                          </span>
                        </Badge>
                      ) : (
                        <Badge color="warning">
                          <span style={{ color: "black" }}>A DEFINIR</span>
                        </Badge>
                      )}
                    </GridItem>
                    <GridItem xs={6}>
                      {result.ecoLabel.length > 0 ? (
                        <img
                          style={{ width: "25px" }}
                          src={EcoBadge}
                          alt="..."
                        />
                      ) : (
                        ""
                      )}
                    </GridItem>
                  </GridContainer>
                  {/* <GridContainer>
                          <GridItem xs={12}>
                            <span style={{color: '#ffffff', textTransform: 'uppercase', fontSize: '10px', fontWeight: 'bold'}}>Niveau {adv.level}</span>
                          </GridItem>
                          </GridContainer> */}
                  <GridContainer>
                    <GridItem xs={12}>
                      {result.recurring ? (
                        <Badge color="info">
                          <span style={{ color: "#ffffff" }}>
                            ACTIVITE RECURRENTE
                          </span>
                        </Badge>
                      ) : (
                        ""
                      )}
                    </GridItem>
                  </GridContainer>
                </div>
              </CardHeader>
            </div>
            <CardBody plain>
              <Info>
                <h6 className={classes.cardCategory}>
                  {result.mainActivity} - {result.location}
                  <br />
                  <span style={{ color: "#9c27b0" }}>
                    Niveau {result.level}
                  </span>
                </h6>
              </Info>

              <Link
                to={`/adventure/${result._id}`}
                onClick={e => e.preventDefault()}
              >
                <h3
                  style={{
                    fontSize: "1.4em",
                    color: "#3C4858",
                    marginTop: "0",
                    marginBottom: "0",
                    minHeight: "65px"
                  }}
                  className={classes.cardTitle}
                >
                  {result.title}
                </h3>
              </Link>
              {/* {adv.summary ?
                          <div>
                            <p style={{marginBottom: '0', height: '50px', overflow: 'scroll'}} className={classes.description}>
                            {adv.summary}
                            </p>
                          </div>
                          : ''} */}
              <div>
                <Link
                  style={{ color: "black" }}
                  to={`/adventure/${result._id}`}
                >
                  {" "}
                  <Button color="warning" size="sm">
                    <span style={{ color: "black", fontWeight: "bold" }}>
                      Voir
                    </span>
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      ));
    }
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
        <Parallax
          image={require("assets/img/mountain.jpg")}
          filter="dark"
          small
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.textCenter}>
                <h2 className={classes.title}>
                  Ne manquez plus votre prochaine sortie outdoor.
                </h2>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classes.main}>
          <div style={{ width: "90%" }} className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
                <GridContainer
                  style={{
                    justifyContent: "center",
                    padding: "10px",
                    marginLeft: "10px",
                    marginTop: "50px",
                    border: "1px solid rgba(232, 236, 241, 1)",
                    borderRadius: "8px"
                  }}
                >
                  <h3 style={{ fontWeight: "bold", textAlign: "center" }}>
                    Filtres
                  </h3>
                  <CustomInput
                    formControlProps={{
                      fullWidth: true,
                      className: classes.customFormControlClasses
                    }}
                    inputProps={{
                      placeholder: "Recherche libre",
                      onChange: this.handleSearchChange,
                      name: "searchTerm"
                    }}
                  />
                  <Accordion
                    active={1}
                    activeColor="info"
                    collapses={[
                      {
                        title: "Filtre par sport",
                        content: <SportFilter />
                      }
                    ]}
                  />
                  <Accordion
                    active={1}
                    activeColor="info"
                    collapses={[
                      {
                        title: "Filtre par niveau",
                        content: <LevelFilter />
                      }
                    ]}
                  />
                </GridContainer>
                {/* <GridContainer>
                <Accordion
                  active={1}
                  activeColor="rose"
                  collapses={[
                    {
                      title: "Type d'activité",
                      content: <RecurringFilter />
                    }
                  ]}
                />
                </GridContainer> */}
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <GridContainer>{adventureItems}</GridContainer>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <FooterBar />
      </div>
    );
  }
}

Adventures.propTypes = {
  auth: PropTypes.object.isRequired,
  getAdventures: PropTypes.func.isRequired,
  adventure: PropTypes.object.isRequired,
  filters: PropTypes.array
};
const mapStateToProps = state => ({
  auth: state.auth,
  adventure: state.adventure,
  filters: state.filters.items
});

export default connect(
  mapStateToProps,
  { getAdventures }
)(withStyles(blogPostsPageStyle)(Adventures));
