import { BACKEND_PORT } from '../config.json';

const postRequest = (path, body, token) => {
  fetch(`http://localhost:${BACKEND_PORT}` + path, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        return data;
      }
    });
};

const getRequest = (path, token) => {
  fetch(`http://localhost:${BACKEND_PORT}` + path, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        return data;
      }
    });
};

const putRequest = (path, body, token) => {
  return fetch(`http://localhost:${BACKEND_PORT}` + path, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        return data;
      }
    });
};

const deleteRequest = (path, token) => {
  return fetch(`http://localhost:${BACKEND_PORT}` + path, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        return data;
      }
    });
};

export const postRegister = (body, token) => {
  return postRequest('/user/auth/register', body, token)
};

export const postLogin = (body, token) => {
  return postRequest('/user/auth/login', body, token)
};

export const postLogout = (body, token) => {
  return postRequest('/user/auth/logout', body, token)
};

export const getListings = (token) => {
  return getRequest('/listings', token)
};

export const postNewListing = (body, token) => {
  return postRequest('/listings/new', body, token)
};

export const getListingFromId = (listingId, token) => {
  return getRequest('/listings/' + listingId, token)
};

export const putUpdateListing = (listingId, body, token) => {
  return putRequest('/listings/' + listingId, body, token)
}

export const deleteListing = (listingId, token) => {
  return deleteRequest('/listings/' + listingId, token)
};

export const putPublishListing = (listingId, body, token) => {
  return putRequest('/listings/publish/' + listingId, body, token)
}

export const putUnpublishListing = (listingId, token) => {
  return putRequest('/listings/unpublish/' + listingId, {}, token)
}

export const putListingReview = (listingId, bookingId, body, token) => {
  return putRequest('/listings/' + listingId + '/review/' + bookingId, body, token)
}
