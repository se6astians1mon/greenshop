//database related imports
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebaseConfig from '../firebase.conf.js';
import 'firebase/auth'
import 'firebase/firestore';
import firebase from 'firebase/app'

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

const useConnectedUser = () => {
    return useAuthState(auth);
}

const userSignInWithMail = (mail, pw) => {
    return auth.signInWithEmailAndPassword(mail, pw);
}
const userSignInAnonymously = () => {
    return auth.signInAnonymously();
}

const useAllData = (idField, collection) => {
    console.log("FUNCTION usealldata (FireBaseConnector)")
    console.log("collection is "+collection)
    const data = firestore.collection(collection);
    const query = data.limit(1000);
    return useCollectionData(query, { idField: idField });
}

const getAllSubCollections = (collectionName) => {
    console.log("FUNCTION getAllSubCollections (FireBaseConnector)")
    console.log("collection name "+collectionName)
    var museums = firestore.collectionGroup(collectionName);
    return museums.get()
}

const userSignOut = () => {
    auth.signOut()
}

const userExists = (userID) => {

    let docRef = firestore.collection("users").doc(userID);

    return docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("user exists")
            return "exists"
        } else {
            console.log("user doesnt exist yet")
            return "does not exist"
        }
    })
}

const getCounter = () => {
    let docRef2 = firestore.collection("properties").doc("count");

    docRef2.get().then(function (doc) {
        if (doc.exists) {
            console.log(doc.data().total)
            return doc.total
        } else {
            console.log("counter doesnt exist yet")
            return "does not exist"
        }
    }).catch(function (error) {
        console.log("db connection error", error);
    });
}

const getNumDiceGames = () => {
    let docRef2 = firestore.collection("properties").doc("dicegames");

    return docRef2.get().then(function (doc) {
        if (doc.exists) {
            console.log(doc.data().total)
            return doc.total
        } else {
            console.log("counter doesnt exist yet")
            return "does not exist"
        }
    }).catch(function (error) {
        console.log("db connection error", error);
    });
}

const incrementCounter = () => {
    firestore.collection("properties").doc("count").update({ "total": firebase.firestore.FieldValue.increment(1) })
}
const initialWrite = (uid, studentID, timestamp, calcVariant, numVariants, mailID) => {
    //sets user id, variant, timestart
    //doc refs:
	console.log("initialWrite Firebase...")
    let docCounter = firestore.collection("properties").doc("count");
    let docData = firestore.collection("data").doc(uid);
    //read counter
	console.log("mail id firebase: " + mailID);
    return firestore.runTransaction(function (transaction) {
        return transaction.get(docCounter).then(function (sfDoc) {
            let newCounter = sfDoc.data().total + 1;
            let variant = calcVariant(newCounter, numVariants)
			variant = 1
            transaction.update(docCounter, { total: newCounter });
            transaction.set(docData, { variant: variant, timeStart: timestamp, id: newCounter, mailID: mailID });
			console.log("now returning variant and counter..."+variant)
			console.log("counter: "+newCounter)
            return [variant, newCounter];
        });
    })
}
const useLoggedIn = () => {
    return firebase.auth().onAuthStateChanged();
}
const addUser = (studentID, uid) => {
    return firestore.collection("users").doc(studentID).set({
        uid: uid
    })
}
const addContent = (uid, object, collection = false, merge = true) => {
    console.log('FUNCTION addContent (FireBaseConnector)')
    console.log("object id: " + object.id + "object content: " + object.content)
    if (!collection)
        return firestore.collection("data").doc(uid).set(object, { merge: merge });
    else
        return firestore.collection("data").doc(uid).collection("collections").doc(object.id).set(object.content);
}

const addAvailableDiceGames = (createRuns, number, merge = true) => {
    console.log("now writing")
    let gameCounter = firestore.collection("properties").doc("dicegames");
    let gameData = firestore.collection("dicegames").doc("runs");
    //read counter
    return firestore.runTransaction(function (transaction) {
        return transaction.get(gameCounter).then(function (sfDoc) {
            console.log(sfDoc.data().total)
            //change ids:
            let offset = sfDoc.data().total
            let runs = createRuns(number, offset)
            let newCounter = sfDoc.data().total + number;
            console.log('new counter: ' + newCounter)
            transaction.update(gameCounter, { total: newCounter });
            transaction.set(gameData, runs, { merge: merge });
            return newCounter;
        });
    })
}
const getDiceGames = () => {
    //get id
    let docRef = firestore.collection("dicegames").doc("runs");
    return docRef.get()
}

const getUserContent = (uid) => {
    console.log("FUNCTION getUserContent")
    console.log("getting user content for " + uid)
    let docRef5 = firestore.collection("data").doc(uid);
    return docRef5.get()
}

const getStudentIds = (uid) => {
    console.log("FUNCTION getStudentIds")
    let docRef5 = firestore.collection("users");
    return docRef5.get()
}

export { getAllSubCollections, getStudentIds, getDiceGames, getUserContent, addAvailableDiceGames, getNumDiceGames, addContent, addUser, useLoggedIn, initialWrite, incrementCounter, getCounter, userExists, userSignOut, userSignInWithMail, useConnectedUser, useAllData, userSignInAnonymously };