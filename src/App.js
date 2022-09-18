import React, { Suspense, lazy, Component } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import getSvg from "./svg/getSvg";

const Home = lazy(() => import("./pages/Home/Home"));
const PDP = lazy(() => import("./queries/pdpQuery"));
const Header = lazy(() => import("./components/Header/header"));
const Cart = lazy(() => import("./pages/Cart/Cart"));

const link = from([
  new HttpLink({ uri: "https://scandiweb-test--backend.herokuapp.com" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject: (o) => (o._id ? `${o.__typename}:${o._id}` : null),
  }),
  link: link,
});

class App extends Component {
  render() {
    return (
      <Suspense
        fallback={
          <img
            alt="suspense_loader"
            src={getSvg.loader}
            style={{ position: "absolute", left: `${40}%`, top: `${40}%` }}
          />
        }
      >
        <ApolloProvider client={client}>
          <Provider store={store}>
            <BrowserRouter>
              <Header />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/cart">
                  <Cart />
                </Route>
                <Route exact path="/:product">
                  <Home />
                </Route>

                <Route exact path="/:category/:productId">
                  <PDP />
                </Route>
              </Switch>
            </BrowserRouter>
          </Provider>
        </ApolloProvider>
      </Suspense>
    );
  }
}

export default App;
