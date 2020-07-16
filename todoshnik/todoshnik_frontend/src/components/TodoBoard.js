import React, { Component } from "react";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/core/styles";

import TodoList from "./TodoList";
import { axiosInstance } from "../axios";

const styles = {
    alertBox: {
        marginTop: 10,
    },
};

export class TodoBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoLists: [],
            placeholder: "Loading",
        };

        this.updateTodoLists = this.updateTodoLists.bind(this);
    }

    async updateTodoLists() {
        try {
            await axiosInstance.get("/todo_lists/").then((response) => {
                this.setState({
                    todoLists: response.data,
                    placeholder: "",
                });
            });
        } catch (errorMsg) {
            this.setState({
                placeholder: errorMsg,
            });
        }
    }

    componentDidMount() {
        this.updateTodoLists();
    }

    render() {
        const { todoLists, placeholder } = this.state;
        const { classes } = this.props;
        let display = "flex";

        if (placeholder == "Loading") {
            var severity = "info";
        } else if (placeholder != "") {
            var severity = "error";
        } else {
            display = "none";
        }

        return (
            <div>
                <Alert
                    className={classes.alertBox}
                    style={{ display: display }}
                    severity={severity}
                >
                    {placeholder}
                </Alert>

                {todoLists.length === 0 && placeholder !== "Loading" && (
                    <Alert className={classes.alertBox} severity="info">
                        There is nothing here yet
                    </Alert>
                )}

                {todoLists.map((value) => {
                    return (
                        <TodoList
                            key={value.id}
                            data={value}
                            updateTodoLists={this.updateTodoLists}
                        />
                    );
                })}
            </div>
        );
    }
}

TodoBoard.propTypes = {
    refProp: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any }).isRequired,
    ]),
};

export default withStyles(styles)(TodoBoard);
