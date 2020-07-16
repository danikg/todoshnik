import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "babel-polyfill";

import App from "./components/App";

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("todoshnik-app")
);
