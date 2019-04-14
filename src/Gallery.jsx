import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import './Gallery.css';

const ListItem = props => (
  <li className="photo">
    <Link to={`/photo/${props.id}`}>
      <img src={props.image_url} alt="Not Found" />
    </Link>
  </li>);


class Gallery extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      error: null,
      photos: [],
      totalPages: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.callApi = this.callApi.bind(this);
  }

  callApi(page) {
    const customerKey = process.env.REACT_APP_API_KEY;
    let apiUrl = `https://api.500px.com/v1/photos?feature=popular&consumer_key=${customerKey}`;
    if (page) {
      apiUrl = apiUrl + `&page=${page}`;
    }
    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            currentPage: result.current_page,
            photos: result.photos,
            totalPages: result.total_pages
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      const { currentPage } = this.state;
      this.callApi(currentPage);
    }
  }

  componentDidMount() {
    this.callApi();
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  renderPageNumbers() {
    const pageNumbers = [1, 2, 3];
    return pageNumbers.map(number => {
      return (
        <li key={number}>
          <button
            id={number}
            onClick={this.handleClick}
          >{number}</button>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="title">Gallery</div>
        <ul className="photoList">
          {this.state.photos.map(
            photo=><ListItem
              id={photo.id} 
              key={photo.id} 
              image_url={photo.image_url}
            />
          )}
        </ul>
        <ul className="pagination">
          {this.renderPageNumbers()}
        </ul>
      </div>
    );
  }
}

export default Gallery;
