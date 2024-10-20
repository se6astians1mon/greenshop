//Component to display co2 footprint
//props: value=value of the thermometer, text= conditional text to display below thermometer


import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserView, MobileView } from 'react-device-detect';


import arrowRight from '../images/right.png'
import thermometerGreen from '../images/thermometerGreen.png';
import thermometerYellow from '../images/thermometerYellow.png';
import thermometerOrange from '../images/thermometerOrange.png';
import thermometerOrangeRed from '../images/thermometerOrangeRed.png';
import thermometerRed from '../images/thermometerRed.png';


const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
      padding: 10,

   },
   textfield: {
      marginBottom: "10px"
   },
   thermometer: {
      width: "auto",
      marginBottom: "10px",
      margin: "auto",
      position: "relative"
   },
   pointerLabel: {
      float: "left",
      padding: "3px"
   },
   pointer: {
      float: "left",
      position: "relative",
      top: "90px"
   },
   container: {
      display: "inline-block",
   },
   indication: {
      fontSize: "x-small"
   }
}
));


function valueToPx(value, numPx, maxValue) {
   console.log('called converter')
   return value >= maxValue ? numPx : value * numPx / maxValue;
}
function format2Digit(number) {
   return Math.round(number * 100) / 100
}

export default function ThermoCard(props) {
   const classes = useStyles();
   const labels = ["> 9,32", "<=9,32", "<=6,99", "<=4,66", "<=2,33"]
   const FullTherm = () => {
      return (
         <Paper className={classes.root}>
            <Typography variant="h6" component="h2" gutterBottom>
               {props.label}
            </Typography>
            <div className={classes.thermometer}>
               <div className={classes.container}>
                  <div className={classes.pointer} style={{ top: 90 - valueToPx(props.value, 100, 11.66) }}>
                     <div className={classes.pointerLabel}>{format2Digit(props.value)}</div>
                     <img src={arrowRight} alt="arrow" height="25px"></img>
                  </div>
                  <table cellspacing="0" cellpadding="0">
                     <tr>
                        <td><div style={{ backgroundColor: "#ff0000", height: "20px", width: "50px" }}></div></td>
                        <td>{labels[0]}</td>
                     </tr>
                     <tr>
                        <td><div style={{ backgroundColor: "#ff5900", height: "20px", width: "50px" }}></div></td>
                        <td>{labels[1]}</td>
                     </tr>
                     <tr>
                        <td><div style={{ backgroundColor: "#ffc000", height: "20px", width: "50px" }}></div></td>
                        <td>{labels[2]}</td>
                     </tr>
                     <tr>
                        <td><div style={{ backgroundColor: "#ffff00", height: "20px", width: "50px" }}></div></td>
                        <td>{labels[3]}</td>
                     </tr>
                     <tr>
                        <td><div style={{ backgroundColor: "#008000", height: "20px", width: "50px" }}></div></td>
                        <td>{labels[4]}</td>
                     </tr>
                  </table>
               </div>
            </div>
            <div className={classes.indication}>
               {props.text}
            </div>
         </Paper>
      )
   }
   const IconTherm = () => {
      if (props.value <= 2.33)
         return <img src={thermometerGreen} alt="" width="50px" />
      if (props.value <= 4.66)
         return <img src={thermometerYellow} alt="" width="50px" />
      if (props.value <= 6.99)
         return <img src={thermometerOrange} alt="" width="50px" />
      if (props.value <= 9.32)
         return <img src={thermometerOrangeRed} alt="" width="50px" />
      if (props.value > 9.32)
         return <img src={thermometerRed} alt="" width="50px" />
   }
return (
   <div>
      <BrowserView>
         <FullTherm />
      </BrowserView>
      <MobileView>
         {props.drawerOpen ? <FullTherm /> : <IconTherm />}
      </MobileView>
   </div>
);
}