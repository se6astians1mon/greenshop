//Components to show instructions
//props: next=next page

//material ui
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
    
  },
  textfield: {
      marginBottom:"10px"
  },
  typo: {
    textAlign: "left"
  }

}));


export default function FinalPage(props) {
    const classes = useStyles();
    return (
        <div>
        <Paper className={classes.root}>
          <Typography variant="h3" component="h2" gutterBottom>
            Experience terminée
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.typo}>
            Vous pouvez désormais fermer cet onglet.
          </Typography>          
        </Paper>
      </div>
    );
}