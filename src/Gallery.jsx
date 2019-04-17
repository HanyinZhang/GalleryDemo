import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchGallery, pageClick, photoClick } from './actions';

import './Gallery.css';

const ListItem = ({ id, index, image_url, onClick }) => (
  <li className="photo" onClick={()=>onClick(index)}>
    <Link to={`/photo/${id}`}>
      <img src={image_url} alt="Not Found" />
    </Link>
  </li>)

class Gallery extends PureComponent {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
  }

  static propTypes = {
    currentPage: PropTypes.number,
    onFetchGallery: PropTypes.func,
    onPageClick: PropTypes.func,
    photos: PropTypes.array,
    totalPages: PropTypes.number
  };

  static defaultProps = {
    photos: []
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, onFetchGallery } = this.props;
    if (prevProps.currentPage !== currentPage) {
      onFetchGallery(currentPage);
    }
  }

  componentDidMount() {
    const { currentPage, onFetchGallery } = this.props;
    onFetchGallery(currentPage);
  }

  handlePageClick(page) {
    this.props.onPageClick(page.selected + 1);
  }

  handlePhotoClick(index) {
    this.props.onPhotoClick(index);
  }

  render() {
    const { currentPage, photos, totalPages } = this.props;
    const displayPage = currentPage? currentPage-1: 0;
    return (
      <div>
        <div className="title">Gallery</div>
        <ul className="photoList">
          {photos.map(
            (photo, i)=><ListItem
              id={photo.id} 
              image_url={photo.image_url[0]}
              index={i}
              key={photo.id}
              onClick={this.handlePhotoClick}
            />
          )}
        </ul>
        {totalPages && <ReactPaginate 
          activeClassName="active"
          containerClassName="pagination"
          initialPage={displayPage}
          marginPagesDisplayed={2}
          nextLabel=">"
          onPageChange={this.handlePageClick}
          pageCount={totalPages}
          pageRangeDisplayed={5}
          previousLabel="<"
        />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPage: state.gallery.currentPage,
    photos: state.gallery.photos,
    totalPages: state.gallery.totalPages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchGallery: page=> {
      dispatch(fetchGallery(page))
    },
    onPageClick: page => {
      dispatch(pageClick(page))
    },
    onPhotoClick: index => {
      dispatch(photoClick(index))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);
