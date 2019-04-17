import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { fetchPhoto } from './actions';

import './Photo.css';

class Photo extends PureComponent {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  static propTypes = {
    onFetchPhoto: PropTypes.func,
    photo: PropTypes.object,
  };

  componentDidMount() {
    const { match, photo } = this.props;
    if(!photo) {
      this.props.onFetchPhoto(match.params.photoId);
    }
  }

  goBack(){
    this.props.history.push("/");
  }

  createDes(content) {
    return {__html: content};
  }

  render() {
    const { photo } = this.props;
    let image_url = '';
    if(photo) {
      image_url = typeof photo.image_url === "string"? photo.image_url: photo.image_url[1];
    }
    return (
      <div>
        {photo &&
        <div>
          <div className="title">{photo.name}</div>
          <div className="main">
            <img src={image_url} alt="not found"></img>
            <div className="info">
              <div className="user">
                {photo.user.fullname}
              </div>
              <div className="description">
                <p dangerouslySetInnerHTML={this.createDes(photo.description)} />
              </div>
              <div className="rating">Rating: {photo.rating}</div>
              <button onClick={this.goBack}>Back</button>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    photo: state.gallery.photoDetail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchPhoto: id=> {
      dispatch(fetchPhoto(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
