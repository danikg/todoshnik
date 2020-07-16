import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import { getColor } from "../../utils";

const styles = {
    accountButton: {
        textDecoration: "none",
        color: getColor("Wh"),
        marginLeft: "10px",
    },
};

export class LoginButton extends Component {
    render() {
        const { classes, variant } = this.props;
        const loggedIn = this.props.loggedIn ? this.props.loggedIn : null;
        const btnText = () => {
            return loggedIn ? "Logout" : "Login";
        };

        return (
            <Button color="inherit" variant="outlined" className={classes.accountButton}>
                {variant === "login" ? btnText() : variant === "signup" ? "Sign Up" : ""}
            </Button>
        );
    }
}

LoginButton.propTypes = {
    variant: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool,
};

export default withStyles(styles)(LoginButton);
