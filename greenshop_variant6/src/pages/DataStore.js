//Component that allows to download and view data from database
//props: next=next page

import React, { useState, useEffect } from 'react';

//material ui
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "100px",
    padding: "40px"
  },
  textfield: {
    marginBottom: "10px"
  },
  dataview: {
    overflow: "scroll"
  },

}));

function objectToCsv(obj, products, questions) {
  console.log("FUNCTION objectToCSV")
  console.log(obj)
  let setAll = (obj, val) => Object.keys(obj).forEach(k => obj[k] = val);
  let header = ["idField", "id", "mailID", "variant", "agreedToTerms", "tax", "basketValueWT", "timeStart", "timeStartLandingPage", "timeLandingPage", "visitsLandingPage", "timeCheckout", "timeFinish", "mail", "won", "carbonWeight", "averageCarbonWeight"];
  //add product header & create prototype object to use for transformation
  let basketObject = {};
  for (const category of products) {
    for (const product of category.products) {
      header.push("prod" + product.id)
      basketObject["prod" + product.id] = 0
    }
  }
  //add question header...
  console.log("questions");
  console.log(questions)
  let questionObject = {}
  for (const section of questions) {
    for (const question of section.questions) {
      header.push("section" + section.id + "question" + question.id)
      questionObject["section" + section.id + "question" + question.id] = -1

    }
    header.push("section" + section.id + "timeFinished");
    questionObject["section" + section.id + "timeFinished"] = 0
  }
  let headerline = "";
  header.map((key) => (
    headerline = headerline + key + ","
  ))
  //remove last comma and add newline
  headerline = headerline.slice(0, -1);
  headerline = headerline + '\n';
  console.log(headerline)
  let csv = headerline;
  //add rows
  obj.map((objOriginal) => {
    let row = ""
    //clean rowobjects
    setAll(questionObject, -1);
    setAll(basketObject, 0);
    let basics = { "idField": "", "id": -1,"mailID":"", "variant": -1, "agreedToTerms": "no", "tax": -1.0, "basketValueWT": -1.0, "timeStart": 0, "timeStartLandingPage": 0, "timeLandingPage": 0, "timeCheckout": 0, "timeFinish": 0, "mail": "", "won": "", "visitsLandingPage": 0, "carbonWeight": 0, "averageCarbonWeight": 0 }
    //map basics 
    console.log("objOriginal")
    console.log(objOriginal)
    for (const [key, value] of Object.entries(basics)) {
      if (key === 'agreedToTerms'){
		if (objOriginal.hasOwnProperty('mail'))
          basics['agreedToTerms'] = objOriginal['terms'].agreedToTerms ? 'yes' : 'no';
        else
          basics['agreedToTerms'] = "";
	  }
      else if (key === 'won')
        basics['won'] = objOriginal['won'] ? 'yes' : 'no';
      else if (key === 'mail') {
        if (objOriginal.hasOwnProperty('mail'))
          basics['mail'] = objOriginal['mail'].mail;
        else
          basics['mail'] = "";
      }
      else if (key === 'tax') {
        if (objOriginal.tax !== undefined)
          basics['tax'] = objOriginal['tax'];
        else
          basics['tax'] = 0;
      }
	  else if (key === 'mailID') {
		  basics['mailID'] = objOriginal['mailID'];
	  }
      else
        basics[key] = objOriginal[key];
    }
    //map products if any
    if (objOriginal.basket != null) {
      if (objOriginal.basket.basket != null)
        objOriginal.basket.basket.forEach((item, index) => {
          basketObject["prod" + item.id] = item.quantity;
        })
    }
    console.log("basics")
    console.log(basics)
    //map questions
    //get all sections:
    let questions = Object.keys(objOriginal).filter((item) => item.startsWith("section"))
    console.log(questions);
    questions.forEach((section) => {
      objOriginal[section].answers.forEach((question) => {
        //console.log('section id is '+section)
        //console.log('question id is '+question.id)
        //+1 to have a range of question answers from 1 to 7
        if (!(section == "section13" && question.id == "1"))
          questionObject[section + "question" + question.id] = parseInt(question.answer) + 1;
        else {
          console.log("age question found")
          questionObject[section + "question" + question.id] = parseInt(question.answer);
        }

      })
      questionObject[section + "timeFinished"] = objOriginal[section].timeFinished;
      console.log("just set " + section + "timeFinished")
      console.log(objOriginal[section].timeFinished)
    })
    //join objects
    let merged = { ...basics, ...basketObject, ...questionObject };
    console.log("merged:")
    console.log(merged)
    //create row with header:
    header.forEach(head => {
      row = row + merged[head] + ","
    })
    row = row.slice(0, -1);
    row = row + '\n';
    console.log("ROW: " + row);
    csv = csv + row;
  });
  return csv
}
function objectToTable(obj, header) {
  console.log(obj)
  let arr = [];
  console.log(obj)
  obj.map((rowObj) => {
    let rowArr = []
    header.map(element => {
      if (typeof rowObj[element] == "number") {
        if (rowObj[element] % 1 === 0 && element != "variant" && element != "id" && element != "visitsLandingPage" && element != "timeLandingPage" && rowObj[element] != 0) //timestamp
          rowArr.push(new Date(rowObj[element]).toLocaleDateString("fr-FR") + " " + new Date(rowObj[element]).toLocaleTimeString("fr-FR"));
        else if (rowObj[element] % 1 != 0 && rowObj[element] != null && element != "timeLandingPage" && !element.includes("Weight"))      //money
          rowArr.push(Math.round(rowObj[element] * 100) / 100 + " €");
        else if (rowObj[element] == 0)
          rowArr.push("0");
        else if (element == "timeLandingPage")
          rowArr.push(Math.round(rowObj[element] * 100) / 100 + " s");
        else if (element.includes("Weight"))
          rowArr.push(Math.round(rowObj[element] * 100) / 100 + " kg");
        else
          rowArr.push(JSON.stringify(rowObj[element]));
      }
      else
        rowArr.push(JSON.stringify(rowObj[element]));
    });
    arr.push(rowArr);
  });
  return arr;
}
function createRuns(numberOfGames, offset) {
  let obj = {};
  let i;
  for (i = offset; i < numberOfGames + offset; i++) {
    let randomNum = 5;
    obj["" + i] = []
    while (randomNum == 5) {
      randomNum = Math.floor((Math.random() * 6) % 6 + 1);
      obj["" + i].push(randomNum);
    }
  }
  return obj;
}
function uploadDiceGames(numberOfGames, addAvailableDiceGames) {
  //add numberOfGames
  addAvailableDiceGames(createRuns, numberOfGames).then(function (newCounter) {
    console.log("DiceGames successfully written! " + newCounter);
  }).catch(function (error) {
    console.error("Error writing Dicegames: ", error);
  });
}
function productFindById(id, products) {
  let res = null;
  products.forEach((cat, index) => {
    cat.products.forEach((product) => {
      if (product.id.toString() == id.toString())
        res = product;
    });
  })
  return res;
}
function calcLandingPageTime(timestamps, checkoutTime) {
  console.log(timestamps)
  let totalTimeSpent = 0;
  for (let index = 0; index < timestamps.length; index = index + 2) {
    if (index + 1 >= timestamps.length)
      totalTimeSpent = totalTimeSpent + (checkoutTime - timestamps[index]);
    else
      totalTimeSpent = totalTimeSpent + (timestamps[index + 1] - timestamps[index])
  }
  return totalTimeSpent / 1000;
}

