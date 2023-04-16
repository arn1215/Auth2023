
import { useDispatch, useSelector } from 'react-redux'
import OauthLogin from '../components/OauthLogin'
import { useEffect } from 'react'
import * as sessionActions from '../store/session'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'


function LoginPage() {

  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const [oauthPlatform, setOauthPlatform] = useState("")
  const [errors, setErrors] = useState([])


  useEffect(() => {
    let user_obj;
    const githubCookie = Cookies.get('gh-token');
    const googleCookie = Cookies.get('google-user');

    const fetchData = async () => {
      try {
        if (githubCookie) {
          const response = await axios('https://api.github.com/user', {
            headers: {
              'Authorization': `Bearer ${githubCookie}`
            }
          });
          user_obj = { username: response.data.login, firstName: "none", lastName: "none", email: "email@email.com", passsword: 'password' };
        } else if (googleCookie) {
          const googleUser = JSON.parse(googleCookie);
          user_obj = { username: googleUser.displayName, firstName: googleUser.name.givenName, lastName: googleUser.name.familyName, email: "email@email.com", pasword: 'password' };
        }
        const loginResponse = await dispatch(sessionActions.login(user_obj));
        history.push("/rooms/1");
        return loginResponse;
      } catch (err) {
        const data = await err.json();
        if (data && data.errors.length > 0) {
          setErrors(data.errors);
          // console.log(errors)
        }
        const signupResponse = await dispatch(sessionActions.signup(user_obj));
        history.push("/rooms/1");
        return signupResponse;
      }
    };
    fetchData();

    return () => {
      // cleanup function if needed
    };
  }, [dispatch, history]);


  return (

    <div className='shadow login-page-container'>
      <h1 className='splash-text-h1'>Chatify</h1>
      {errors.length ? errors.map(
        (err) => <p>{err}</p>
      ) : null}
      {/* <p className='splash-text-p'>Imagine a space where you can be a member of a school club, a gaming group, or a worldwide art community. This is a place where you and your small group of friends can spend time together, and where it's easy to stay connected and communicate every day. It's a location that encourages you to hang out more often and fosters a sense of belonging.</p> */}
      <OauthLogin />

    </div>
  )
}

export default LoginPage