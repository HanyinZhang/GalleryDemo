import gallery from '../gallery'
import { PAGE_CLICK, PHOTO_CLICK, RECEIVE_GALLERY, RECEIVE_PHOTO } from '../../actions'

describe('gallery reducer', () => {
  const initialState = {
    currentPage: null,
    photos: [],
    photoDetail: null,
    totalPages: null
  };

  it('should return the initial state', () => {
    expect(gallery(undefined, {})).toEqual(initialState);
  });

  it('should handle PAGE_CLICK', () => {
    expect(
      gallery(initialState, {
        type: PAGE_CLICK,
        page: 12
      })
    ).toEqual(
      {
        currentPage: 12,
        photos: [],
        photoDetail: null,
        totalPages: null
      }
    );
  });

  it('should handle RECEIVE_GALLERY', () => {
    expect(
      gallery(initialState, {
        type: RECEIVE_GALLERY,
        payLoad: {
          current_page: 2,
          photos:[1,2,3],
          total_pages:20
        }
      })
    ).toEqual(
      {
        currentPage: 2,
        photos: [1,2,3],
        photoDetail: null,
        totalPages: 20
      }
    );
  });

  it('should handle RECEIVE_PHOTO', () => {
    expect(
      gallery(initialState, {
        type: RECEIVE_PHOTO,
        payLoad: {
          photo: { id:456 },
        }
      })
    ).toEqual(
      {
        currentPage: null,
        photos: [],
        photoDetail: { id:456 },
        totalPages: null
      }
    );
  });

  it('should handle PHOTO_CLICK', () => {
    const startState = {
      ...initialState,
      photos: [
        {id:5},
        {id:6},
        {id:7},
      ]
    };
    expect(
      gallery(startState, {
        type: PHOTO_CLICK,
        index: 2
      })
    ).toEqual(
      {
        currentPage: null,
        photos: [{id:5},
          {id:6},
          {id:7},
        ],
        photoDetail: { id:7 },
        totalPages: null
      }
    );
  });
});