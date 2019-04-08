import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
  handleBodyChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      body: e.target.value
    });
  }
  handleTitleChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      title: e.target.value
    });
  }
  handleDelete() {
    this.props.call('notes.remove', this.props.note._id)
  }
  render() {
    if (this.props.note) {
      return (
        <div>
          <input value={this.props.note.title} placeholder="Untitle Note" onChange={this.handleTitleChange.bind(this)}></input>
          <textarea value={this.props.note.body} placeholder ="Your note here" onChange={this.handleBodyChange.bind(this)}/>
          <button onClick={this.handleDelete.bind(this)}>Delete Note</button>
        </div>
      );
    } else {
      return (
        <p>
        {this.props.selectedNoteId ? 'ntoe not found.': 'Pick or create a note to get started!'}
        </p>
      );
    }
  }
};

Editor.porpTypes = {
  selectedNoteId: PropTypes.string,
  note: PropTypes.object
}


export default withTracker(() => {
  const selectedNoteId = Session.get('selectedNoteId')

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
})(Editor);
