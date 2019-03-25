import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';

import {PrivateHeader} from './PrivateHeader';

Enzyme.configure({ adapter: new Adapter() });
if (Meteor.isClient) {
  describe('PrivateHeader', function() {
    it('should set button text to logout', function () {
      const wrapper = mount( <PrivateHeader title="Test Title" handleLogout={() => {}}/> );
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });

    it('should use title prop as h1 text', function () {
      const title ='Test title';
      const wrapper = mount( <PrivateHeader title={title} handleLogout={() => {}}/> );
      const h1Text = wrapper.find('h1').text();

      expect(h1Text).toBe(title);
    });

    it('shoud handle logout', function () {
      const spy = expect.createSpy();
      const wrapper = mount( <PrivateHeader title='Title' handleLogout={spy}/> );

      wrapper.find('button').simulate('click');
      // expect(spy.calls.length).toBe(1);
      expect(spy).toHaveBeenCalled();
    });
  });
}
