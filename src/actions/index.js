export const PAGE_CLICK = 'PAGE_CLICK';
export const pageClick = page => ({
  type: PAGE_CLICK,
  page,
});

export const REQUEST_GALLERY = 'REQUEST_GALLERY';
function requestGallery(page) {
  return {
    type: REQUEST_GALLERY,
    page
  }
}

export const RECEIVE_GALLERY = 'RECEIVE_GALLERY';
function receiveGallery(page, json) {
  return {
    type: RECEIVE_GALLERY,
    page,
    payLoad: json
  }
}

const API_URL = 'https://api.500px.com/v1/photos';
const customerKey = process.env.REACT_APP_API_KEY;
export function fetchGallery(page) {
  return function(dispatch) {
    dispatch(requestGallery(page));
    let apiUrl = `${API_URL}?feature=popular&consumer_key=${customerKey}&image_size=2,4`;
    if(page) {
      apiUrl = apiUrl + `&page=${page}`;
    }
    return fetch(apiUrl)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveGallery(page, json))
      )
  }
}

export const PHOTO_CLICK = 'PHOTO_CLICK';
export function photoClick(index) {
  return {
    type: PHOTO_CLICK,
    index
  }
}

export const RECEIVE_PHOTO = 'RECEIVE_PHOTO';
function receivePhoto(json) {
  return {
    type: RECEIVE_PHOTO,
    payLoad: json
  }
}

export function fetchPhoto(id) {
  return function(dispatch) {
    const apiUrl = `${API_URL}/${id}?consumer_key=${customerKey}&image_size=4`;
    return fetch(apiUrl)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receivePhoto(json))
      )
  }
}
