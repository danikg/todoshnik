import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { axiosInstance, getUserData } from "../axios";

export class TodoListForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                name: "",
                description: "",
                color: "",
            },
            colors: [],
            placeholder: "Loading",
        };

        this.getColors = this.getColors.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getColors();
    }

    async getColors() {
        if (this.props.formData) {
            var data = this.props.formData;
        } else {
            var data = this.state.data;
        }

        try {
            await axiosInstance.get("/get_colors/").then((response) => {
                data.color = data.color ? data.color : response.data[0][0];
                this.setState({
                    data: data,
                    colors: response.data,
                    placeholder: "",
                });
            });
        } catch (errorMsg) {
            this.setState({ placeholder: errorMsg });
        }
    }

    handleChange(event) {
        const data = this.state.data;
        data[event.target.name] = event.target.value;

        this.setState({
            data: data,
        });
    }

    async handleSubmit() {
        let url = "/todo_lists/";
        let method = "POST";
        let data = this.state.data;

        if (this.props.formData) {
            url = `/todo_lists/${this.props.formData.id}/`;
            method = "PUT";
            data = this.props.formData;
        }

        data.owner = getUserData().user_id;

        try {
            await axiosInstance({
                method: method,
                url: url,
                data: data,
            }).then((response) => {
                this.props.updateContent();
                console.log(`${response.data.name} submited`);
            });
        } catch (errorMsg) {
            console.log(errorMsg);
        }
    }

    render() {
        const { data, colors, placeholder } = this.state;
        const { name, description, color } = data;

        return (
            <form onSubmit={(event) => event.preventDefault()} style={{ marginTop: 10 }}>
                <TextField
                    required
                    label="Name"
                    inputProps={{ maxLength: 50 }}
                    margin="dense"
                    fullWidth
                    name="name"
                    value={name}
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

                <FormControl fullWidth margin="dense" variant="outlined">
                    <InputLabel id="color-select">Color</InputLabel>
                    <Select
                        labelId="color-select"
                        name="color"
                        value={colors.length ? color : ""}
                        onChange={this.handleChange}
                        label="Color"
                    >
                        {!colors.length && <MenuItem>{placeholder}</MenuItem>}
                        {colors.map((value, index) => {
                            return (
                                <MenuItem key={index} value={value[0]}>
                                    {value[1]}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </form>
        );
    }
}

TodoListForm.propTypes = {
    refProp: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any }).isRequired,
    ]),
    formData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        date_create: PropTypes.string.isRequired,
        date_update: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        owner: PropTypes.number.isRequired,
    }),
    isForEdit: PropTypes.bool,
    updateContent: PropTypes.func,
};

export default TodoListForm;
