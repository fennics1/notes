import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, {mount} from 'enzyme';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', function() {

    it('should render title and timestamp', function() {
      const title = 'My titile here';
      const updatedAt = 1553488697336;
      const wrapper = mount(<NoteListItem note={{title, updatedAt}}/>);

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('3/25/2019');
    });

    it('should set default title if no title set', function() {

      const updatedAt = 1553488697336;
      const wrapper = mount(<NoteListItem note={{updatedAt}}/>);

      expect(wrapper.find('h5').text()).toBe('Untitle note');
    });

  });
}
