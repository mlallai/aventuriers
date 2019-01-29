import React from "react";
import Footer from "components/Footer/Footer.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.jsx";
import Favorite from "@material-ui/icons/Favorite";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";

class FooterBar extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Footer
          content={
            <div>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a href="/" className={classes.block}>
                      Adventurer
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <Link to="/contact" className={classes.block}>
                      Contact
                    </Link>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <Link to="/private-policy" className={classes.block}>
                      Private Policy
                    </Link>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <Link to="/terms" className={classes.block}>
                      Terms
                    </Link>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://medium.com/adventurerapp"
                      target="_blank"
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                </List>
              </div>
              <div className={classes.right} style={{ fontSize: "14px" }}>
                Made with{" "}
                <Favorite
                  className={classes.icon}
                  style={{ color: "#ffcc00" }}
                />{" "}
                by Adventurer© for nature lovers.
                <br />
                All rights reserved, {1900 + new Date().getYear()}.
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(FooterBar);
