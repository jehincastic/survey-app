import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Nav from "./Nav";
import CardItem from "./CardItem";
import data from "./CardData";

const styles = {
    rowPadd: {
        margin: "30px auto"
    }
}

class Dashboard extends Component {
    componentDidMount() {
        if (this.props.user.email === "") {
            localStorage.removeItem("template1");
            localStorage.removeItem("template2");
            localStorage.removeItem("template3");
            localStorage.removeItem("title");
            localStorage.removeItem("emails");
            this.props.history.push("/login");
        } else {
            localStorage.removeItem("template1");
            localStorage.removeItem("template2");
            localStorage.removeItem("template3");
        }
    }
    render() {
        const { classes } = this.props;
        const dataDisplay = data.map((d, i) => (
            <div key={i} className={`col-md-4 col-xs-6 ${classes.rowPadd}`}>
                <CardItem {...d} />
            </div>
        ));
        return (
            <div>
                <Nav user={this.props.user} />
                <div className="container">
                    <div className="row">
                        {dataDisplay}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Dashboard);
