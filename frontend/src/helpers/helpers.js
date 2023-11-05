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

// User Auth
// Managing user authentication and authorisation

export const postRegister = (body, token) => {
  return postRequest('/user/auth/register', body, token)
};

export const postLogin = (body, token) => {
  return postRequest('/user/auth/login', body, token)
};

export const postLogout = (body, token) => {
  return postRequest('/user/auth/logout', body, token)
};

// Listing Management
// Managing listings

export const getListings = (token) => {
  return getRequest('/listings', token)
};

export const postNewListing = (body, token) => {
  return postRequest('/listings/new', body, token)
};

export const getListingFromId = (listingId, token) => {
  const path = '/listings/' + listingId
  return getRequest(path, token)
};

export const putUpdateListing = (listingId, body, token) => {
  const path = '/listings/' + listingId
  return putRequest(path, body, token)
}

export const deleteListing = (listingId, token) => {
  const path = '/listings/' + listingId
  return deleteRequest(path, token)
};

export const putPublishListing = (listingId, body, token) => {
  const path = '/listings/publish/' + listingId
  return putRequest(path, body, token)
}

export const putUnpublishListing = (listingId, token) => {
  const path = '/listings/unpublish/' + listingId
  const body = {}
  return putRequest(path, body, token)
}

export const putListingReview = (listingId, bookingId, body, token) => {
  const path = '/listings/' + listingId + '/review/' + bookingId
  return putRequest(path, body, token)
}

// Booking Management
// Managing bookings
