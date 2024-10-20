//Component to display a question. A question has an id, can have an image, a question and an array of possible answers.
//props check=boolean to say whether the question is ok colored="yes"/"no" question=question object form="list" or "column" how the answer options are to displayed, setAnswer=if the answer is set
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { isMobile } from 'react-device-detect';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "30px",

  },
  answers: {
    display: "table"
  },
  img: {
    display: "block",
    width: "200px",
  },
  imgTitle: {
    display: "block",
    marginTop: "20px"
  },
  exLabel: {
    display: "table-cell",
    verticalAlign: "middle"
  }
}));


export default function Question(props) {
  console.log("COMPONENT Question")
  console.log(props)
  const val = props.value(props.question.id);
  const classes = useStyles();
  const textInput = () => {
    return (<TextField id="standard-basic" label={props.question.Question} onChange={handleChange} />)
  }
  const answercomponent = () => {
    return (
      <RadioGroup column={(props.form == "list" || isMobile) ? 1 : 0} row={(props.form != "list" && !isMobile) ? 1 : 0} aria-label="position" name="position" value={val} onChange={handleChange}>
        {props.question.Answer.map((item, i) => (
          <FormControlLabel
            key={item.id}
            value={"" + i}
            control={<Radio color="primary" />}
            label={item}
            labelPlacement={(props.form == "list" || isMobile) ? "end" : "bottom"}
          />
        ))
        }
      </RadioGroup>);
  }
  const handleChange = (event) => {
    console.log("FUNCTION handlechange (Question)")
    console.log("value: " + event.target.value)
    props.setAnswer(props.question.id, event.target.value)

  };

  return (
    <div className={classes.root} style={props.colored == "yes" && props.check ? { backgroundColor: "red" } : {}}>
      <Typography variant="h6" component="span" gutterBottom >
        {props.question.Question}
      </Typography>
      {props.question.image != null ? <Typography variant="subtitle1" component="span" className={classes.imgTitle} gutterBottom >{props.question.imageTitle}</Typography> : ""}
      {props.question.image != null ? <img className={classes.img} src={props.question.image} /> : ""}
      <div className={classes.answers}>
        {props.question.extremeLabels != null ? isMobile ? <div className={classes.exLabelMob}>{props.question.extremeLabels[0]}</div>: <div className={classes.exLabel}>{props.question.extremeLabels[0]}</div> : ""}
        <FormControl component="fieldset">
          {props.question.Answer != null ? answercomponent() : textInput()}
        </FormControl>
        {props.question.extremeLabels != null ? isMobile ? <div className={classes.exLabelMob}>{props.question.extremeLabels[1]}</div>: <div className={classes.exLabel}>{props.question.extremeLabels[1]}</div> : ""}
      </div>
    </div>
  );
}