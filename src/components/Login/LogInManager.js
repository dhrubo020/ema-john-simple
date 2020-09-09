import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';

export const initializeFirebaseLogin =()=>{
    firebase.initializeApp(firebaseConfig);
}

const LogInManager = () => {
    return (
        <div>

        </div>
    );
};

export default LogInManager;