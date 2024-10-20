//Component to display a message 
//props: variant=number of the variant to display.
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "10px",
    padding: "10px",
    maxWidth: "1000px",
    display: "inline-block",
    marginTop: "30px",
    textAlign: "center"

  },
  textfield: {
    marginBottom: "10px"
  },
  typo: {
    textAlign: "center"
  }

}));

export default function ShopLandingPage(props) {
  const classes = useStyles();
  switch (props.variant) {
    case "0": return (
      <div>
        <Paper className={classes.root}>
          <Typography variant="body1" gutterBottom className={classes.typo}>
            Vous pouvez choisir un panier de biens pour un maximum de 48 euros. L'argent non dépensé est perdu.
              </Typography>

        </Paper>
      </div>
    );
    case "1":
      return (
        <div>
          <Paper className={classes.root}>
            <Typography variant="body1" gutterBottom className={classes.typo}>
              <p>
                Certains produits sont disponibles en abondance et d’autres en quantité limitée. Pour chaque produit un indicateur numérique ainsi qu’un code couleur indiquant sa rareté dans le stock sont affichés. <b>Plus le nombre est élevé plus le produit est rare.</b>
                      </p>
              <p>
                En vue d’équilibrer les stocks, une taxe est appliquée lorsque le panier contient une trop grande proportion de produits rares.
                      </p>
              <p>
                Les produits du magasin sont divisés en 5 catégories en fonction de leur disponibilité. Et une jauge vous permet de connaître la rareté moyenne des produits de votre panier et de voir si votre panier dépasse <b>le seuil au-delà duquel la taxe est appliquée.</b> Plus vous dépassez le seuil plus la taxe est élevée.

                      </p><p>
                Vous pouvez dès maintenant parcourir les différents rayons à l'aide des onglets ci-dessus pour faire vos achats.
                        </p>
            </Typography>

          </Paper>
        </div>
      );
    case "2":
      return (
        <div>
          <Paper className={classes.root}>
            <Typography variant="body1" gutterBottom className={classes.typo}>
              <p>
                Pour chaque produit, l’empreinte carbone est affichée en kg de CO2 émis par kg de produit et représentée par un code couleur.
                          <b>Plus l’empreinte carbone d’un produit est élevée plus celui-ci contribue au réchauffement climatique</b> (de sa production à sa distribution)
                          </p>
              <p>
                En vue de limiter le changement climatique, l'objectif validé par le Grenelle de l'Environnement est de réduire de 75% les émissions de carbone d'ici 2050. La réduction de 25% des émissions de CO2 serait un objectif intermédiaire. C'est pourquoi un seuil représentant une réduction de 25% de l'empreinte carbone moyenne d'un panier d'achat sera affiché.
                          </p>
              <p>
                Les produits du magasin sont divisés en 5 catégories en fonction de leur empreinte carbone. Et une jauge vous permet de connaître l’empreinte carbone de votre panier et de voir si votre panier dépasse <b>le seuil d’émission de carbone envisagé.</b>
              </p><p>
                Vous pouvez dès maintenant parcourir les différents rayons à l'aide des onglets ci-dessus pour faire vos achats.
                        </p>
            </Typography>

          </Paper>
        </div>
      );
    case "3":
      return (
        <div>
          <Paper className={classes.root}>
            <Typography variant="body1" gutterBottom className={classes.typo}>
              <p>
                Pour chaque produit, l’empreinte carbone est affichée en kg de CO2 émis par kg de produit et représentée par un code couleur.
                <b>Plus l’empreinte carbone d’un produit est élevée plus celui-ci contribue au réchauffement climatique</b> (de sa production à sa distribution).
              </p>
              <p>
                En vue de limiter le changement climatique, l'objectif validé par le Grenelle de l'Environnement est de réduire de 75% les émissions de carbone d'ici 2050. La réduction de 25% des émissions de CO2 serait un objectif intermédiaire. C'est pourquoi un seuil représentant une réduction de 25% de l'empreinte carbone moyenne d'un panier d'achat sera affiché.
              </p>
              <p>
                Les produits du magasin sont divisés en 5 catégories en fonction de leur empreinte carbone. Et une jauge vous permet de connaître l’empreinte carbone de votre panier et de voir si votre panier dépasse <b>le seuil d’émission de carbone envisagé. </b>
              </p>
              <p>
                De plus, <b>une taxe carbone est appliquée si vous dépassez ce seuil.</b>  Plus vous dépassez le seuil plus la taxe carbone est élevée.
              </p>
              <p>
                Vous pouvez dès maintenant parcourir les différents rayons à l'aide des onglets ci-dessus pour faire vos achats.
              </p>
            </Typography>

          </Paper>
        </div>
      );
    default: return (<div></div>);
  }

}