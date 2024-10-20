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


export default function Tax_Colors(props) {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Pour chaque produit du magasin, une taxe carbone a été ajoutée au prix des produits. 
              </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Comment est calculé le montant de cette taxe carbone ?
              </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Le montant de la taxe carbone est calculé en fonction de l’empreinte carbone du produit, qui correspond au volume de dioxyde de carbone (CO2) émis au cours de la vie du produit (de la collecte des matières premières jusqu’au traitement du déchet).
              </Typography>
			          <Typography variant="body1" gutterBottom className={classes.typo}>
Nous avons considéré une taxe d’un montant de 80€ la tonne de CO2. Par exemple, un produit dont l’empreinte carbone est de 1kg de C02 verra son prix augmenter de 0.08€.
              </Typography>
			   <Typography variant="body1" gutterBottom className={classes.typo}>
Pour vous faciliter la tâche, nous vous indiquons directement le prix final, qui comprend le montant de la taxe carbone.


              </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
Nous vous rappelons que vous êtes libre de choisir les produits que vous souhaitez dans le magasin et que vos réponses sont anonymes
              </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Vous allez maintenant pouvoir parcourir les différents rayons du magasin.
              </Typography>
        <Button color="primary" variant="contained" onClick={() => props.next()}>Continuer</Button>


      </Paper>
    </div>
  );
}