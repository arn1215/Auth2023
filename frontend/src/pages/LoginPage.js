
import { useDispatch, useSelector } from 'react-redux'
import OauthLogin from '../components/OauthLogin'
import { useEffect } from 'react'
import * as sessionActions from '../store/session'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
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

    else if (googleCookie) {
      dispatch(sessionActions.login({ user: googleCookie }))
    }

    try {
      const access_token = Cookies.get('gh-token')
      console.log(access_token)
      axios('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      })
        .then(response => {
          console.log('Response:', response.data);
          dispatch(sessionActions.login(response.data.login))
        })
    } catch (error) {
      console.error('Error:', error);
    }
  }, [])



  return (
    <div className='shadow login-page-container'>
      <OauthLogin />
    </div>
  )
}

export default LoginPage