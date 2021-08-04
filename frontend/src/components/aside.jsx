import React from 'react';

const Aside = (props) => {
  return (
    <div className="aside">
      <div className="illustration" style={{backgroundImage: "url('/assets/images/lab.jpeg')"}}></div>
      <img className="logo" src="/assets/images/el.jpeg" alt="logo" />
      <p>Genomic data-driven drug design for precision oncology</p>
      {props.children}
    </div>
  );
}

export default Aside;

