import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Nav from "./Nav";
import { withStyles } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";

const styles = () => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    formControl: {
        margin: "15px",
        minWidth: 120
    },
    selectEmpty: {
        marginTop: "30px"
    },
    selectList: {
        width: "150px"
    },
    btn: {
        width: "80px",
        position: "relative",
        top: "20px"
    },
    heading: {
        color: "#3f51b5"
    },
    tempimg: {
        display: "block",
        width: "40vw",
        margin: "0 auto",
        marginTop: "40px"
    }
});

class AddSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            template: "",
            img: ""
        };
    }

    componentDidMount() {
        if (this.props.user.email === "") {
            this.props.history.push("/login");
        } else {
            this.props.history.push("/template1");
        }
    }

    handleChange = event => {
        let i = "";
        if (event.target.value === 1) {
            i = img1;
        } else if (event.target.value === 2) {
            i = img2;
        } else if (event.target.value === 3) {
            i = img3;
        }
        this.setState({
            [event.target.name]: event.target.value,
            img: i
        });
    };

    templateClick = () => {
        if (this.state.template === "") {
            alert("Select A Template");
        } else {
            const link = "/template" + this.state.template;
            this.props.history.push(link);
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Nav user={this.props.user} />
                <h1 className={classes.heading}>Select Template</h1>
                <form className={classes.root} autoComplete="off">
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">
                            Select Template
                        </InputLabel>
                        <Select
                            value={this.state.template}
                            onChange={this.handleChange}
                            inputProps={{
                                name: "template",
                                id: "template-simple"
                            }}
                            className={classes.selectList}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>Template 1</MenuItem>
                            <MenuItem value={2}>Template 2</MenuItem>
                            <MenuItem value={3}>Template 3</MenuItem>
                        </Select>
                    </FormControl>
                </form>
                <Button
                    onClick={this.templateClick}
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.btn}
                >
                    Select
                </Button>
                {this.state.template === "" ? null : (
                    <img
                        className={classes.tempimg}
                        src={this.state.img}
                        alt={`Template-${this.state.template}`}
                    />
                )}
            </div>
        );
    }
}

export default withStyles(styles)(AddSurvey);
