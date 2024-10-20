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
  pastilleVert: {
	width: "40px",
	height: "20px",
	backgroundColor: "green",
	display: "inline-block",
	marginRight: "10px"
  },
    pastilleJaune: {
	width: "40px",
	height: "20px",
	backgroundColor: "orange",
	display: "inline-block",
	marginRight: "10px"
  },
    pastilleRouge: {
	width: "40px",
	height: "20px",
	backgroundColor: "red",
	display: "inline-block",
	marginRight: "10px"
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
          Pour chaque produit, vous trouverez une information sur son impact environnemental.
              </Typography>
			  <Typography variant="body1" gutterBottom className={classes.typo}>
          Que signifie l’information environnementale ?
              </Typography>
			  <Typography variant="body1" gutterBottom className={classes.typo}>
          Les pastilles de couleur attribuées à chaque produit du magasin renvoient à leur empreinte carbone. L’empreinte carbone correspond au volume de dioxyde de carbone (CO2) émis au cours de la vie du produit (de la collecte des matières premières jusqu’au traitement du déchet).
              </Typography>
			  <Typography variant="body1" gutterBottom className={classes.typo}>
         Les produits du magasin sont divisés en trois catégories en fonction de leur empreinte carbone:
              </Typography>
			  <Typography variant="body1" gutterBottom className={classes.typo}>
			  <div className={classes.pastilleVert}></div>
         Cette pastille verte désigne les produits appartenant au groupe ayant     l’empreinte carbone la plus basse du magasin.
              </Typography><Typography variant="body1" gutterBottom className={classes.typo}>
			  <div className={classes.pastilleJaune}></div>Cette pastille orange désigne les produits appartenant au groupe ayant l’empreinte carbone intermédiaire du magasin.
			  </Typography><Typography variant="body1" gutterBottom className={classes.typo}>
			  <div className={classes.pastilleRouge}></div>Cette pastille rouge désigne les produits appartenant au groupe ayant l’empreinte carbone la plus élevée du magasin.
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