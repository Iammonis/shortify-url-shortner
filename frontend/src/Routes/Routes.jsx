import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "../Components/Home";
import { Redirect } from "../Components/Redirect";
import { Stats } from "../Components/Stats";
import { PageNotFound } from "../Components/PageNotFound";
import { DarkModeSwitch } from "../Components/DarkModeSwitch";

export const Routes = () => {
  return (
    <>
      <DarkModeSwitch />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/404">
          <PageNotFound />
        </Route>
        <Route path="/stats/:code">
          <Stats />
        </Route>
        <Route path="/:code">
          <Redirect />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </>
  );
};
