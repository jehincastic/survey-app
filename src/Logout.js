import React, { Component } from "react";

class Logout extends Component {
    componentDidMount() {
        this.props.handleLogOut();
    }
    render() {
        return (
            <div>
                <h1 style={{ color: "#3f51b5" }}>Loading....</h1>
            </div>
        );
    }
}

export default Logout;
