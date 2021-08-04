import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form'
import { addGeneset } from '../actions';
import { Link } from 'react-router-dom';
import {renderField, renderGenes} from './geneset_form';
import Aside from '../components/aside';
import validate from '../validate'

class GenesetsNew extends Component {
  presence = value => value ? undefined : 'required!'

  onSubmit = (values) => {
    this.props.addGeneset(values, () => {
      this.props.history.push('/'); // Navigate after submit
    });
  }

  render() {
    return (
      <div className="view-container">
        <Aside key="aside">
          <Link to="/">Back to list</Link>
        </Aside>
        <div key="add" className="form-container" style={{ backgroundImage: "url('/assets/images/genesetnew.jpeg')"}}>
          <div className="overlay"></div>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <h1 style={{ textAlign: 'center', justifyContent: "center" }}>Your new geneset</h1>
            <label htmlFor="InputTitle">Title</label>
            <Field name="title" type="text" component={renderField} validate={this.presence} />
            <FieldArray name="genes" type="text" component={renderGenes} className="form-control" />
            <div style={{  textAlign: 'center', justifyContent: "center" }}>
              <button style={{ marginTop: 30 }} type="submit" disabled={!this.props.valid || this.props.pristine || this.props.submitting}>
                Create geneset
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({ form: 'newGenesetForm' })(
  connect(null, { addGeneset })(GenesetsNew)
);
