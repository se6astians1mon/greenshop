
//Component to display a product
//props: add=function to add item to basket item=item to display, name=name of the product, quantity=weight in grams
//imagePath, alt=for image, indicator=indicator value if any,
//priceInEuros, pricePerUnit,
//color=color of label label=boolean if label to be displayed labelpos="front"/"back" to say where the labeltext goes in relation to the value
// labeltext

//material ui imports
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    padding: "10px"
    },
    priceperUnit: {
        color: "grey"
    },
    appbar: {
      width: '100%',
    },
    button: {
      margin:'auto',
    },
    typo: {
      marginTop: "40px",
      padding: "10px",
      display: "block"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));


export default function ProductCard(props) {
    const classes = useStyles();

    const label = () =>{
      return (
        <Typography variant="body1" gutterBottom className={classes.typo} style={{backgroundColor: props.color}} component={'span'}>
        {props.labelpos==="front"?props.labeltext:""} {props.indicator} {props.labelpos==="behind"?props.labeltext:""}
        </Typography>
      );
    }
    return (
        <div>
            <Paper className={classes.root}>
            <Typography variant="h6" component="h2" gutterBottom>
            {props.name}
          </Typography>
                <img src={process.env.PUBLIC_URL+props.imagePath} alt={props.alt} width="130px" height="130px" />
                {props.label?label():""}
                <Typography variant="body1" gutterBottom className={classes.typo} component={'span'}>
                Prix: {props.priceInEuros} € <div className={classes.priceperUnit} >{props.pricePerUnit} €/kg</div>
				<div className={classes.priceperUnit} >{props.weightPerItem} g</div>
                </Typography>
                <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={() => props.add(props.item)}
                    color="primary"
                    className={classes.button}
                    startIcon={<AddShoppingCartIcon/>}
                >Ajouter au Panier </Button>
            </Paper>
        </div>
    );
}