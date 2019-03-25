import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';

import {Signup} from './Signup';

Enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('Signup', function () {

    it('should show error message', function () {
      const error ='This is not working';
      const wrapper = mount(<Signup createUser={() => {}}/>)

      wrapper.setState({error});
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call createUser with the form data', function () {
      const email = 'fennics1@test.com';
      const password = '123456789';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('emailref').value = email;
      wrapper.ref('passwordref').value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email, password });  // arguments[0]~帳號 &密碼

    });

    it('should set error if short password', function () {
      const email = 'fennics1@test.com';
      const password = '12345678  ';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>);

      wrapper.ref('emailref').value = email;
      wrapper.ref('passwordref').value = password;
      wrapper.find('form').simulate('submit');

      expect(wrapper.state('error').length).toBeGreaterThan(0);  // arguments[0]~帳號 &密碼
      expect(wrapper.state('error')).toEqual('Password must be more than 8 characters long');

    });

    it('should set loginWithPassword callback errors', function () {
      const password =  123456789;
      const reason = 'this is why it fail';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser = {spy}/>);

      wrapper.ref('passwordref').value = password;
      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[1]({ reason});  //arguments[1]~error function. pass in err message
      expect(wrapper.state('error')).toEqual(reason);

      spy.calls[0].arguments[1]();
      expect(wrapper.state('error')).toBe('');
    });
  });
}
