import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';
import { Notes } from '../api/notes';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    this.props.call('notes.update', this.props.note._id, { body });
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    this.props.call('notes.update', this.props.note._id, { title });
  }
  handleDelete() {
    this.props.call('notes.remove', this.props.note._id)
    this.props.browserHistory.push('/dashboard');
  }
  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteID = prevProps.note ? prevProps.note._id : undefined;

    if ( currentNoteId && currentNoteId !== prevNoteID) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      })
    }
  }
  render() {
    if (this.props.note) {
      return (
        <div>
          <input value={this.state.title} placeholder="Untitle Note" onChange={this.handleTitleChange.bind(this)}></input>
          <textarea value={this.state.body} placeholder ="Your note here" onChange={this.handleBodyChange.bind(this)}/>
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
  note: PropTypes.object,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
}


export default withTracker(() => {
  const selectedNoteId = Session.get('selectedNoteId')

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  };
})(Editor);
