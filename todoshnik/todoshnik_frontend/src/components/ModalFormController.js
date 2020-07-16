import React, { Component, cloneElement } from "react";
import PropTypes from "prop-types";

import Modal from "./layout/Modal";

export default class ModalFormController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: null,
            title: "",
            submitButtonText: "",
            modalState: false,
            isForEdit: false,
        };

        this.form = React.createRef();

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    openModal(data = null, params = {}) {
        if (data) {
            var isForEdit = Object.keys(data).length > 1;
        } else {
            var isForEdit = false;
        }

        this.setState({
            formData: data,
            title: isForEdit ? `Edit ${params.header}` : `Create ${params.header}`,
            submitButtonText: isForEdit ? "Edit" : "Create",
            modalState: true,
            isForEdit: isForEdit,
        });
    }

    closeModal() {
        this.setState({
            formData: null,
            title: "",
            submitButtonText: "",
            modalState: false,
            isForEdit: false,
        });
    }

    handleSubmit() {
        this.form.current.handleSubmit();
    }

    render() {
        const { title, submitButtonText, modalState, isForEdit } = this.state;

        return (
            <Modal
                open={modalState}
                handleClose={this.closeModal}
                handleSubmit={this.handleSubmit}
                title={title}
                submitButtonText={submitButtonText}
            >
                {cloneElement(this.props.children, {
                    ref: this.form,
                    formData: this.state.formData,
                    updateContent: this.props.updateContent,
                    isForEdit: isForEdit,
                })}
            </Modal>
        );
    }
}

ModalFormController.propTypes = {
    children: PropTypes.element.isRequired,
    refProp: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any }).isRequired,
    ]),
    updateContent: PropTypes.func.isRequired,
};
