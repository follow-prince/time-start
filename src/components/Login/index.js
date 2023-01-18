import React from "react";
import { LoginFlex, LoginContainer } from "./LoginStyles";
import { useDispatch } from "react-redux";
import { auth, provider } from "../../firebase";
import { login } from "../../features/appSlice";
import LanguageIcon from "@mui/icons-material/Language";

const Login = () => {
  const dispatch = useDispatch();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        )
      )
      .catch((error) => alert(error));
  };

  return (
    <LoginContainer>
      <LoginFlex>
      <h1>W E L CO M E</h1>
        <h5> I'm Prince, I have created <br/>the website as per my knowledge,<br/> if there is any bug please let me know</h5>
        <br/>

        <button 
        onClick={signIn}
        >Sign in Google</button>
        <br/>
        <h3><a target='_blank' href="https://www.instagram.com/follow.prince">forgot password - contact us</a></h3>

      </LoginFlex>
    </LoginContainer>
  );
};

export default Login;
