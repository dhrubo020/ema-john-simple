import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';


export const initializeFirebaseLogin = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}


export const googleSignIn = () => { //--------------------------------------------------SignIn clicked
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(result => {
            const token = result.credential.accessToken;
            const { displayName, email, photoURL } = result.user;
            const userData = {
                isLogIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return userData;
            //console.log(user, displayName, email, photoURL);
        })
        .catch(err => console.log(err.message))
}

export const signInWithFb = () => { //--------------------------------------------------Facebook SignIn
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        user.success = true;
        return user;
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
}

export const signOutClicked = () => { //-------------------------------------------------- Sign out clicked
    return firebase.auth().signOut().then(result => {
        const user = {
            isLogIn: false,
            name: '',
            photo: '',
            email: ''
        }
        return user;
    }).catch(err => {
        console.log(err.message)
    });
}

export const createUserWithEmailAndPassword = (name, email, password) => { // ------------- create user with password
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
            console.log(res)
        })
        .catch(function (error) {
            console.log("user not created in database")
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
        });
}

export const signInWithEmailAndPassword = (email, password) => { // ------------- sign in with password
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch(function (error) {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo
        });
}

const updateUserName = name => {    //-------------------------------------------------- update in database
    var user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name,
    }).then(function () {
        console.log('User name updated successfully')
    }).catch(function (error) {
        console.log(error)
    });
}