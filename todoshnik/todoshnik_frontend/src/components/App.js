import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";

import Header from "./layout/Header";
import Drawer from "./layout/Drawer";
import TodoBoard from "./TodoBoard";
import ModalFormController from "./ModalFormController";
import TodoListForm from "./TodoListForm";
import FloatAction from "./layout/FloatAction";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import PrivateRoute from "./router/PrivateRoute";
import { getUserData } from "../axios";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: getUserData().user_id ? true : false,
        };

        this.todoLists = React.createRef();
        this.modalFormController = React.createRef();

        this.updateTodoLists = this.updateTodoLists.bind(this);
        this.updateLoggedInState = this.updateLoggedInState.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    componentDidMount() {
        this.unlisten = this.props.history.listen(this.updateLoggedInState);
    }

    componentWillUnmount() {
        this.unlisten();
    }

    updateTodoLists() {
        this.todoLists.current.updateTodoLists();
    }

    updateLoggedInState() {
        const isLoginPage = window.location.href.split("/").includes("login");

        this.setState({
            loggedIn: getUserData().user_id && !isLoginPage ? true : false,
        });
    }

    openModal() {
        this.modalFormController.current.openModal(null, { header: "todo list" });
    }

    render() {
        return (
            <header>
                <Header drawer={<Drawer pos="bottom" />} loggedIn={this.state.loggedIn} />

                <Container maxWidth="sm">
                    <Switch>
                        <PrivateRoute
                            exact
                            path="/"
                            loggedIn={this.state.loggedIn}
                            component={() => <TodoBoard ref={this.todoLists} />}
                        />
                        <Route path="/login/" component={LoginForm} />
                        <Route path="/sign-up/" component={SignUpForm} />
                    </Switch>
                </Container>

                <ModalFormController
                    ref={this.modalFormController}
                    updateContent={this.updateTodoLists}
                >
                    <TodoListForm />
                </ModalFormController>

                {this.state.loggedIn && <FloatAction handleOpen={this.openModal} />}
            </header>
        );
    }
}

export default withRouter(App);
