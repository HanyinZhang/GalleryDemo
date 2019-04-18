import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import { fetchGallery, fetchPhoto, pageClick, photoClick } from './actions';
import Gallery from './Gallery.jsx';
import Photo from './Photo';

import './App.css';

class App extends Component {
  render() {
    const { currentPage, onFetchGallery, onFetchPhoto, onPageClick,
      onPhotoClick, photoDetail, photos, totalPages } = this.props;
    return (
      <div className="App">
        <main>
          <Switch>
            <Route exact path='/' render={props => 
              <Gallery 
                {...props} 
                currentPage={currentPage}
                onFetchGallery={onFetchGallery}
                onPageClick={onPageClick}
                onPhotoClick={onPhotoClick}
                photos={photos}
                totalPages={totalPages}
              />}
            />
            <Route path='/photo/:photoId' render={props => 
              <Photo {...props}
                onFetchPhoto={onFetchPhoto} 
                photo={photoDetail}
              />}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPage: state.gallery.currentPage,
    photoDetail: state.gallery.photoDetail,
    photos: state.gallery.photos,
    totalPages: state.gallery.totalPages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchGallery: page=> {
      dispatch(fetchGallery(page))
    },
    onFetchPhoto: id=> {
      dispatch(fetchPhoto(id))
    },
    onPageClick: page => {
      dispatch(pageClick(page))
    },
    onPhotoClick: index => {
      dispatch(photoClick(index))
    }
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
