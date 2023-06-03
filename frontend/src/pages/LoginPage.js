
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
    const githubCookie = Cookies.get('gh-token')
    const googleCookie = Cookies.get('google-user')

    // dispatch(sessionActions.login(googleCookie))

    //GITHUB
    if (githubCookie) {
      console.log(githubCookie)
      axios('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${githubCookie}d`
        }
      })
        .then(response => {
          user_obj = { username: response.data.login, firstName: "none", lastName: "none", email: "email@email.com", passsword: 'password' }
          return dispatch(sessionActions.login(user_obj)).catch(async (res) => {
            return dispatch(sessionActions.signup(user_obj)).catch(async (res) => {
              const data = await res.json()
              if (data && data.errors.length > 0) {
                await setErrors(data.errors)
                // console.log(errors)
                //   if (data.errors.length == 0) {
                //     history.push("/rooms/1")
                //   }
              }
            })
          })

        })
    } else if (googleCookie) {
      console.log(JSON.parse(googleCookie))
      const googleUser = JSON.parse(googleCookie)
      user_obj = { username: googleUser.displayName, firstName: googleUser.name.givenName, lastName: googleUser.name.familyName, email: "email@email.com", pasword: 'password' }
      dispatch(sessionActions.login(user_obj))
    }

  }, [])

  useEffect(() => {
    //todo make this dry (repeats)
    const githubCookie = Cookies.get('gh-token')
    const googleCookie = Cookies.get('google-user')

    //if there are session cookies redirect user if they try to access login page -- until they log out

  }, [])


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