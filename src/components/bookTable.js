import React from "react";
import Cookies from "universal-cookie";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "../componentCss/bookTable.css";

import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "11%",
    padding: "12px 86px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const styles = theme => ({
  grid: {
    width: "60%"
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  bootstrapFormLabel: {
    fontSize: 18
  }
});
class BookTable extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      selectedDate: new Date(),
      people: 1,
      bookData: {
        bookedDate: "",
        bookedTime: "",
        numberOfPeople: this.people,
        restaurantsData: ""
      }
    };
    console.log(this.state.bookData);
  }

  onBookTable = event => {
    event.preventDefault();
    const cookies = new Cookies();
    let userEmail = cookies.get("userEmail");
    let bookingData = this.state.bookData
    return fetch(`http://localhost:8080/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: userEmail
      },
      body: JSON.stringify(bookingData)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };
  handleChange = async event => {
    await this.setState({ people: event.target.value });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
 twoFunctionCall=(event)=>{
    this.onBookTable(event)
    return this.handleClose(event)
 }
  handleDateChange = date => {
    console.log(date);
    this.setState({
      selectedDate: date,
      bookData: {
        bookedDate: date
          .toString()
          .split(" ")
          .slice(0, 4)
          .join(" "),
        bookedTime: date
          .toString()
          .split(" ")
          .slice(4, 5)
          .join(" "),
        numberOfPeople: this.state.people,
        restaurantsData: this.props.restaurantsData
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;
    console.log(this.state);
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Reservation
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose your Day and Time
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <form className={classes.root} autoComplete="off">
                <FormControl className={classes.margin}>
                  <InputLabel
                    htmlFor="select-customized-select"
                    className={classes.bootstrapFormLabel}
                  >
                    select people
                  </InputLabel>
                  <Select
                    value={this.state.people}
                    onChange={this.handleChange}
                    input={
                      <BootstrapInput
                        name="select"
                        id="select-customized-select"
                      />
                    }
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                  </Select>
                </FormControl>
              </form>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.grid} justify="space-around">
                  <DatePicker
                    margin="normal"
                    label="Date picker"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                  />
                  <TimePicker
                    margin="normal"
                    label="Time picker"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <div className="book-Table-button">
                
                <button onClick={this.twoFunctionCall} type="submit">
                  Book
                </button>
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(BookTable);
