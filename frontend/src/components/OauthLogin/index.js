

const client_id = "557531000415-bskrc78cpu4c020p0al6sr7ob0rhdncu.apps.googleusercontent.com";

const styles = {
  border: 'none',
  background: '#42A7E6',
  width: '50%',
  color: 'white'
}


function OauthLogin() {

  const google = () => {
    window.open("http://localhost:8000/google", "_self")
  }

  return (
    <div>
      <button className='login-button' onClick={google} style={styles}>Google      <i className="fa-brands fa-google" style={{ color: 'white' }}></i></button>

    </div>
  )
}


export default OauthLogin