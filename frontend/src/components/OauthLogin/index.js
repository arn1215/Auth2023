

function OauthLogin() {

  const google = () => {
    window.open("http://localhost:8000/api/google", "_self")
  }

  const gh = () => {
    window.open("http://localhost:8000/api/github", "_self")
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