/* eslint-disable jsx-a11y/label-has-associated-control */
import {Component} from 'react'
import {v4 as v4uuid} from 'uuid'
import './App.css'

class App extends Component {
  state = {
    storedPasswords: [],
    username: '',
    websiteName: '',
    password: '',
    showPasswordChecked: false,
    searchInput: '',
  }

  onClickDelete = id => {
    // const {storedPasswords} = this.state
    console.log(id.value)
    // const showData = storedPasswords.filter(each => each.id !== id.target.value)
    // this.setState({storedPasswords: showData})
  }

  onClickAddButton = () => {
    const {username, websiteName, password} = this.state

    const newPassword = {
      id: v4uuid(),
      username,
      websiteName,
      password,
    }

    this.setState(prevState => ({
      storedPasswords: [...prevState.storedPasswords, newPassword],
    }))
    this.setState({password: '', username: '', websiteName: ''})
  }

  showPassword = () => {
    this.setState(prevState => ({
      showPasswordChecked: !prevState.showPasswordChecked,
    }))
  }

  onChangeWebsite = event => {
    this.setState({websiteName: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearch = event => {
    console.log(event.target.value)
    const {storedPasswords, searchInput} = this.state
    this.setState({searchInput: event.target.value})
    const filter = storedPasswords.filter(each =>
      each.websiteName.includes(event.target.value),
    )
    this.setState({storedPasswords: filter})
  }

  renderPasswordsList = () => {
    const {storedPasswords, showPasswordChecked, searchInput} = this.state
    const filterDetails = storedPasswords.filter(
      each => each.websiteName === searchInput,
    )

    return (
      <div className="list-passwords">
        <ul className="ordered-list">
          {storedPasswords.map(eachPassword => (
            <li key={eachPassword.id} className="list-item">
              <div className="profile">
                {eachPassword.websiteName.slice(0, 1).toUpperCase()}
              </div>
              <div className="details">
                <p>{eachPassword.websiteName}</p>
                <p>{eachPassword.username}</p>
                <p>
                  {showPasswordChecked ? (
                    eachPassword.password
                  ) : (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
                      alt="stars"
                      className="password-img"
                    />
                  )}
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={this.onClickDelete}
                  className="del"
                  value={eachPassword.id}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
                    alt="delete"
                    className="delete-icon"
                    value={eachPassword.id}
                  />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderTopContainer = () => {
    const {username, websiteName, password} = this.state
    return (
      <div className="top-container">
        <div className="form-container">
          <h2>Add New Password</h2>
          <div className="inputs">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
            />
            <hr />
            <input
              placeholder="Enter Website"
              onChange={this.onChangeWebsite}
              value={websiteName}
            />
          </div>

          <div className="inputs">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
            />
            <hr />
            <input
              placeholder="Enter Username"
              onChange={this.onChangeUsername}
              value={username}
            />
          </div>

          <div className="inputs">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
            />
            <hr />
            <input
              type="password"
              placeholder="Enter Password"
              onChange={this.onChangePassword}
              value={password}
            />
          </div>
          <button
            type="button"
            className="add-button"
            onClick={this.onClickAddButton}
          >
            Add
          </button>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          alt="password manager"
          className="image-lg"
        />
      </div>
    )
  }

  renderBottomContainer = () => {
    const {storedPasswords, searchInput} = this.state

    // console.log(storedPasswords)
    return (
      <div className="bottom-container">
        <div className="search-section-top">
          <h2>Your Passwords {storedPasswords.length}</h2>
          <div className="inputs search-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
              className="search-img"
            />
            <input
              type="search"
              placeholder="search"
              onChange={this.onChangeSearch}
            />
          </div>
        </div>

        <hr className="seperator" />
        <div className="checkbox-container">
          <input
            type="checkbox"
            onClick={this.showPassword}
            value={searchInput}
          />
          <label>Show Password</label>
        </div>

        {storedPasswords.length === 0 ? (
          <div className="container-img">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no password"
              className="noPassword"
            />
            <h2>No Passwords</h2>
          </div>
        ) : (
          this.renderPasswordsList()
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo"
          />

          {this.renderTopContainer()}
          {this.renderBottomContainer()}
        </div>
      </div>
    )
  }
}

export default App
