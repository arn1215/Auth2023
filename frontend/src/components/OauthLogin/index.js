

const client_id = "557531000415-bskrc78cpu4c020p0al6sr7ob0rhdncu.apps.googleusercontent.com";

const gh_id = "503dfae28eaffbfd1e8a"

function OauthLogin() {

  const google = () => {
    window.open("http://localhost:8000/google", "_self")
  }

  const gh = () => {
    window.open("http://localhost:8000/github", "_self")
  }

  return (
    <div className="login-form">

      <button className='login-button' onClick={google} ><i className="fa-brands fa-google" style={{ color: 'white', fontSize: '28px' }}></i></button>

      <button className='login-button' onClick={gh} ><i className="fa-brands fa-github" style={{ color: 'white', fontSize: '28px' }}></i></button>

      {/* <button className='login-button' onClick={gh} ><i className="fa-brands fa-facebook" style={{ color: 'white', fontSize: '28px' }}></i></button>

      <button className='login-button' onClick={gh} ><i className="fa-brands fa-apple" style={{ color: 'white', fontSize: '28px' }}></i></button>
    */}
    </div>

  )
}


export default OauthLogin