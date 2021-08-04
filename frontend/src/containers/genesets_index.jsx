import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchGenesets, fetchGeneset } from '../actions/index.js'
import Aside from '../components/aside';

class GenesetsIndex extends Component {
  componentWillMount(id) {
    this.props.fetchGenesets(id);
  }

  handleClick = (id) => {
    this.props.fetchGeneset(id);
  }

  displayDuplicate = (geneset) => {
    const genes = geneset.genes.map((gene) => gene.name);
    const isDuplicate = genes.some((item, index) => index !== genes.indexOf(item));

    if (isDuplicate) {
      return (
        <span className="warning">&#9888; You have duplicate genes</span>
      );
    }
  }

  renderGenesets = (geneset) => {
    this.displayDuplicate(geneset)
    return (
      <div key={geneset.id} className="geneset-smallad">
        <img className="geneset-logo" src="assets/images/geneset.jpeg" />
        <div className="geneset-details">
         <span>{geneset.title}</span>
         {this.displayDuplicate(geneset)}
          <ul>
            {geneset.genes.map((gene) => {
              return (
                <li key={gene.id}>{gene.name}</li>
              );
            })}
          </ul>
        </div>
        <Link to={`/genesets/update/${geneset.id}`} onClick={() => this.handleClick(geneset.id)} className="update">Update</Link>
      </div>
    );
  }

  render() {
    if (this.props.genesets.length === 0) {
      return [
        <Aside key="aside" >
          <Link to="/genesets/new">Create a geneset</Link>
        </Aside>,
        <div className="no-geneset" key="nogeneset">No geneset yet</div>
      ];
    }
    return (
      <div className="view-container">
        <Aside>
          <Link to="/genesets/new">Add a geneset</Link>
        </Aside>
        <div className="list-container">
          {this.props.genesets.map(this.renderGenesets)}
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    genesets: state.genesets
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchGenesets: fetchGenesets,
      fetchGeneset: fetchGeneset
    },dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(GenesetsIndex);
