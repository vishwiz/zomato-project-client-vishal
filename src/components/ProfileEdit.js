import React from "react";
// import Cookies from "universal-cookie";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import "../componentCss/editProfile.css";

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}))(MuiDialogActions);

class ProfileEdit extends React.Component {
  state = {
    nameValue: "",
    contactValue: "",
    paymentValue: ""
  };

  onNameValueChange = event => {
    this.setState({
      nameValue: event.target.value
    });
  };
  onContactValueChange = event => {
    this.setState({
      contactValue: event.target.value
    });
  };
  onPaymentValueChange = event => {
    this.setState({
      paymentValue: event.target.value
    });
  };

  render() {
    console.log("please kaam kr de ye");
    return (
      <div>
        <Button
          variant="outlined"
          color="secondary"
          onClick={this.props.handleClickOpen}
        >
          Edit
        </Button>
        <Dialog
          onClose={this.props.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this.props.handleClose}
          >
            Edit
          </DialogTitle>
          <DialogContent>
            <div className="edit-profile">
              <TextField
                id="standard-password-input"
                label="Name"
                onChange={this.onNameValueChange}
                autoComplete="current-password"
                margin="normal"
              />
              <TextField
                id="standard-password-input"
                label="Contact"
                onChange={this.onContactValueChange}
                autoComplete="current-password"
                margin="normal"
              />
              <TextField
                id="standard-password-input"
                label="Payment"
                onChange={this.onPaymentValueChange}
                autoComplete="current-password"
                margin="normal"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={async () => {
                await this.props.handleClose();
                await this.props.onSaveUpdateProfile(
                  this.state.nameValue,
                  this.state.contactValue,
                  this.state.paymentValue
                );
                await this.props.getUserDetails();
              }}
              color="primary"
            >
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ProfileEdit;
