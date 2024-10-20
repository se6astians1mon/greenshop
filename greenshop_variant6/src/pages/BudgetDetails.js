//Components to show instructions
//props: next=next page

//material ui
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


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


export default function BudgetDetails(props) {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h3" component="h2" gutterBottom>
          Budget
          </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Vous allez maintenant pouvoir constituer un panier de biens alimentaires dans notre magasin.</Typography><Typography variant="body1" gutterBottom className={classes.typo}>
Vous aurez un budget de 48 euros pour faire vos courses.
N'oubliez pas: ce qui compte pour nous est que vous choisissiez ce que vous souhaitez consommer sachant que vous pouvez recevoir le panier de consommation en janvier. 
        </Typography>
        <Button color="primary" variant="contained" onClick={() => props.next()}>Continuer</Button>
      </Paper>
    </div>
  );
}