
import { useDispatch, useSelector } from 'react-redux'
import OauthLogin from '../components/OauthLogin'
import { useEffect } from 'react'
import * as sessionActions from '../store/session'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import image from "../../src/components/LoginFormPage/uwu1.gif"
import image2 from "../../src/components/LoginFormPage/uwu2.gif"
function LoginPage() {

  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  useEffect(() => {

    const userCookie = Cookies.get('gh-token')
    const googleCookie = Cookies.get('google-user')
    if (userCookie || googleCookie) {
      history.push("/rooms/1")
    }

    dispatch(sessionActions.login(googleCookie))


    try {
      const gh_access_token = Cookies.get('gh-token')


      //GITHUB
      if (gh_access_token) {
        console.log(gh_access_token)
        axios('https://api.github.com/user', {
          headers: {
            'Authorization': `Bearer ${gh_access_token}`
          }
        })
          .then(response => {
            console.log('Response:', response.data);
            dispatch(sessionActions.login(response.data.login))
          })


      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [])



  return (

    <div className='shadow login-page-container'>
      <h1 className='splash-text-h1'>Chatify</h1>
      {/* <p className='splash-text-p'>Imagine a space where you can be a member of a school club, a gaming group, or a worldwide art community. This is a place where you and your small group of friends can spend time together, and where it's easy to stay connected and communicate every day. It's a location that encourages you to hang out more often and fosters a sense of belonging.</p> */}
      <OauthLogin />

    </div>
  )
}

export default LoginPage