import { useDispatch } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import { logout } from '../../store/session'

function LogoutButton() {

  const dispatch = useDispatch()
  const history = useHistory()
  const onClick = async () => {
    await dispatch(logout())
    history.push("/")


  }

  return (
 
      <button 
      onClick={onClick} 
      className="form-element" 
      data-tooltip-id="logout"
      data-tooltip-content="Log Out"
      data-tooltip-variant="light">
        <i className='fas fa-sign-out-alt' style={{ color: 'white', fontSize: '28px' }}></i>
        <Tooltip id="logout" place='right' />
      </button>

  )
}

export default LogoutButton