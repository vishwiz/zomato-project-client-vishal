import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { NavLink } from "react-router-dom";
import "../componentCss/menu.css";

const styles = {
  list: {
    width: 250
  }
};

class TemporaryDrawer extends React.Component {
  state = {
    top: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button key={"Home"}>
            <NavLink to="/">Home</NavLink>
          </ListItem>

          <ListItem button key={"My Account"}>
            <NavLink to="/profile">My Account</NavLink>
          </ListItem>

          <ListItem button key={"Booking"}>
            <NavLink to="/booking">
              <div className="menu-css">My Booking</div>
            </NavLink>
          </ListItem>
        </List>

        <Divider />
      </div>
    );

    return (
      <div>
        <Button onClick={this.toggleDrawer("left", true)}><div className="menu-Button">Menu</div></Button>

        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TemporaryDrawer);
