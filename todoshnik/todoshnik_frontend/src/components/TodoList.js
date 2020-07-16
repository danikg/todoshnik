import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";

import TodoItem from "./TodoItem";
import TodoListMenu from "./TodoListMenu";
import TodoListForm from "./TodoListForm";
import TodoItemForm from "./TodoItemForm";
import { getColor } from "../utils";
import ModalFormController from "./ModalFormController";
import { axiosInstance } from "../axios";

const styles = {
    root: {
        margin: "16px 0 16px 0",
    },
    cardHeader: {
        paddingBottom: 5,
    },
    cardContent: {
        paddingTop: 5,
    },
    todoList: {
        padding: "0 0 16px 0",
    },
};

export class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.data.id,
            todoItems: [],
            data: props.data,
            placeholder: "Loading",
        };

        this.mfcTodoList = React.createRef();
        this.mfcTodoItem = React.createRef();

        this.loadTodoList = this.loadTodoList.bind(this);
        this.loadTodoItems = this.loadTodoItems.bind(this);
        this.markAllItemsDone = this.markAllItemsDone.bind(this);
        this.deleteTodoList = this.deleteTodoList.bind(this);
        this.createTodoItem = this.createTodoItem.bind(this);
        this.editTodoList = this.editTodoList.bind(this);
        this.editTodoItem = this.editTodoItem.bind(this);
    }

    componentDidMount() {
        this.loadTodoItems();
    }

    async loadTodoList() {
        try {
            await axiosInstance.get(`/todo_lists/${this.state.id}/`).then((response) => {
                this.setState({
                    data: response.data,
                });
            });
        } catch (errorMsg) {
            this.setState({
                placeholder: errorMsg,
            });
        }
    }

    async loadTodoItems() {
        try {
            await axiosInstance
                .get(`/todo_list_items/${this.state.id}/`)
                .then((response) => {
                    this.setState({
                        todoItems: response.data,
                        placeholder: response.data.length == 0 ? "Nothing to show" : "",
                    });
                });
        } catch (errorMsg) {
            this.setState({
                placeholder: errorMsg,
            });
        }
    }

    async markAllItemsDone() {
        try {
            await axiosInstance
                .put(`/todo_list_items/${this.state.id}/`)
                .then((response) => {
                    this.setState({ todoItems: response.data });
                });
        } catch (errorMsg) {
            this.setState({
                placeholder: errorMsg,
            });
        }
    }

    async deleteTodoList() {
        try {
            await axiosInstance.delete(`/todo_lists/${this.state.id}/`).then(() => {
                this.props.updateTodoLists();
            });
        } catch (errorMsg) {
            console.log(errorMsg);
        }
    }

    createTodoItem(id) {
        this.mfcTodoItem.current.openModal({ todo_list: id }, { header: "todo item" });
    }

    editTodoList(data) {
        this.mfcTodoList.current.openModal(data, { header: "todo list" });
    }

    editTodoItem(data) {
        this.mfcTodoItem.current.openModal(data, { header: "todo item" });
    }

    render() {
        const { classes } = this.props;
        const { name, description, color, date_update } = this.state.data;
        const { id, todoItems, data, placeholder } = this.state;

        return (
            <div>
                <ModalFormController
                    ref={this.mfcTodoList}
                    updateContent={this.loadTodoList}
                >
                    <TodoListForm />
                </ModalFormController>

                <ModalFormController
                    ref={this.mfcTodoItem}
                    updateContent={this.loadTodoItems}
                >
                    <TodoItemForm />
                </ModalFormController>

                <Card
                    variant="outlined"
                    className={classes.root}
                    style={{ backgroundColor: getColor(color) }}
                >
                    <CardHeader
                        className={classes.cardHeader}
                        title={name}
                        subheader={
                            <Typography variant="subtitle1">{description}</Typography>
                        }
                        action={
                            <TodoListMenu
                                id={id}
                                createTodoItem={() => this.createTodoItem(id)}
                                editTodoList={() => this.editTodoList(data)}
                                deleteTodoList={this.deleteTodoList}
                                markAllItemsDone={this.markAllItemsDone}
                            />
                        }
                    />

                    <CardContent className={classes.cardContent}>
                        <Typography variant="caption">{placeholder}</Typography>
                        <List className={classes.todoList}>
                            {todoItems.map((value) => {
                                return (
                                    <TodoItem
                                        key={value.id}
                                        data={value}
                                        updateContent={this.loadTodoItems}
                                        editTodoItem={this.editTodoItem}
                                    />
                                );
                            })}
                        </List>
                        <Typography variant="subtitle2">{date_update}</Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

TodoList.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        date_create: PropTypes.string.isRequired,
        date_update: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        owner: PropTypes.number,
    }).isRequired,
    updateTodoLists: PropTypes.func.isRequired,
};

export default withStyles(styles)(TodoList);
