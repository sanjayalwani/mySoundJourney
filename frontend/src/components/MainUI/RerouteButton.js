import { useHistory } from "react-router-dom";

import './RerouteButton.css';

const RerouteButton = (props) => {
  const history = useHistory();

  function reroute() {
    history.push(props.path);
  }
  return (
    <button className="reroute-button" onClick={reroute}>
      {props.buttonText}
    </button>
  )
}

export default RerouteButton;
