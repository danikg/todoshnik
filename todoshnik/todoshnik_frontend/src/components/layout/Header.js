import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import LoginButton from "../layout/LoginButton";
import { getColor } from "../../utils";
import Drawer from "./Drawer";

const styles = {
    appBar: {
        backgroundColor: getColor("Bk"),
    },
    link: {
        textDecoration: "none",
        color: getColor("Wh"),
    },
    toolbar: {
        justifyContent: "space-between",
        marginLeft: "auto",
        paddingRight: 0,
    },
};

export class Header extends Component {
    render() {
        const { classes, loggedIn, drawer } = this.props;

        return (
            <AppBar className={classes.appBar} position="sticky">
                <Toolbar>
                    {drawer}

                    <Link to="/" className={classes.link}>
                        <Typography variant="h6">Todoshnik</Typography>
                    </Link>

                    {loggedIn ? (
                        <Toolbar className={classes.toolbar}>
                            <Link to="/login/" className={classes.link}>
                                <LoginButton variant="login" loggedIn={loggedIn} />
                            </Link>
                        </Toolbar>
                    ) : (
                        <Toolbar className={classes.toolbar}>
                            <Link to="/login/" className={classes.link}>
                                <LoginButton variant="login" loggedIn={loggedIn} />
                            </Link>

                            <Link to="/sign-up/" className={classes.link}>
                                <LoginButton variant="signup" />
                            </Link>
                        </Toolbar>
                    )}
                </Toolbar>
            </AppBar>
        );
    }
}

Header.propTypes = {
    drawer: PropTypes.object.isRequired,
    loggedIn: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Header);
