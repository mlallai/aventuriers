import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Search from "@material-ui/icons/Search";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";

import { Link } from "react-router-dom";
import slugify from "slugify";

class SearchCompo extends Component {
  state = {
    mainActivity: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    console.log("this.state.category", this.state.mainActivity);
  };

  mainActivitySelected = event => {
    this.setState(() => {
      return {
        mainActivity: event.target.value
      };
    });
  };

  render() {
    const { classes, ...rest } = this.props;

    const mainActivityItems = [
      {
        name: "Alpinisme"
      },
      {
        name: "Canyoning"
      },
      {
        name: "Cyclisme"
      },
      {
        name: "Equitation"
      },
      {
        name: "Escalade"
      },
      {
        name: "Canoë-kayak"
      },
      {
        name: "Kitesurf"
      },
      {
        name: "Paddle"
      },
      {
        name: "Parachute"
      },
      {
        name: "Parapente"
      },
      {
        name: "Planche à voile"
      },
      {
        name: "Plongée"
      },
      {
        name: "Randonnée"
      },
      {
        name: "Ski"
      },
      {
        name: "Ski de fond"
      },
      {
        name: "Ski de randonnée"
      },
      {
        name: "Snowboard"
      },
      {
        name: "Surf"
      },
      {
        name: "Trail"
      },
      {
        name: "Trek"
      },
      {
        name: "Voile"
      },
      {
        name: "Voyage à cheval"
      },
      {
        name: "Voyage à pied"
      },
      {
        name: "Voyage à vélo"
      },
      {
        name: "VTT"
      },
      {
        name: "Wakeboard"
      }
    ];

    return (
      <div>
        <GridContainer style={{}}>
          <GridItem
            xs={12}
            sm={10}
            md={5}
            lg={5}
            style={{ marginBottom: "10px" }}
          >
            <form onValidate onSubmit={this.onSubmit}>
              {/* Choix du sport */}
              <Paper
                className={classes.root}
                elevation={1}
                style={{ paddingLeft: "10px" }}
              >
                {/* <IconButton className={classes.iconButton} aria-label="Menu">
                <MenuIcon />
              </IconButton> */}
                <InputBase
                  className={classes.input}
                  placeholder="Recherchez un sport, lieu ou pays..."
                  name="mainActivity"
                  value={this.state.mainActivity}
                  onChange={this.onChange}
                  style={{ minWidth: "260px", fontWeight: "bold" }}
                />
                <IconButton
                  className={classes.iconButton}
                  aria-label="Search"
                  type="submit"
                >
                  <Link
                    to={`/adventures/${slugify(
                      this.state.mainActivity
                    ).toLowerCase()}`}
                    style={{ color: "#ffcc00" }}
                  >
                    <SearchIcon
                      style={{ fontSize: "30px", fontWeight: "bold" }}
                    />
                  </Link>
                </IconButton>
                {/* <Divider className={classes.divider} /> */}
                {/* <IconButton
                color="primary"
                className={classes.iconButton}
                aria-label="Directions"
              >
                <DirectionsIcon />
              </IconButton> */}
              </Paper>
              {/* <FormControl
                fullWidth
                className={classes.selectFormControl}
                style={{
                  //   color: "#fff",
                  width: "200px"
                  // border: "1px solid #ffffff",
                  // borderRadius: "20px"
                }}
              >
                <GridContainer>
                  <GridItem xs={9}>
                    <InputLabel
                      htmlFor="simple-select"
                      className={classes.selectLabel}
                      style={{
                        fontSize: "14px",
                        // color: "#fff",
                        justifyContent: "middle",
                        textAlign: "center"
                      }}
                    >
                      <span
                        style={{
                          //    color: "#ffffff",
                          textAlign: "center"
                        }}
                      >
                        Rechercher un sport
                      </span>
                    </InputLabel>
                    <Select
                      MenuProps={{
                        className: classes.selectMenu
                      }}
                      classes={{
                        select: classes.select
                      }}
                      style={{
                        fontSize: "14px"
                        //   color: "#fff"
                      }}
                      value={this.state.mainActivity}
                      onChange={this.mainActivitySelected}
                    >
                      {mainActivityItems.map(item => (
                        <MenuItem
                          value={item.name}
                          key={item.name}
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          style={{ fontSize: "12px" }}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </GridItem>
                  <GridItem xs={3} style={{}}>
                    <Button color="warning" justIcon round type="submit">
                      <Link to={`/adventures/${this.state.mainActivity}`}>
                        <Search
                          style={{
                            // color: "#fff",
                            fontSize: "30px",
                            bottom: "0"
                          }}
                        />
                      </Link>
                    </Button>
                  </GridItem>
                </GridContainer>
              </FormControl> */}
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
export default withStyles(signupPageStyle)(SearchCompo);
