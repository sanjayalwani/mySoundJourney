import { requestLogin } from "../../util/auth"

const ConnectButton = (props) => {
  return (
    <button className="auth-container__button" onClick={requestLogin}>
      CONNECT TO SPOTIFY
    </button>
  )
}

export default ConnectButton;
