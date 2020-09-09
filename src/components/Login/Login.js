import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeFirebaseLogin, googleSignIn, signOutClicked, signInWithFb, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LogInManager';

function Login() {
    initializeFirebaseLogin();

    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isLogIn: false,
        name: '',
        photo: '',
        email: '',
        password: '',
        success: false,
        error: ''
    })
    

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } }

    const googleSignInClicked = () => {
        googleSignIn()
            .then(res => {
                handleResponse(res, true)
            })
    }
    const googleSignOut = () =>{
        signOutClicked()
            .then(res=>{
                handleResponse(res, false)
            })
    }
    const fbSignIn = () =>{
        signInWithFb()
            .then(res =>{
                handleResponse(res, true)
            })
    }

    const handleBlur = (e) => { //-------------------------------------------------- input onBlur / onchange
        let formValid = true;
        if (e.target.name === 'email') {
            const re = /\S+@\S+\.\S+/;
            formValid = re.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const length = e.target.value.length > 5;
            const hasNumber = /\d{1}/.test(e.target.value);

            if (length && hasNumber) {
                formValid = true;
            } else {
                formValid = false;
            }
        }
        if (formValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        } else {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = '';
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => { //-------------------------------------------------- Submit form action to database
        console.log(user)
        if (newUser && user.email && user.password) { //---------------------------------create new user / sign up
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true)
                })
        }

        if (!newUser && user.email && user.password) { //-------------------------------------------------- log in / sign in
            signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                handleResponse(res, true)
            })
        }
        e.preventDefault();
    }

    const handleResponse=(res, redirect)=>{
        setUser(res)
        setLoggedInUser(res)
        redirect && history.replace(from);
    }

    return ( //-------------------------------------------------- UI 
        <div className="App">
            <center>
                <h3>Our own Authentication</h3>
                <p>{user.email} {user.password}</p>
                <form onSubmit={handleSubmit}>
                    <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUserCheck" id="" /> <label htmlFor="newUser">New User Sign Up</label> <br /><br />
                    {newUser && <> <input type="text" name="name" onChange={handleBlur} placeholder="Name" required /><br /><br /></>}

                    <input type="text" name="email" onChange={handleBlur} placeholder="Email" required />
                    <br />
                    <br />
                    <input type="password" name="password" onChange={handleBlur} placeholder="Password" required />
                    <br />
                    <br />
                    <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
                </form>


                {user.error && <p style={{ color: 'red' }}>{user.error}</p>}
                {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Sign Up' : 'Login'} Success</p>}

                {
                    user.isLogIn ? <div>
                        <p>Welcome {user.name}</p>
                        <p>Your Email : {user.email}</p>
                        <img src={user.photo} height="60" alt="" />
                        <br />
                        <button onClick={googleSignOut}>Sign Out</button>
                    </div>
                        :
                        <div>
                            <br /> <br />
                            <button onClick={googleSignInClicked}>Sign In With Google</button> <br /> <br />
                            <button onClick={fbSignIn}>Sign In With Facebook</button>
                        </div>

                }
            </center>
        </div>
    );
}

export default Login;
