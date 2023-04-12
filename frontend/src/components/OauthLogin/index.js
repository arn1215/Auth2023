import { useDispatch } from 'react-redux'
import { loginWithGoogle } from '../../store/session'
import { Tooltip } from 'react-tooltip';
import image from "../LoginFormPage/uwu1.gif"
import image2 from "../LoginFormPage/uwu2.gif"
function OauthLogin() {

  const dispatch = useDispatch()

  const google = () => {
    window.open("http://localhost:8000/api/google", "_self")
  }

  const gh = () => {
    window.open("http://localhost:8000/api/github", "_self")
  }

  return (
    <div className="login-form">
      <img className='splash-uwu' src={image} alt="uwu" />
      <img className='splash-uwu-2' src={image2} alt="uwu" />
      <h2 className='login-text'>Log in with: </h2>

      <button
        data-tooltip-id="google"
        data-tooltip-content="Google"
        data-tooltip-variant="light" className='login-button' onClick={google} ><i className="fa-brands fa-google" style={{ color: 'white', fontSize: '28px' }}></i></button>
      <Tooltip id="google" />
      <button
        data-tooltip-id="GitHub"
        data-tooltip-content="GitHub"
        data-tooltip-variant="light" className='login-button' onClick={gh} ><i className="fa-brands fa-github" style={{ color: 'white', fontSize: '28px' }}></i></button>
      <Tooltip id="GitHub" />

      {/* <button className='login-button' onClick={gh} ><i className="fa-brands fa-facebook" style={{ color: 'white', fontSize: '28px' }}></i></button>

      <button className='login-button' onClick={gh} ><i className="fa-brands fa-apple" style={{ color: 'white', fontSize: '28px' }}></i></button> */}

    </div>

  )
}


export default OauthLogin