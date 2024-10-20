//Component that displays a shop.
//props: variant: a json object with the changes depending on the shop variant to be displayed 
// products=a json object containing the categories containing the products to display} 
// next=next page

import { useEffect, useState } from 'react';

//material ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//component imports
import SideDrawer from '../components/SideDrawer.js'
import ProductCard from '../components/ProductCard';
import Basket from '../components/Basket.js'
import ThermoCard from '../components/Thermometer';
import ShopLandingPage from "../components/ShopLandingPage"

import { isMobile } from 'react-device-detect';

const drawerWidth = 300;
const mobileDrawerWidth = 80;

const useStyles = makeStyles((theme) => ({
  rootDesktop: {
    flexGrow: 1,
    marginRight: drawerWidth
  },
  rootMobile: {
    flexGrow: 1,
    marginRight: mobileDrawerWidth
  },
  panel: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  appbar: {
    width: '100%',
  },
  grid: {
    marginTop: "40px",
    padding: "10px"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  }
}));

function Alert(props) {
  //displays an alert message in material ui style
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function sumHT(basket) {
  //calc the sum without tax based on the basket object
  let sumHT = 0.0;
  basket.forEach(item => {
    sumHT = sumHT + item["Prix initial"] * item.quantity;
  });
  return sumHT;
}

function carbonWeight(basket) {
  //calc carbon footprint of basket based on the items in the basket
  let carbonWeight = 0.0;
  basket.forEach(item => {
    carbonWeight = carbonWeight + item.quantity * (item.Grammes / 100 * item["Empreinte CO2 (g par 100 g)"]);
	console.log(item)
  });
  
  const carbonWeightkg = carbonWeight / 1000
  return carbonWeightkg;
}
function basketWeight(basket) {
  //calc the weight of the basket
  let basketWeight = 0.0;
  basket.forEach(item => {
    basketWeight = basketWeight + item.quantity * (item.Grammes);
  });
  const basketWeightkg = basketWeight / 1000
  return basketWeightkg;
}

export default function Store(props) {
  console.log("COMPONENT Store")
  const classes = useStyles();
  const [drawerOpen, setdrawerOpen] = useState(false);
  const [notSeenInstructions, setNotSeenInstructions] = useState(true);
  const [landingPageTimeStamps, setLandingPageTimeStamps] = useState([Date.now()]);
  const [timestampLeavePageLeave, setTimeStampLeave] = useState(null)
  const items = props.products;
  const [basket, setBasket] = useState([]);
  const [categoryIndex, setValue] = useState(-1);
  //state of error message
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Dépassement du budget: Il n’est pas possible de rajouter ce produit à votre panier car vous dépasseriez le budget alloué")
  const addToBasket = (item) => {
    console.log(carbonWeight(basket))
    //check if the added item will get the basket over the limit.If so, dont add it.
    let futureValue = sumHT(basket) + item["Prix initial"];
    if (props.variant.tax) {
      //only add it if we pass or have passed the threshold
      console.log("item co2 impact 100g:" + item["Empreinte CO2 (g par 100 g)"])
      console.log("item co2 impact 1g:" + item["Empreinte CO2 (g par 100 g)"] / 100)
      console.log("Item weight: " + item.Grammes)
      console.log("co2 impact in g:" + item.Grammes * item["Empreinte CO2 (g par 100 g)"] / 100)
      console.log("co2 impact in kg:" + item.Grammes * item["Empreinte CO2 (g par 100 g)"] / 100000)
      if ((carbonWeight(basket) + (item.Grammes * item["Empreinte CO2 (g par 100 g)"] / 100000) / (basketWeight(basket) + (item.Grammes / 1000))) > 2.33)
        futureValue = futureValue + ((carbonWeight(basket) + (item.Grammes * item["Empreinte CO2 (g par 100 g)"] / 100000)) / (basketWeight(basket) + (item.Grammes / 1000)) - 2.33) * 0.35 * (basketWeight(basket) + (item.Grammes / 1000));
    }
    console.log(futureValue)
    if (futureValue > 43) {
      //trigger error message and block
      setErrorMessage("Dépassement du budget: Il n’est pas possible de rajouter ce produit à votre panier car vous dépasseriez le budget alloué");
      setOpen(true);
      return
    }
    const found = basket.find(product => product.id === item.id)
    if (found == null) {
      item.quantity = 1;
      setBasket(basket => [...basket, item]);
    }
    else {
      setBasket(basket => {
        const newBasket = basket.map(product => {
          if (product.id === item.id) {
            product.quantity = product.quantity + 1;
          }
          return product
        });
        return newBasket;
      });
    }
  }
  useEffect(() => {
    if (landingPageTimeStamps == null)
      setLandingPageTimeStamps(Date.now());
  })
  const removeFromBasket = (item) => {
    if (item.quantity > 1) {
      setBasket(basket => {
        const newBasket = basket.map(produc => {
          if (produc.id === item.id) {
            //console.log("before: " + produc.quantity)
            produc.quantity = produc.quantity - 1;
            //console.log("after: " + produc.quantity)
          }
          return produc
        });
        return newBasket;
      })
    }
    else {
      setBasket(basket => {
        const newBasket = basket.filter(product => product.id !== item.id
        );
        return newBasket;
      });
    }
  };
  //returns categories and containing products 
  const showCategory = () => {
    if (categoryIndex === -1)
      //store timestamp
      return (<ShopLandingPage variant={props.variant.number}></ShopLandingPage>)
    else {
      //if we leave the instructions page for the first time, we store the time.
      if (notSeenInstructions) {
        setTimeStampLeave(Date.now());
        setNotSeenInstructions(false)
      }
      const found = items.find(category => category.id === categoryIndex);
      return (
        <Grid container spacing={3} className={classes.grid}>
          {found.products.map((item, i) => (
            <Grid key={item.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <ProductCard add={addToBasket} item={item} name={item["Descriptif Produit"]} quantity={item["Grammes"]}
                unit="g" imagePath={item["Lien fichier"]} alt="alt" indicator={item["Prix/quantite (euro/kg) baseline"]}
                priceInEuros={item["Prix initial"]} pricePerUnit={item["Prix/quantité (euro/kg) baseline"]}
                color={item["Traffic light inter"]} weightPerItem={item["Grammes"]} label={props.variant.labels} labelpos={props.variant.labelpos} labeltext={props.variant.labeltext}>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      );
    }
  }
  //method to change currently selected category
  const changeCategory = (newValue) => {
    if ((newValue === -1 && categoryIndex !== -1) || (newValue !== -1 && categoryIndex === -1)) {
      console.log('adding date to list:' + Date.now())
      setLandingPageTimeStamps([...landingPageTimeStamps, Date.now()]);
    }

    setValue(newValue);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }
  return (
    <div className={isMobile ? classes.rootMobile : classes.rootDesktop}>
      <div className={classes.toolbar}>
        <Chip label="Accueil" color={categoryIndex === -1 ? "primary" : "default"} onClick={(i) => { changeCategory(-1) }} />
        {items.map((item, i) => (
          <Chip label={item.name} key={item.id} color={categoryIndex === item.id ? "primary" : "default"} onClick={(i) => { changeCategory(item.id) }} />
        ))}
      </div>
      {showCategory()}
      <SideDrawer drawerwidth={drawerWidth} mobileWidth={mobileDrawerWidth} drawerOpen={drawerOpen} setDrawerOpen={setdrawerOpen}>
        {props.variant.thermometer ? <ThermoCard
          drawerOpen={drawerOpen}
          label={props.variant.thermometerlabel}
          value={basketWeight(basket) !== 0 ? carbonWeight(basket) / basketWeight(basket) : 0}
          text={props.variant.text}
        ></ThermoCard> : ""}
        <Divider />
        <Basket
          setDrawerOpen={setdrawerOpen}
          drawerOpen={drawerOpen}
          openErrorMessage={setOpen}
          setErrorMessage={setErrorMessage}
          carbonWeight={carbonWeight(basket)}
          averageCarbonWeight={carbonWeight(basket) / basketWeight(basket)}
          next={props.next}
          basket={basket}
          remove={removeFromBasket}
          add={addToBasket}
          ht={sumHT(basket)}
          showTax={props.variant.tax}
          userID={props.userID}
          taxe={basketWeight(basket) == 0 ? 0 : carbonWeight(basket) / basketWeight(basket) > 2.33 ? (carbonWeight(basket) / basketWeight(basket) - 2.33) * 0.35 * basketWeight(basket) : 0}
          landingPageTimeStamps={landingPageTimeStamps}
          timeFinishInstructions={timestampLeavePageLeave}
          addContent={props.addContent}>
        </Basket>
      </SideDrawer>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}