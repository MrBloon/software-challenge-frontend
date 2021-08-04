import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, FieldArray, reduxForm } from 'redux-form'
import { addGeneset, fetchGeneset } from '../actions';
import renderField from './geneset_form';
import { Link } from 'react-router-dom';
import Aside from '../components/aside';
import validate from '../validate'

class GenesetsUpdate extends Component {
  // componentWillMount() {
  //   this.props.fetchGeneset(this.props.match.params.id);
  // }


  presence = value => value ? undefined : 'required!'

  onSubmit = (values) => {
    this.props.addGeneset(values, () => {
      this.props.history.push('/'); // Navigate after submit
    });
  }

  renderGenes = ({ fields, meta: { error, submitFailed } }) => {
    return (
      <ul>
        <li>
          <a type="button" onClick={() => fields.push({})}>
            Add Gene
          </a>
          {submitFailed && error && <span>{error}</span>}
        </li>
        {fields.map((gene, index) => (
          <li key={index}>
            <h4>Gene #{index + 1}</h4>
            <Field
              name={`${gene}.name`}
              type="text"
              component={renderField}
              label="Name"
            />
            <a
              type="button"
              title="Remove Gene"
              onClick={() => fields.remove(index)}>
              Remove Gene
            </a>
          </li>
        ))}
      </ul>
    );
  };

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
                        component={this.renderGenes}
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
    { addGeneset: addGeneset,
      fetchGeneset: fetchGeneset
    },dispatch);
}

export default reduxForm({ form: 'updateGenesetForm', initialValues: {title: "this.props.geneset.title"} })(
  connect(mapStateToProps, mapDispatchToProps)(GenesetsUpdate)
);
