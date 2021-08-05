import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, FieldArray, reduxForm } from 'redux-form'
import { updateGeneset, fetchGeneset } from '../actions';
import {renderField, renderGenes} from './geneset_form';
import { Link } from 'react-router-dom';
import Aside from '../components/aside';
import validate from '../validate'

class GenesetsUpdate extends Component {

  componentWillMount() {
    this.props.fetchGeneset(this.props.match.params.id);
  }

  presence = value => value ? undefined : 'required!'

  onSubmit = (values) => {
    const id = this.props.match.params.id;
    this.props.updateGeneset(id, values, () => {
      this.props.history.push('/'); // Navigate after submit
    });
  }

  render() {
    return (
      <div className="view-container">
        <Aside key="aside">
          <Link to="/">
            Back to list
          </Link>
        </Aside>
        <div key="add"
             className="form-container"
             style={{ backgroundImage: "url('/assets/images/genesetnew.jpeg')"}}
        >
          <div className="overlay"></div>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <h1 style={{ textAlign: 'center', justifyContent: "center" }}>
              Update your geneset
            </h1>
            <label htmlFor="InputTitle">
              Title
            </label>
            <Field name="title"
                   type="text"
                   component={renderField}
                   validate={this.presence}
            />
            <FieldArray name="genes"
                        type="text"
                        component={renderGenes}
                        className="form-control"
            />
            <div style={{ textAlign: 'center', justifyContent: "center" }}>
              <button style={{ marginTop: 30 }}
                      type="submit"
                      disabled={!this.props.valid || this.props.pristine || this.props.submitting}
              >
                Update geneset
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    geneset: state.geneset,
    form: state.form
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { updateGeneset: updateGeneset,
      fetchGeneset: fetchGeneset
    },dispatch);
}

export default reduxForm({ form: 'updateGenesetForm' })(
  connect(mapStateToProps, mapDispatchToProps)(GenesetsUpdate)
);
