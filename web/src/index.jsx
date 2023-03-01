import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ThemedApp from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";
import store from "./store/store";
import { getRaces } from "store/actions/racesActions";
import amplifyConfig from 'utils/amplifyConfig';
import { Amplify } from "aws-amplify";

// configure auth
Amplify.configure(amplifyConfig)

// pre-fetch to optimize page rendering
store.dispatch(getRaces((new Date()).getFullYear()))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <ThemedApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
