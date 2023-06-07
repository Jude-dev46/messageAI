import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App";
import "typeface-open-sans";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

const domain = process.env.REACT_APP_MESSAGEAI_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_MESSAGEAI_AUTH0_CLIENT_ID;

root.render(
  <Auth0Provider
    // domain="messageai.uk.auth0.com"
    domain={domain}
    // clientId="n8MfWzswklTUUjT9hWxDkosaKuTLR9nb"
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>
);
