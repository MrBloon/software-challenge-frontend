const BASE_URL = 'http://localhost:8000/genesets';

export const FETCH_GENESETS = "FETCH_GENESETS";
export const FETCH_GENESET = "FETCH_GENESET";
export const ADD_GENESET = "ADD_GENESET";
export const UPDATE_GENESET = "UPDATE_GENESET";

export function fetchGenesets() {
  const promise = fetch(`${BASE_URL}`)
    .then(response => response.json());
  return {
    type: FETCH_GENESETS,
    payload: promise
  }
}

export function fetchGeneset(id) {
  const promise = fetch(`${BASE_URL}/${id}`)
    .then(response => response.json());
  return {
    type: FETCH_GENESET,
    payload: promise
  }
}

export function addGeneset(geneset, callback) {
  const body = {
    "title": geneset.title,
    "genes": geneset.genes
  }

  const request = fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(r => r.json())
    .then(callback);
  return {
    type: ADD_GENESET,
    payload: request
  }
}

export function updateGeneset(id, geneset, callback) {
  const body = {
    "title": geneset.title,
    "genes_to_destroy": geneset.genes
  }

  const request = fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(r => r.json())
    .then(callback);
  return {
    type: UPDATE_GENESET,
    payload: request
  }
}
