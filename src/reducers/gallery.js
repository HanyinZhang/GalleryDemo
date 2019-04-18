import { RECEIVE_GALLERY, PAGE_CLICK, PHOTO_CLICK, RECEIVE_PHOTO } from '../actions';

const initialState = {
  currentPage: null,
  photos: [],
  photoDetail: null,
  totalPages: null
};

const gallery = (state = initialState, action) => {
  switch (action.type) {
    case PAGE_CLICK:
      return {
        ...state,
        currentPage: action.page
      };
    case RECEIVE_GALLERY:
      return {
        ...state,
        currentPage: action.payLoad.current_page,
        photos: action.payLoad.photos,
        totalPages: action.payLoad.total_pages
      }
    case PHOTO_CLICK:
      return {
        ...state,
        photoDetail: state.photos[action.index]
      }
    case RECEIVE_PHOTO:
      return {
        ...state,
        photoDetail: action.payLoad.photo
      }
    default:
      return state
  }
}

export default gallery;
