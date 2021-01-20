import React from 'react';
import './Test.css';

function Test(props) {
  return (
    <div>
      <button className="btn-test" onClick={props.showAndHidePreloader}>Preloader</button>
      <button className="btn-test" onClick={props.showAndHideNotFound}>Not Found</button>
      <button className="btn-test" onClick={props.makelogin}>Login</button>
    </div>
  );
}

export default Test;