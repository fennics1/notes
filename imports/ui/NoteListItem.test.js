import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, {mount} from 'enzyme';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', function() {
    let Session;

    beforeEach(() => {
      Session={
        set: expect.createSpy()
      };
    });

    it('should render title and timestamp', function() {
      const title = 'My titile here';
      const updatedAt = 1553488697336;
      const wrapper = mount(<NoteListItem note={{title, updatedAt}} Session={Session}/>);

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('3/25/2019');
    });

    it('should set default title if no title set', function() {

      const updatedAt = 1553488697336;
      const wrapper = mount(<NoteListItem note={{updatedAt}} Session={Session}/>);

      expect(wrapper.find('h5').text()).toBe('Untitle note');
    });

    it('should call set on click', function() {

      const _id = 'noteId1';
      const wrapper = mount(<NoteListItem note={{_id}} Session={Session}/>);
      wrapper.find('div').simulate('click');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', _id);
    });

  });
}
