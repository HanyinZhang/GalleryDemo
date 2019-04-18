import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import Photo from '../Photo';

describe('<Photo />', () => {
  let props;

  beforeEach(() => { 
    props = {
      match: {
        params: {
          photoId: 1
        }
      },
      onFetchPhoto: ()=>{},
      photo: {
        image_url : 'photo_url',
        name: 'cool photo',
        description: 'some description',
        user: {
          fullname: 'test user'
        },
        rating: 99
      }
    };
  });

  it('calls onFetchPhoto when photo is null', () => {
    const onFetchPhoto = sinon.spy();
    props.onFetchPhoto = onFetchPhoto;
    props.photo = null;
    shallow(<Photo {...props} />);
    expect(onFetchPhoto).to.have.property('callCount', 1);
  });

  it('does not call onFetchPhoto when photo is set', () => {
    const onFetchPhoto = sinon.spy();
    props.onFetchPhoto = onFetchPhoto;
    shallow(<Photo {...props} />);
    expect(onFetchPhoto).to.have.property('callCount', 0);
  });

  it('render image_url when it is a string', () => {
    const wrapper = shallow(<Photo {...props} />);
    expect(wrapper.find('img').props().src).to.equal('photo_url');
  });

  it('render image_url when it is an array', () => {
    props.photo.image_url = ['small_image', 'big_image'];
    const wrapper = shallow(<Photo {...props} />);
    expect(wrapper.find('img').props().src).to.equal('big_image');
  });

  it('push root path to history when back button is clicked', () => {
    const mockPush = sinon.spy();
    const history = { push: mockPush};
    props.history = history;
    const wrapper = shallow(<Photo {...props} />);
    const backBtn = wrapper.find('button');
    backBtn.simulate('click');
    expect(mockPush.calledWith('/'));
  });
});