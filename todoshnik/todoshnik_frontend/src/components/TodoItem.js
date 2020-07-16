import React, { Component } from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

import { getColor } from "../utils";
import { axiosInstance } from "../axios";

export class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({ data: this.props.data });
        }
    }

    async handleToggle() {
        const data = this.state.data;
        data.completed = !data.completed;

        try {
            await axiosInstance.put(`/todo_items/${data.id}/`, data).then((response) => {
                this.setState({ data: response.data });
            });
        } catch (errorMsg) {
            console.log(errorMsg);
        }
    }

    async handleDelete() {
        try {
            await axiosInstance.delete(`/todo_items/${this.state.data.id}/`);
            this.props.updateContent();
        } catch (errorMsg) {
            console.log(errorMsg);
        }
    }

    handleClick() {
        this.props.editTodoItem(this.state.data);
    }

    render() {
        const { title, description, completed, completion_date } = this.state.data;

        if (description && completion_date) {
            var secondaryText = `${description}: ${completion_date}`;
        } else if (description) {
            var secondaryText = description;
        } else if (completion_date) {
            var secondaryText = completion_date;
        }

        return (
            <ListItem dense button>
                <ListItemIcon>
                    <Checkbox
                        style={{ color: getColor("Bk") }}
                        edge="start"
                        checked={completed}
                        onClick={this.handleToggle}
                        checkedIcon={<DoneIcon />}
                        icon={<RadioButtonUncheckedOutlinedIcon />}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={title}
                    secondary={secondaryText}
                    onClick={this.handleClick}
                />
                <IconButton
                    style={{ color: getColor("Bk") }}
                    edge="end"
                    onClick={this.handleDelete}
                >
                    <DeleteOutlinedIcon />
                </IconButton>
            </ListItem>
        );
    }
}

TodoItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        completion_date: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.oneOf([null]).isRequired,
        ]),
        todo_list: PropTypes.number.isRequired,
    }).isRequired,
    updateContent: PropTypes.func.isRequired,
    editTodoItem: PropTypes.func.isRequired,
};

export default TodoItem;
