import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

const renderField = ({ input, type, meta: { touched, error, warning } }) => {
  return (
    <div className="form-group">
      <input
        className="form-control"
        type={type}
        placeholder="test"
        {...input}
      />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  );
};

// const renderGenes = ({ fields, meta: { error, submitFailed } }) => {
//   return (
//     <ul>
//       <li>
//         <a type="button" onClick={() => fields.push({})}>
//           Add Gene
//         </a>
//         {submitFailed && error && <span>{error}</span>}
//       </li>
//       {fields.map((gene, index) => (
//         <li key={index}>
//           <h4>Gene #{index + 1}</h4>
//           <Field
//             name={`${gene}.name`}
//             type="text"
//             component={renderField}
//             label="Name"
//           />
//           <a
//             type="button"
//             title="Remove Gene"
//             onClick={() => fields.remove(index)}>
//             Remove Gene
//           </a>
//         </li>
//       ))}
//     </ul>
//   );
// };

export default renderField

