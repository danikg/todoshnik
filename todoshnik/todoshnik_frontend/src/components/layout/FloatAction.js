import React, { Component } from "react";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

import { getColor } from "../../utils";

const styles = {
    fab: {
        position: "fixed",
        bottom: 20,
        right: 20,
        color: getColor("Wh"),
    },
    fabIcon: {
        marginRight: 5,
    },
};

export class FloatAction extends Component {
    render() {
        const { classes, handleOpen } = this.props;

        return (
            <Fab
                className={classes.fab}
                variant="extended"
                style={{ backgroundColor: getColor("Bk") }}
                onClick={handleOpen}
                aria-label="add"
            >
                <AddIcon className={classes.fabIcon} />
                Create
            </Fab>
        );
    }
}

FloatAction.propTypes = {
    handleOpen: PropTypes.func.isRequired,
};

export default withStyles(styles)(FloatAction);
