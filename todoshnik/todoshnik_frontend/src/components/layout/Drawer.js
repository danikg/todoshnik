import React, { Component } from "react";
import PropTypes from "prop-types";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GitHubIcon from "@material-ui/icons/GitHub";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import IconButton from "@material-ui/core/IconButton";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

class Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = { active: false };
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(active) {
        this.setState({ active: active });
    }

    render() {
        return (
            <div>
                <IconButton
                    edge="start"
                    aria-label="menu"
                    onClick={() => this.toggleDrawer(true)}
                >
                    <MenuOutlinedIcon style={{ color: "white" }} />
                </IconButton>

                <SwipeableDrawer
                    disableBackdropTransition={!iOS}
                    disableDiscovery={iOS}
                    anchor={this.props.pos}
                    open={this.state.active}
                    onClose={() => this.toggleDrawer(false)}
                    onOpen={() => this.toggleDrawer(true)}
                >
                    <div
                        role="presentation"
                        onClick={() => this.toggleDrawer(false)}
                        onKeyDown={() => this.toggleDrawer(false)}
                    >
                        <List>
                            <ListItem
                                button
                                onClick={() =>
                                    window.open(
                                        "https://github.com/danikg/todoshnik/",
                                        "_blank"
                                    )
                                }
                            >
                                <ListItemIcon>
                                    <GitHubIcon />
                                </ListItemIcon>
                                <ListItemText primary="Todoshnik on GitHub" />
                            </ListItem>

                            <ListItem
                                button
                                onClick={() =>
                                    window.open("https://github.com/danikg/", "_blank")
                                }
                            >
                                <ListItemIcon>
                                    <AccountCircleOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="My GitHub" />
                            </ListItem>
                        </List>
                    </div>
                </SwipeableDrawer>
            </div>
        );
    }
}

Drawer.propTypes = {
    pos: PropTypes.string.isRequired,
};

export default Drawer;
