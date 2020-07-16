import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import { axiosInstance, setTokens } from "../axios";

const styles = {
    loginForm: {
        margin: "16px 0 16px 0",
    },
    submitButton: {
        marginTop: 16,
    },
    block: {
        marginTop: 10,
    },
};

export class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            placeholder: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        localStorage.clear();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    async handleSubmit(event) {
        event.preventDefault();

        await axiosInstance
            .post("/token/", {
                username: this.state.username,
                password: this.state.password,
            })
            .then((response) => {
                setTokens(response.data);
                window.location.href = "/";
            })
            .catch((error) => {
                this.setState({ placeholder: error });
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Alert
                    className={classes.block}
                    style={{ display: this.state.placeholder ? "flex" : "none" }}
                    severity="error"
                >
                    <AlertTitle>Invalid data</AlertTitle>
                    {this.state.placeholder.message}
                </Alert>

                <Card className={classes.block} variant="outlined">
                    <CardContent>
                        <Typography variant="h6">Login</Typography>

                        <form onSubmit={this.handleSubmit} className={classes.form}>
                            <TextField
                                required
                                label="Username"
                                inputProps={{ maxLength: 150 }}
                                margin="dense"
                                fullWidth
                                name="username"
                                onChange={this.handleChange}
                                autoFocus
                                variant="outlined"
                            />

                            <TextField
                                required
                                label="Password"
                                margin="dense"
                                fullWidth
                                name="password"
                                type="password"
                                onChange={this.handleChange}
                                variant="outlined"
                            />

                            <Button
                                className={classes.submitButton}
                                type="submit"
                                color="primary"
                                variant="outlined"
                            >
                                Login
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(LoginForm);
