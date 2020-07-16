import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    dialogTitle: {
        paddingBottom: 0,
    },
    dialogBody: {
        paddingTop: 0,
    },
    dialogFooter: {
        padding: "10px 25px 20px 25px",
    },
});

export default function Modal(props) {
    const { open, handleClose, handleSubmit, title, submitButtonText } = props;
    const classes = useStyles();

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle className={classes.dialogTitle} id="form-dialog-title">
                {title}
            </DialogTitle>

            <DialogContent className={classes.dialogBody}>{props.children}</DialogContent>

            <DialogActions className={classes.dialogFooter}>
                <Button onClick={handleClose} variant="outlined" color="primary">
                    Cancel
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                        handleSubmit();
                        handleClose();
                    }}
                >
                    {submitButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    submitButtonText: PropTypes.string.isRequired,
};
