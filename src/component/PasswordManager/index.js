import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItems from '../PasswordItems'
import './index.css'

class PasswordManager extends Component {
  state = {
    newWebsite: '',
    newUsername: '',
    newPassword: '',
    searchInput: '',
    showPassword: false,
    passwordList: [],
  }

  onChangeWebsite = event => {
    this.setState({newWebsite: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({newUsername: event.target.value})
  }

  onChangePassword = event => {
    this.setState({newPassword: event.target.value})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeShowPassword = event => {
    this.setState({showPassword: event.target.checked})
  }

  addNewPassword = event => {
    event.preventDefault()
    const {newWebsite, newUsername, newPassword} = this.state
    const newUserPassword = {
      id: v4(),
      website: newWebsite,
      username: newUsername,
      password: newPassword,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newUserPassword],
      newWebsite: '',
      newUsername: '',
      newPassword: '',
    }))
  }

  renderNoPassword = () => (
    <div className="no-pass-container">
      <img
        className="no-pass-img"
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
      />
      <p>No Passwords</p>
    </div>
  )

  renderPasswordList = searchResult => {
    const {showPassword} = this.state

    return (
      <ul>
        {searchResult.map(eachPass => (
          <PasswordItems
            key={eachPass.id}
            passwordDetails={eachPass}
            showPass={showPassword}
            deletePassword={this.deletePassword}
          />
        ))}
      </ul>
    )
  }

  deletePassword = id => {
    const {passwordList} = this.state
    const filteredPassword = passwordList.filter(eachPass => eachPass.id !== id)
    this.setState({passwordList: filteredPassword})
  }

  searchPassword = () => {
    const {passwordList, searchInput} = this.state
    const searchedPassword = passwordList.filter(eachPass =>
      eachPass.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchedPassword
  }

  render() {
    const {
      newWebsite,
      newUsername,
      newPassword,
      searchInput,
      showPassword,
      passwordList,
    } = this.state
    const searchResult = this.searchPassword()
    return (
      <div className="bg-container">
        <div>
          <img
            className="app-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
          <div className="add-pass-container">
            <img
              className="pass-manager-img-1"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
            />
            <img
              className="pass-manager-img-2"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
            <form
              onSubmit={this.addNewPassword}
              className="user-input-container"
            >
              <h1>Add New Password</h1>
              <div className="input-container">
                <img
                  className="input-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <hr className="separator" />
                <input
                  value={newWebsite}
                  onChange={this.onChangeWebsite}
                  className="user-input"
                  type="text"
                  placeholder="Enter Website"
                />
              </div>
              <div className="input-container">
                <img
                  className="input-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
                <hr className="separator" />
                <input
                  value={newUsername}
                  onChange={this.onChangeUsername}
                  className="user-input"
                  type="text"
                  placeholder="Enter Username"
                />
              </div>
              <div className="input-container">
                <img
                  className="input-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
                <hr className="separator" />
                <input
                  value={newPassword}
                  onChange={this.onChangePassword}
                  className="user-input"
                  type="password"
                  placeholder="Enter Password"
                />
              </div>
              <div>
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
          <div className="saved-password-container">
            <div className="your-password">
              <div className="pass-count-container">
                <h1>Your Passwords</h1>
                <p>{searchResult.length}</p>
              </div>
              <div className="input-container">
                <img
                  className="input-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
                <hr className="separator" />
                <input
                  value={searchInput}
                  onChange={this.onChangeSearch}
                  className="user-input"
                  type="search"
                  placeholder="Search"
                />
              </div>
            </div>
            <hr />
            <div className="show-pass-cont">
              <input
                onChange={this.onChangeShowPassword}
                checked={showPassword}
                id="show-pass"
                type="checkbox"
              />
              <label htmlFor="show-pass">Show Passwords</label>
            </div>
            {searchResult.length > 0
              ? this.renderPasswordList(searchResult)
              : this.renderNoPassword()}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
