import { GoogleLogout } from 'react-google-login'

const client_id = "557531000415-bskrc78cpu4c020p0al6sr7ob0rhdncu.apps.googleusercontent.com";


function OauthLogout() {


  const onSuccess = (res) => {
    console.log("logout success");

  }

  return (
    <div>
      <GoogleLogout
        client_id={client_id}
        buttonText='Logout'
        onSuccess={onSuccess}
      />
    </div>
  )
}


export default OauthLogout