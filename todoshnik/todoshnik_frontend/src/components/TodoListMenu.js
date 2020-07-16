import React, { Component } from "react";
import PropTypes from "prop-types";
import { IconButton, Menu, MenuItem, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const styles = {
    divider: {
        margin: "5px 0",
    },
};

export class TodoListMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            anchorEl: null,
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose(method = null) {
        this.setState({ anchorEl: null });

        if (typeof method === "function") {
            method();
        }
    }

    render() {
        const { id, anchorEl } = this.state;
        const { classes } = this.props;

        return (
            <div className="actions-menu">
                <IconButton
                    aria-label="settings"
                    aria-controls={`todo-list-actions-${id}`}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreVertIcon />
                </IconButton>

                <Menu
                    id={`todo-list-actions-${id}`}
                    anchorEl={anchorEl}
                    keepMounted
                    onClose={this.handleClose}
                    open={Boolean(anchorEl)}
                >
                    <MenuItem onClick={() => this.handleClose(this.props.createTodoItem)}>
                        Add new item
                    </MenuItem>

                    <Divider className={classes.divider} />

                    <MenuItem onClick={() => this.handleClose(this.props.editTodoList)}>
                        Edit
                    </MenuItem>

                    <MenuItem onClick={() => this.handleClose(this.props.deleteTodoList)}>
                        Delete
                    </MenuItem>

                    <Divider className={classes.divider} />

                    <MenuItem
                        onClick={() => this.handleClose(this.props.markAllItemsDone)}
                    >
                        Mark all done
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

TodoListMenu.propTypes = {
    id: PropTypes.number.isRequired,
    createTodoItem: PropTypes.func.isRequired,
    editTodoList: PropTypes.func.isRequired,
    deleteTodoList: PropTypes.func.isRequired,
    markAllItemsDone: PropTypes.func.isRequired,
};

export default withStyles(styles)(TodoListMenu);
