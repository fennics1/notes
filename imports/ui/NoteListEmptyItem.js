import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

const NoteListEmptyItem = () => {
  return (
    <div>
      <p> no shit here. create a note to get started!</p>
    </div>
  );
};

export default NoteListEmptyItem;
