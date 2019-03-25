import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';

import {LogIn} from './LogIn';

Enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('Login', function () {

    it('should show error message', function () {
      const error ='This is not working';
      const wrapper = mount(<LogIn loginWithPassword={() => {}}/>)

      wrapper.setState({error});
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call loginWithPassword with the form data', function () {
      const email = 'fennics1@test.com';
      const password = '123456789';
      const spy = expect.createSpy();
      const wrapper = mount(<LogIn loginWithPassword={spy}/>);

      wrapper.ref('emailref').value = email;
      wrapper.ref('passwordref').value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email:email });  // arguments[0]~帳號 [1]密碼
      expect(spy.calls[0].arguments[1]).toBe( password );

    });
    it('should set loginWithPassword callback errors', function () {
      const spy = expect.createSpy();
      const wrapper = mount(<LogIn loginWithPassword = {spy}/>);

      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[2]({});  //arguments[2]~error function. pass in n empty objects
      expect(wrapper.state('error')).toNotBe('');

      spy.calls[0].arguments[2]();
      expect(wrapper.state('error')).toBe('');
    });
  });
}
