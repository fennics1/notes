import {Meteor} from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFoundsfc from '../ui/NotFound';
import LogIn from '../ui/LogIn';

window.browserHistory = browserHistory;

const onEnterNotePage = (nextState) => {
  console.log(nextState);
  Session.set('selectedNoteId', nextState.params.id);
  // const currentPathName = nextState.location.pathname;
  // console.log(currentPathName);
};
const onLeaveNotePage = () => {
  Session.set('selectedNoteId', undefined);
};
export const onAuthChange = (isAuthenticated, currentPagePrivacy) => {
  // const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = currentPagePrivacy === 'unauth';
  const isAuthenticatedPage = currentPagePrivacy === 'auth';

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};
export const globalOnChange = (prevState, nextState) => {
  globalOnEnter(nextState);
};
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length -1];
  Session.set('currentPagePrivacy', lastRoute.privacy);
};
export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={LogIn} privacy="unauth"/>
      <Route path="/signup" component={Signup} privacy="unauth"/>
      <Route path="/dashboard" component={Dashboard} privacy="auth"/>
      <Route path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterNotePage} onLeave={onLeaveNotePage}/>
      <Route path="*" component={NotFoundsfc}/>
    </Route>
  </Router>
);
