import React, { PureComponent } from 'react';
import './Photo.css';

class Photo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      error: null
    };
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const customerKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.500px.com/v1/photos/${match.params.photoId}?consumer_key=${customerKey}&image_size=4`;
    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            photo: result.photo
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  goBack(e){
    this.props.history.push("/");
  }

  createDes(content) {
    return {__html: content};
  }

  render() {
    const { photo } = this.state;
    return (
      <div>
        {photo &&
        <div>
          <div className="title">{photo.name}</div>
          <div className="main">
            <img src={photo.image_url} alt="not found"></img>
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

export default Photo;