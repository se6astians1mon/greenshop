//Component a login form with a simple texfield that is checked upon.
//props: next=next page
import React, { useState } from 'react';
import {useLocation} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { isTablet, BrowserView, MobileView } from 'react-device-detect';

import ClleLogo from '../images/clle_logo.png';
import Utj2Logo from '../images/utj2_logo.png';
import TseLogo from '../images/tse_logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "10px",
    padding: "10px",
    maxWidth: "1000px",
    display: "inline-block",
    marginTop: "30px"
  },
  textfield: {
    marginBottom: "10px"
  },
  logos: {
    marginBottom: "30px"
  }

}));

function Alert(props) {
  //displays an alert message in material ui style
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function LandingPage(props) {
  const regex = RegExp('^[0-9]{8}$');
	//get parameter id from link
  const search = useLocation().search;  
  const mailID = new URLSearchParams(search).get('BrokerPanelId');
  console.log("mail ID: "+mailID)
	
  const classes = useStyles();
  const timestamp_start_experience = (Date.now())
  //input tracking state
  const [errorMessage, setErrorMessage] = useState("Vous ne pouvez pas réfaire la même experience plusieurs fois");
  //state of error message
  const [open, setOpen] = useState(false);
  //handler for error message
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }
  return (
    <div>
      {!isTablet && <BrowserView>
        <Paper className={classes.root}>
          <Typography variant="body1" gutterBottom >
            Bonjour et bienvenue.
Nous vous remercions pour votre participation à cette étude.
L'expérience porte sur les comportements d’achat en ligne. Pour cette expérience, vous allez faire vos courses sur un site expérimental et répondre à un questionnaire.
            </Typography><Typography variant="body1" gutterBottom >
            Veuillez suivre les instructions et consignes qui seront affichées au fur et à mesure de l'expérience.
            </Typography>
			<Typography variant="body1" gutterBottom >
            Nous vous remercions encore pour votre participation.
          </Typography>

          <Button color="primary" variant="contained" onClick={() => checkIfUsed(mailID, props,
            regex, setOpen, timestamp_start_experience, setErrorMessage, mailID)}>
            Démarrer l'experience
        </Button>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {errorMessage}
            </Alert>
          </Snackbar>
        </Paper>
      </BrowserView>}
      <MobileView>
        <Paper className={classes.root}>
          <div className={classes.logos}>
            <img src={ClleLogo} alt="Clle Logo" width="20%" />
            <img src={Utj2Logo} alt="Université Toulouse II Jean Jaures Logo" width="20%" />
            <img src={TseLogo} alt="Toulouse Business School Logo" width="20%" />
          </div>
          Il est requis d’utiliser un ordinateur pour participer à l'étude (le site n’est pas compatible pour des téléphones portables (smartphones) et tablettes. Nous vous invitons à participer depuis votre ordinateur.
        </Paper>
      </MobileView>
    </div>
  );
}

function checkIfUsed(studentValue, props, regex, setOpen, timestampStart, setErrorMessage, mailID) {
   if (mailID == null){
	  setErrorMessage("Il vous faut un lien officiel pour faire cette experience.")
      setOpen(true)
	  return;
  }
  props.setMailID(mailID)
  //function to check if id is already used or invalid.
  //format check
  console.log("experience started at " + timestampStart)
  console.log("time now " + Date.now())
  //check if user exists...
  props.userExists(mailID, props.userID).then((result) => {
    console.log("result: " + result)
    if (result === "exists") {
      setErrorMessage("Cet id a déjà été utilisé dans une experience.")
      setOpen(true)
    }
    else if (result === "does not exist") {
      //try create new user entry & datablock & define which version user gets to see & send timestamp
      props.addUser(mailID, props.userID).then(function () {
        //get counter and increment it
        const calcVariant = (id, numVariants) => (id % numVariants);
		console.log("blabla "+mailID)
        return props.initialWrite(props.userID, mailID, timestampStart, calcVariant, props.numVariants, mailID)
          .catch(function (err) {
            // This will be an "population is too big" error.
            console.log("didnt make it")
            console.error(err);
          });
      }).then(function (arr) {
        //console.log("this user will see shop variant ", arr[0]);
        props.setVariant(0)
		//props.setVariant(0)		//version december 21 :use only ever the same version
        //console.log(arr)
		//props.setId(arr[1])			
        props.next()
      }).catch(function (error) {
		console.log("error followin")
        console.error(error);
        setErrorMessage("Can't add data")
        setOpen(true)
      });
    }
    console.log(props.userID)

  }).catch(function (error) {
    if (error.code == 'unavailable') {
      setErrorMessage("Problèmes de connexion. Veuillez réessayer plus tard")
      setOpen(true)
    }
    if (error.code == 'permission denied') {
      setErrorMessage("Vous avez déjà soumis cet id.")
      setOpen(true)
    }
  })
}