function DataView(props) {
  const classes = useStyles();
  const fileDownload = require('js-file-download');
  const [returndata] = props.useAllData("idField", "data");
  const [finalData, setData] = useState(null);
  const [diceGames, setDiceGames] = useState(null);
  const [diceCalc, setDiceCalc] = useState(false);
  const [dataReceived, setReceived] = useState(false);

  useEffect(() => {
    console.log("FUNCTION useEffect (DataView)")
    console.log("returndata is ")
    console.log(returndata)
    if (returndata != null && !dataReceived) {
      console.log("get subcollections now");
      props.getDiceGames().then(function (doc) {
        if (doc.exists) {
          console.log("now filling diceseries...")
          console.log(doc.data())
          setDiceGames(doc.data())
        } else {
          console.log("dicegames does not exist")
        }
      }).catch(function (error) {
        console.log("db connection error", error);
      });
      props.getAllSubCollections("collections").then(function (querySnapshot) {
        console.log(querySnapshot)
        let obj = [];
        returndata.forEach((el => {
          obj.push(el);
        }))
        querySnapshot.forEach(function (doc) {
          const found = obj.find((el) => el.idField == doc.ref.parent.parent.id)
          if (found != null) {
            console.log('found ' + found.idField)
            found[doc.id] = doc.data();
          }
        });
        console.log('tada:')
        obj.forEach((experience) => {
          if (experience.basket != null) {
            experience.basketValueWT = experience.basket.basketValueWT
            experience.tax = experience.basket.tax
            experience.timeStartLandingPage = experience.basket.landingPageTimeStamps[0];
            experience.timeCheckout = experience.basket.timeCheckout;
            experience.timeLandingPage = calcLandingPageTime(experience.basket.landingPageTimeStamps, experience.timeCheckout)
            experience.visitsLandingPage = experience.basket.landingPageTimeStamps.length % 2 == 0 ? experience.basket.landingPageTimeStamps.length / 2 : (experience.basket.landingPageTimeStamps.length + 1) / 2;
            experience.carbonWeight = Math.round(experience.basket.totalCarbonWeight*100) /100;  //limit to two decimals
            experience.averageCarbonWeight = experience.basket.averageCarbonWeight;
          }
          if (experience.section12 != null)
            experience.timeFinish = experience.section12.timeFinished;
        })
        setData(obj);
      }).catch(function (error) {
        console.log("Oh no, the subcollections! : ", error);
      });;
      setReceived(true);
    }
    if (!diceCalc && diceGames != null && finalData != null) {
      let obj = finalData;
      obj.forEach((experience) => {
        experience.won = diceGames[experience.id][diceGames[experience.id].length - 1] == 6;
      });
      console.log(obj)
      setData(obj)
      setDiceCalc(true)
      console.log("rerender?")
    }
  });
  const downloadBasket = (id) => {
    console.log("download " + id)
    const dataItem = finalData.find(data => data.id == id)
    if (dataItem == null || dataItem.basket == null)
      return
    console.log(dataItem)
    let csv = "quantity, description\n";
    console.log(props.products)
    dataItem.basket.basket.forEach((item, index) => {
      let description = productFindById(item.id, props.products)["Descriptif Produit"];
      let row = item.quantity + ";" + description + "\n"
      csv = csv + row;
    })
    fileDownload(csv, "basket" + id + ".txt")
  }
  const downloadStudentIds = () => {
    console.log(props)
    let csv = "studentId,uid\n";
    props.getStudentIds().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        csv = csv + doc.id + "," + doc.data().uid + "\n";
      });
      fileDownload(csv, "studentIds.csv");
    }).catch(function (error) {
      console.log("Error getting documents: ", error);
    });

  }
  let header = [];
  let arr = [];
  if (finalData != null) {
    console.log('returned data')
    console.log(finalData)
    header = ["id", "variant", "terms", "tax", "basketValueWT", "carbonWeight", "averageCarbonWeight", "basket", "timeStart", "timeStartLandingPage", "timeLandingPage", "visitsLandingPage", "timeCheckout", "timeFinish", "mail", "won", "section1", "section2", "section3", "section4", "section5", "section6", "section7", "section8", "section9", "section10", "section11", "section12"];
    arr = objectToTable(finalData, header);
  }
  return (<div className={classes.dataview}>
    <Typography variant="h3" component="h2" gutterBottom>Données disponibles</Typography>
    <ButtonGroup variant="contained" color="primary">
      <Button onClick={() => uploadDiceGames(100, props.addAvailableDiceGames)}>Create 100 dicegames and upload them</Button>
      <Button onClick={() => fileDownload(objectToCsv(finalData, props.products, props.questions), 'export.csv')}>Download CSV</Button>
      <Button onClick={() => fileDownload(JSON.stringify(returndata, true), 'export.json')} color="primary">Download JSON</Button>
      <Button onClick={() => downloadStudentIds()} color="secondary">Download StudentIds</Button>
      <Button onClick={props.userSignOut}>Logout</Button>
    </ButtonGroup>
    {finalData == null ? <div><CircularProgress /><br></br></div> :
      <Table>
        <TableBody>
          <TableRow><TableCell></TableCell>{returndata != null && header.map((key) => (
            <TableCell key={key}>{key}</TableCell>
          ))}</TableRow>
          {returndata != null && arr.map((item, id) => (
            <TableRow><TableCell><Button variant="contained" id={item[0]} onClick={() => downloadBasket(item[0])}><ShoppingCartIcon /></Button></TableCell>
              {item.map((cell) => (
                <TableCell>{cell ? cell.length > 20 ? cell.substring(0, 30) + "..." : cell : ""}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>}
  </div>)
}
function Loginform(props) {
  const classes = useStyles();
  const [password, setPw] = useState("");
  const [mail, setMail] = useState("");
  const signInWithPW = (mail, pw) => {
    console.log("signing in with " + mail)
    props.userSignInWithMail(mail, pw)
      .then((user) => {
        console.log("got a user: ")
        console.log(user)

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
      });
  }
  return (<form><Typography variant="h3" component="h2" gutterBottom>Please log in</Typography>
    <TextField value={mail} onChange={e => { setMail(e.target.value) }} className={classes.textfield} fullWidth id="mail" label="email address" />
    <TextField type="password" value={password} onChange={e => { setPw(e.target.value) }} className={classes.textfield} fullWidth id="password" label="password" />
    <Button onClick={() => signInWithPW(mail, password)}>Login</Button></form>)
}

export default function DataStore(props) {
  const classes = useStyles();
  //returns user if connected
  const [user] = props.useConnectedUser();
  //interface value trackers
  //conditional render components
  return (
    <div>
      <Paper className={classes.root}>
        {user == null || user.email == null ? <Loginform userSignInWithMail={props.userSignInWithMail} /> : <DataView getDiceGames={props.getDiceGames} getAllSubCollections={props.getAllSubCollections} getStudentIds={props.getStudentIds} products={props.products} questions={props.questions} userSignOut={props.userSignOut} useAllData={props.useAllData} getNumDiceGames={props.getNumDiceGames} addAvailableDiceGames={props.addAvailableDiceGames} />}
      </Paper>
    </div>
  );
}