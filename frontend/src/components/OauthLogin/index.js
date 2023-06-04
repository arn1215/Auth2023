import { useDispatch } from 'react-redux'
import { loginWithGoogle } from '../../store/session'
import { Tooltip } from 'react-tooltip';
import image from "../LoginFormPage/uwu1.gif"
import image2 from "../LoginFormPage/uwu2.gif"
import image3 from "../LoginFormPage/images.png"
import LoginFormPage from '../LoginFormPage';
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
      {/* <img className='splash-uwu-3' src={image3} alt="uwu" /> */}
      <LoginFormPage />
      {/* <button
        data-tooltip-id="google"
        data-tooltip-content="Google"
        data-tooltip-variant="light" className='form-element' onClick={google} ><i className="fa-brands fa-google" style={{ color: 'white', fontSize: '28px' }}></i></button>
      <Tooltip id="google" />
      <button
        data-tooltip-id="GitHub"
        data-tooltip-content="GitHub"
        data-tooltip-variant="light" className='form-element' onClick={gh} ><i className="fa-brands fa-github" style={{ color: 'white', fontSize: '28px' }}></i></button>
      <Tooltip id="GitHub" /> todo */}

      {/* <button className='form-element' onClick={gh} ><i className="fa-brands fa-facebook" style={{ color: 'white', fontSize: '28px' }}></i></button>

      <button className='form-element' onClick={gh} ><i className="fa-brands fa-apple" style={{ color: 'white', fontSize: '28px' }}></i></button> */}

    </div>

  )
}


export default OauthLogin