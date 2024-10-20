//Components to show instructions
//props: next=next page

//material ui
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Logo from '../images/clle_logo.png'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "10px",
    padding: "10px",
    maxWidth: "1000px",
    display: "inline-block",
    marginTop: "30px",

  },
  textfield: {
    marginBottom: "10px"
  },
  typo: {
    textAlign: "center"
  }

}));


export default function Instructions(props) {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h3" component="h2" gutterBottom>
          Instructions
          </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Votre tâche est simple et consiste à faire vos courses dans un magasin d’alimentation en ligne.
              </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Il est important que vous gardiez en tête qu'il n'y a aucune bonne ou mauvaise réponse. Ce qui compte vraiment, c'est de choisir les produits que vous avez l’habitude de consommer sachant que vous pouvez gagner le panier de consommation choisi  .
La durée de cette enquête est d'environ 30 minutes.

              </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Cette expérience est menée dans le cadre d’un projet de recherche scientifique. Les données recueillies seront traitées de façon anonyme.
              </Typography>
			          <Typography variant="body1" gutterBottom className={classes.typo}>
Après avoir terminé vos courses, nous vous demanderons de répondre à quelques questions.
              </Typography>
			   <Typography variant="body1" gutterBottom className={classes.typo}>
Vous aurez un budget de 40 euros pour constituer votre panier dans le magasin.
Il n'y a pas de minimum d'achat, mais gardez en tête que l'argent non dépensé est perdu.

              </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Récompense :
              </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Pour votre participation, vous obtiendrez un bon cadeau d'une valeur de 10€.Vous avez également une chance sur 10 de gagner votre panier. Le tirage au sort et la livraison des paniers se feront en janvier 2022. Les gagnants pourront alors récupérer leur panier dans un drive proche de chez eux.
              </Typography>
        <Button color="primary" variant="contained" onClick={() => props.next()}>Continuer</Button>


      </Paper>
    </div>
  );
}