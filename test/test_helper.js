import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';

//Setting up testing environment to run like a browser in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
const $ = _$(window); //$ is going to try using the browser's window. But there isnt one, hence we explicitly tell it to use the global window we have defined.

chaiJquery(chai, chai.util, $);

function renderComponent(ComponentClass, props = {}, state = {}) {

  //Wherever use JSX, you have to import React.

  const componentInstance =  TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} /> 
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance)); //produces HTML
}

$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value); //this is reference to selected HTML element that we want to perform an action upon.
  }
  TestUtils.Simulate[eventName](this[0]);
};

export {renderComponent, expect};
