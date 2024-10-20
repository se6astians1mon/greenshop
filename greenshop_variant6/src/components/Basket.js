//Component to display the contents of the basket and (sub)totals
//props: next=next Page basket=basket remove=function to remove item from basket add=function to add item to basket  ht=sum without taxes 
//showTax=boolean if tax is to be included taxe=value of the tax

import { useState, useEffect } from 'react';

//material ui imports
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { BrowserView, MobileView } from 'react-device-detect';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    overflow: "auto",
    marginBottom: "10px"
  },
  table: {

  },
  list: {
  },
  btngroup: {

  },
  button: {
    marginTop: "10px",
    marginBottom: "10px"
  }
}));

function format2Digit(number) {
  //function to cut off unneccesary digits behind comma
  return Math.round(number * 100) / 100
}

function checkOut(userID, next, basket, landingPageTimeStamps, timeFinishInstructions, addContent, ht, taxe, showTax, openErrorMessage, setErrorMessage, carbonWeight, averageCarbonWeight) {
  console.log("FUNCTION checkOut (Basket)")
  if (!isValidBasket(ht, taxe, showTax))
    return
  let timeCheckout = Date.now();
  //TODO calc time on landingpage
  console.log("Arrived at " + new Date(landingPageTimeStamps[0]).toLocaleTimeString("fr-FR"))
  console.log("Landing Page finished at " + new Date(timeFinishInstructions).toLocaleTimeString("fr-FR"))
  console.log("Checkout at " + new Date(timeCheckout).toLocaleTimeString("fr-FR"))
  //todo call function to send stuff.
  //console.log(userID)
  let newbasket = basket.map((item) => ({ "id": item.id, "quantity": item.quantity }))
  let object = { id: "basket", content: { basket: newbasket, landingPageTimeStamps: landingPageTimeStamps, timeFinishLandingPage: timeFinishInstructions, timeCheckout: timeCheckout, basketValueWT: ht, totalCarbonWeight: carbonWeight, averageCarbonWeight } };
  console.log(showTax)
  if (showTax) {
    console.log("adding tax")
    object.content.tax = taxe;
  }
  console.log("final object")
  console.log(object)
  addContent(userID, object, true, true).then(function () {
    console.log("Basket successfully written! (Basket)");
    next();
  }).catch(function (error) {
    console.log("fail")
    console.error("Error writing basket: ", error);
    setErrorMessage("Vous avez déjà finalisé un panier. Vous ne pouvez pas changer sa composition.")
    openErrorMessage(true)
  });
}

function isValidBasket(value, tax, taxAdded) {
  //check if basket value is between 0 and 25 €
  if (taxAdded) {
    if (value + tax < 0 || value + tax > 48)
      return false;
  } else {
    if (value < 0 || value > 48)
      return false;
  }
  return true;
}
function sumBasketItems(basket) {
  let count = 0;
  basket.forEach(element => {
    count = count + element.quantity;
  });
  return count;
}

export default function Basket(props) {
  console.log("basket render")
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  useEffect(() => {
    setItemCount(sumBasketItems(props.basket))
  }, [props.basket])
  const handleClose = () => {
    setOpen(false);
  };

  const FullBasket = () => {
    return (<div><Typography variant="h6">
      Votre Panier
</Typography>
      <br></br>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableBody>
            {props.showTax ? <TableRow>
              <TableCell component="th" scope="row">
                Total en cours HT
          </TableCell>
              <TableCell align="left">{format2Digit(props.ht)} €</TableCell>
            </TableRow> : null}
            {props.showTax ? <TableRow>
              <TableCell component="th" scope="row">
                Taxe
          </TableCell>
              <TableCell align="left">{format2Digit(props.taxe)} €</TableCell>
            </TableRow> : null}

            <TableRow>
              <TableCell component="th" scope="row">
                Total en cours
          </TableCell>
              <TableCell align="left">{props.showTax ? format2Digit(props.ht + props.taxe) : format2Digit(props.ht)} €</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Tooltip title="Le panier doit être entre 0 et 48 €">
        <Button
          variant="contained"
          color={isValidBasket(props.ht, props.taxe, props.showTax) ? "primary" : "default"}
          size="small"
          className={classes.button}
          onClick={() => { isValidBasket(props.ht, props.taxe, props.showTax) ? setOpen(true) : setOpen(false) }}
          startIcon={<ShoppingCartIcon />}
        >
          Valider le panier
        </Button>
      </Tooltip>
      <List className={classes.list}>
        <ListSubheader component="div" id="nested-list-subheader">
          {props.basket.length === 0 ? "Votre panier est vide" : "Produits selectionnées"}
        </ListSubheader>
        {props.basket.map((item) => {
          return (
            <ListItem key={item.id} role={undefined} dense button >
              <ListItemText>
                {item.quantity}x {item["Descriptif Produit"]}
              </ListItemText>
              <ButtonGroup className={classes.btngroup} size="small" color="primary" aria-label="outlined primary button group">
                <Button onClick={() => props.remove(item)}>-</Button>
                <Button onClick={() => props.add(item)}>+</Button>
              </ButtonGroup>
            </ListItem>
          );
        })}
      </List>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Valider le panier</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Etes-vous sûr de vouloir valider votre panier et quitter le magasin?
      </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Non
      </Button>
          <Button
            onClick={() => checkOut(
              props.userID,
              props.next,
              props.basket,
              props.landingPageTimeStamps,
              props.timeFinishInstructions,
              props.addContent,
              props.ht,
              props.taxe,
              props.showTax,
              props.openErrorMessage,
              props.setErrorMessage,
              props.carbonWeight,
              props.averageCarbonWeight
            )}
            color="primary" autoFocus>
            Oui
      </Button>
        </DialogActions>
      </Dialog></div>);
  }
  const IconBasket = () => {
    return (<div>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableBody>
          {props.showTax ? <div><TableRow>
            <TableCell component="th" scope="row">
              HT
          </TableCell></TableRow><TableRow>
              <TableCell align="left">{format2Digit(props.ht)} €</TableCell>
            </TableRow></div> : null}
          {props.showTax ? <div><TableRow>
            <TableCell component="th" scope="row">
              Taxe
          </TableCell></TableRow><TableRow>
              <TableCell align="left">{format2Digit(props.taxe)} €</TableCell>
            </TableRow></div> : null}
          <TableRow>
            <TableCell component="th" scope="row">
              Total
          </TableCell></TableRow><TableRow>
            <TableCell align="left">{props.showTax ? format2Digit(props.ht + props.taxe) : format2Digit(props.ht)} €</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <IconButton
        variant="contained"
        aria-label="cart"
        color={isValidBasket(props.ht, props.taxe, props.showTax) ? "primary" : "default"}
        onClick={() => { props.setDrawerOpen(!props.drawerOpen) }}
      >
        <StyledBadge badgeContent={itemCount} color={isValidBasket(props.ht, props.taxe, props.showTax) ? "primary" : "secondary"}>
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton></div>)
  }
  return (
    <div className={classes.root}>
      <BrowserView>
        <FullBasket />
      </BrowserView>
      <MobileView>
        {props.drawerOpen ? <FullBasket /> : <IconBasket />}
      </MobileView>
    </div>
  );
}