import { GoogleLogin } from 'react-google-login'

const client_id = "557531000415-bskrc78cpu4c020p0al6sr7ob0rhdncu.apps.googleusercontent.com";


function OauthLogin() {

  const google = () => {
    window.open("http://localhost:8000/google", "_self")
  }

  return (
    <div>
      <button
        onClick={google}
      >asdfasdf</button>
    </div>
  )
}


export default OauthLogin