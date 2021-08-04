const validate = values => {
  const errors = {}
  if (!values.geneset) {
    errors.geneset = 'Required'
  }

  return errors
}

export default validate
