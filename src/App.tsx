import React from "react";
import { Provider } from "react-redux";
import Router from "./common/router/Router";
import store from "./store/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router />
        <ToastContainer />
      </Provider>
    </div>
  );
};

export default App;
