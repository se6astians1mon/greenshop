# greenshop
An online shopping simulation with integrated survey and six experimental conditions to analyze online shopping behavior with CO2 impact labels

This project provides a platform to conduct a psychological experience on buying habits. It consists of a two "pages" introducting the user to the experience, a fake webshop where one can do grocery shopping and a survey to get data about the users habits. At the end, the user can play a game of dice and win (if the dice hits 6) the basket he/she just created. The user accesses the platform with a link containing a GET parameter "brokerPanelId" that contains an individual identifier. The identifier needn't be stored in the database yet, otherwise access is blocked. After the final page this identifier is forwarded to an external link. A typical link to start the experiment looks like this: https://greensh4p.web.app/?brokerpanelid=1
The experiment has been conducted on a French speaking population, the platform is thus in French.

## Setup
The project currently uses a firebase-react-material-ui stack.
To use this project, you need node.js installed on your machine. Then clone the repository and run `npm install` to install the dependencies (material ui, react router etc.) in the project folder. You can run a development version by typing `npm start`.

All six variants have been deployed separately.

To bundle a version you can then place on any server, run `npm run build`.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Database Structure
The firestore database contains four collections:
1. data: In this initially empty collection are stored the results of the survey and the contents of the basket of the participant along start and end timestamps.
2. dicegames: contains a collection "runs" with predefined results for each id's game
3. properties: contains two collections both containing the total number of users in a field named "count" and the number of stored results in "dicegames" as a field named "total"
4. users: stores a collection for each user with the field "uid" to link uid and the email referrer in the GET parameter

## Authentification
This app uses the google authentification service. For a user to access the datastore, its mail must be present in this store and the hashed id present in the firebase rules

## Variants
- Greensh1p = no label, no CO2 tax no minimum spent amount but maximum amount of 40 €
- Greensh2p = no label, CO2 tax at 80 €, no minimum spent amount but maximum amount of 43 €
- Greensh3p = no label, CO2 tax at 250 €, no minimum spent amount but maximum amount of 48 €
- Greensh4p = label, no CO2 tax no minimum spent amount but maximum amount of 40 €
- Greensh5p = label, CO2 tax at 80 €, no minimum spent amount but maximum amount of 43 €
- Greensh6p = label, CO2 tax at 250 €, no minimum spent amount but maximum amount of 48 €

## Features
- Refer ID check: if the refer already exists, the participant cannot change its our other's previous submitted data
- Basic Browser "back" block: the application will block attempts to use the browser's back button to return to the previous step
- Data download/view interface. The page https://greensh0p.web.app/datastore allows to download the survey data as csv or view it, given registered credentials.
- Survey completion obligation: Unanswered questions are highlighted in red and the participants cannot continue.