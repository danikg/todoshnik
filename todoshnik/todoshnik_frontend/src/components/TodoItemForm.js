import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

import { fixDate, prepareDate } from "../utils";
import { axiosInstance } from "../axios";

export class TodoItemForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            todo_list: null,
            completion_date: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { formData } = this.props;

        if (Object.keys(formData).length === 1) {
            this.setState({ todo_list: formData.todo_list });
        } else if (Object.keys(formData).length > 1) {
            this.setState({
                id: formData.id,
                title: formData.title,
                description: formData.description,
                todo_list: formData.todo_list,
                completion_date: fixDate(formData.completion_date),
            });
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]:
                event.target.name === "completion_date"
                    ? fixDate(event.target.value)
                    : event.target.value,
        });
    }

    async handleSubmit() {
        let url = "/todo_items/";
        let method = "POST";

        if (Object.keys(this.props.formData).length > 1) {
            url = `/todo_items/${this.props.formData.id}/`;
            method = "PUT";
        }

        try {
            await axiosInstance({
                method: method,
                url: url,
                data: this.state,
            }).then((response) => {
                this.props.updateContent();
                console.log(`${response.data.title} submited`);
            });
        } catch (errorMsg) {
            console.log(errorMsg);
        }
    }

    render() {
        const { title, description, completion_date } = this.state;

        return (
            <form onSubmit={(event) => event.preventDefault()} style={{ marginTop: 10 }}>
                <TextField
                    required
                    label="Title"
                    inputProps={{ maxLength: 50 }}
                    margin="dense"
                    fullWidth
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                    autoFocus
                    variant="outlined"
                />

                <TextField
                    label="Description"
                    multiline
                    rowsMax={4}
                    inputProps={{ maxLength: 255 }}
                    margin="dense"
                    name="description"
                    value={description}
                    onChange={this.handleChange}
                    fullWidth
                    variant="outlined"
                />

                <TextField
                    label="Completion date"
                    type="datetime-local"
                    margin="dense"
                    name="completion_date"
                    value={completion_date ? prepareDate(completion_date) : ""}
                    onChange={this.handleChange}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                />
            </form>
        );
    }
}

TodoItemForm.propTypes = {
    refProp: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any }).isRequired,
    ]),
    formData: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        completed: PropTypes.bool,
        completion_date: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
        todo_list: PropTypes.number.isRequired,
    }),
    isForEdit: PropTypes.bool,
    updateContent: PropTypes.func,
};

export default TodoItemForm;
