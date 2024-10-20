//Component that displays a dice game with videos as animations.
//props: next=next page

import React, { useRef, useEffect, useState } from 'react';

//video imports
import vid1 from '../videos/vid1.mp4'
import vid2 from '../videos/vid2.mp4'
import vid3 from '../videos/vid3.mp4'
import vid4 from '../videos/vid4.mp4'
import vid5 from '../videos/vid5.mp4'
import vid6 from '../videos/vid6.mp4'

//Material ui
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    flexGrow: 1,
    margin: "10px",
    padding: "30px",
    display: "inline-block",
    marginTop: "30px"
  },
  textfield: {
    marginBottom: "10px"
  },

}));

//open Victory Message
function showMessage(setOpen) {
  console.log('tt')
  setOpen(true)
}

export default function DiceGame(props) {
  console.log("================ DICE GAME ===================")
  const classes = useStyles();
  const vidRef1 = useRef(null);
  const vidRef2 = useRef(null);
  const vidRef3 = useRef(null);
  const vidRef4 = useRef(null);
  const vidRef5 = useRef(null);
  const vidRef6 = useRef(null);
  //experience finished send timestamp:


  //interface tracker for dialog open
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [realID, setRealID] = useState(props.realID);
  const [diceSeries, setDiceSeries] = useState([]);
  const [initialDataRequestsDone, setInitialDataRequestsDone] = useState(false);
  const [diceThrow, setDiceThrow] = useState(0);
  const [mail, setMail] = useState("");

  useEffect(() => {
    console.log("FUNCTION useEffect (DiceGame)")
    //set date and get dicegame at the same time to avoid race conditions

    //is id set?
    console.log("uid is " + props.userID)
    console.log("real id is " + realID)
    //if not, get it
    if (realID == -1 && props.userID !== null) {
      //get id
      console.log('getting real ID')
      props.getUserContent(props.userID).then(function (doc) {
        if (doc.exists) {
          console.log("retrived user data is: ")
          console.log(doc.data())
          setRealID(doc.data().id)
          return
        } else
          console.log("user doesnt exist")
      }).catch(function (error) {
        console.log("db connection error", error);
      });
    }
    if (realID !== -1 && diceSeries != null && diceSeries.length == 0) {
      //get dice games 
      console.log("getting dice games")
      props.getDiceGames().then(function (doc) {
        if (doc.exists) {
          console.log("now filling diceseries...")
          console.log(doc.data()[realID])
          setDiceSeries(doc.data()[realID])
        } else {
          console.log("dicegames does not exist")
        }
      }).catch(function (error) {
        console.log("db connection error", error);
      });
    }
  }, [realID, diceSeries, props.userID])

  const handleClose = () => {
    console.log("handleclose")
    setOpen(false);
  };
  const handleClose2 = () => {
    console.log("handleclose2")
    props.next();
  };
  const saveMail = () => {
    props.addContent(props.userID, { id: "mail", content: { "mail": mail } }, true, true).then(function () {
      console.log("saved mail");
      handleClose();
    }).catch(function (error) {
      console.error("Error writing document: ", error);
    });
    props.next();
  }
  const handlePlayVideo = () => {
    //check if we still can play...
    console.log("FUNCTION handleplayvideo")
    if (diceThrow < diceSeries.length) {
      console.log("switch case")
      switch (diceSeries[diceThrow]) {
        case 6: vidRef6.current.play(); break;
        case 1: vidRef1.current.play(); break;
        case 2: vidRef2.current.play(); break;
        case 3: vidRef3.current.play(); break;
        case 4: vidRef4.current.play(); break;
        case 5: vidRef5.current.play(); break;
        default: break;
      }
    }
    else {
      alert("you cant play anymore")
      props.next();
    }



  }

  const endOfAnimation = () => {
    console.log("thrown " + diceSeries[diceThrow])
    if (diceSeries[diceThrow] == 6)
      showMessage(setOpen);
    else if (diceSeries[diceThrow] == 5) {
      setDiceThrow(diceThrow + 1)
    }
    else {
      setOpen2(true)
    }
  }
  return (
    <div>{diceSeries != null && diceSeries.length > 0 ? <Paper className={classes.paper}>
      <Typography variant="h3" component="h2" gutterBottom>
        Jeu pour gagner son panier
    </Typography>
      <Typography variant="body1" gutterBottom ><p>
        Veuillez cliquer sur le bouton pour lancer le dé digital et voir si vous avez gagné les produits sélectionnés.
      </p>
        <p>
          Si le dé tombe sur le numéro 6, vous gagnez votre panier. <br></br>
          Si le dé tombe sur le numéro 5, vous avez la possibilité de lancer le dé à nouveau.
      </p>
        <p>
          Bonne chance !
      </p>
      </Typography>
      <br></br> <div onClick={() => handlePlayVideo()}>
        <video ref={vidRef1} onEnded={() => endOfAnimation()} hidden={diceSeries[diceThrow] !== 1} >
          <source src={vid1} type="video/mp4" />
        </video><video ref={vidRef2} onEnded={() => endOfAnimation()} hidden={diceSeries[diceThrow] !== 2}>
          <source src={vid2} type="video/mp4" />
        </video><video ref={vidRef3} onEnded={() => endOfAnimation()} hidden={diceSeries[diceThrow] !== 3}>
          <source src={vid3} type="video/mp4" />
        </video><video ref={vidRef4} onEnded={() => endOfAnimation()} hidden={diceSeries[diceThrow] !== 4}>
          <source src={vid4} type="video/mp4" />
        </video><video ref={vidRef5} onEnded={() => endOfAnimation()} hidden={diceSeries[diceThrow] !== 5}>
          <source src={vid5} type="video/mp4" />
        </video><video ref={vidRef6} onEnded={() => endOfAnimation()} hidden={diceSeries[diceThrow] !== 6}>
          <source src={vid6} type="video/mp4" />
        </video>
      </div>

      <Button color="primary" variant="contained" onClick={() => handlePlayVideo()}>Jeter les dés</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Félicitations! Vous gagnez votre panier.
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Afin de vous contacter et vous transmettre les instructions, veuillez mettre votre adresse mail.<br></br>
            Les produits sont à récupérer dans un magasin (Casino ou Intermarche) au centre-ville.<br></br>
            Les détails pour récupérer votre panier seront transmis à votre mail électronique (Veuillez vérifier votre boîte de spam ou publicité, le mail sera envoyé dans un délai de 24h).
      </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Mail électronique"
            type="email"
            fullWidth
            onChange={(e) => setMail(e.target.value)}
            value={mail}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.next()} color="primary">
            Annuler
      </Button>
          <Button onClick={() => saveMail()} color="primary">
            Envoyer
      </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Vous avez perdu.</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>
              Nous vous remercions encore pour votre participation et nous restons à votre disposition pour toute question.
            </p>
            <p>
              Estefanya Vazquez et Aysegul Kanay<br></br>
              estefanya.vazquez@etu.univ-tlse2.fr<br></br>
              aysegul.kanay@univ-tlse2.fr
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Paper> : "Chargement..."}
    </div>);
}