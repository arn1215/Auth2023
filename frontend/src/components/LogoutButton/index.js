import { useDispatch } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import { logout } from '../../store/session'

function LogoutButton() {

  const dispatch = useDispatch()
  const history = useHistory()
  const onClick = async () => {
    await dispatch(logout())
    history.push("/")


  }

  return (
    <button onClick={onClick}>LogoutButton</button>
  )
}

export default LogoutButton