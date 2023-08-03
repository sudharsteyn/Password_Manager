import './index.css'

const PasswordItems = props => {
  const {passwordDetails, showPass, deletePassword} = props
  const {id, website, username, password} = passwordDetails
  const initial = username.slice(0, 1).toUpperCase()
  const displayStars = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  )
  const displayPassword = () => <p>{password}</p>
  const onDelete = () => {
    deletePassword(id)
  }
  return (
    <li>
      <div>
        <p>{initial}</p>
      </div>
      <div>
        <p>{website}</p>
        <p>{username}</p>
        {showPass ? displayPassword() : displayStars()}
      </div>
      <button data-testid="delete" onClick={onDelete} type="button">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItems
