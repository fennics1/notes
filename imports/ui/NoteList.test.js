import Reat from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {Meteor} from 'meteor/meteor';

import {NoteList} from './NoteList';

const notes = [
  {
    _id:'noteId1',
    title:'Test title',
    body:'lol',
    updatedAt:0,
    uesrId: 'userId1'
  }, {
    _id:'noteId2',
    title:'',
    body:'lol',
    updatedAt:0,
    uesrId: 'userId2'
  }
];

if (Meteor.isClient) {
  describe('NoteList', function() {

    it('should render NoteList for each note', function() {
      const wrapper = mount( <NoteList notes={notes}/> );

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('should render NoteList for each note', function() {
      const wrapper = mount( <NoteList notes={}/> );

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });

  });
}
