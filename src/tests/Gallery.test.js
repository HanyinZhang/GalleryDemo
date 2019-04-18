import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import ReactPaginate from 'react-paginate';
import sinon from 'sinon';

import Gallery, { ListItem } from '../Gallery';

describe('<Gallery />', () => {
  let props;

  beforeEach(() => { 
    props = {
      currentPage: 1,
      onFetchGallery: ()=>{},
      onPageClick: ()=>{},
      onPhotoClick: ()=>{},
      photos: [
        {id: 1, image_url: ['image1']},
        {id: 2, image_url: ['image2']},
      ],
      totalPages: 10
    };
  });

  it('calls onFetchGallery when the component is mounted', () => {
    const onFetchGallery = sinon.spy();
    props.onFetchGallery = onFetchGallery;
    shallow(<Gallery {...props} />);
    expect(onFetchGallery).to.have.property('callCount', 1);
  });

  it('does not render photo list if photos is empty', () => {
    props.photos = [];
    const wrapper = shallow(<Gallery {...props} />);
    expect(wrapper.find(ListItem)).to.have.lengthOf(0);
  });

  it('renders photo list', () => {
    const wrapper = shallow(<Gallery {...props} />);
    expect(wrapper.find(ListItem)).to.have.lengthOf(2);
  });

  it('simulates photo click events', () => {
    const onPhotoClick = sinon.spy();
    props.onPhotoClick = onPhotoClick;
    const wrapper = shallow(<Gallery {...props} />);
    const photo1 = wrapper.find(ListItem).first();
    photo1.simulate('click');
    expect(onPhotoClick).to.have.property('callCount', 1);
    expect(onPhotoClick.calledWith(0));
  });

  it('renders pagination based on totalPages', () => {
    const wrapper = shallow(<Gallery {...props} />);
    expect(wrapper.find(ReactPaginate).props().pageCount).to.equal(10);
  });

  it('renders pagination with currentPage', () => {
    const wrapper = shallow(<Gallery {...props} />);
    expect(wrapper.find(ReactPaginate).props().initialPage).to.equal(0);
  });

  it('does not render pagination if totalPage is null', () => {
    props.totalPages = null;
    const wrapper = shallow(<Gallery {...props} />);
    expect(wrapper.find(ReactPaginate)).to.have.lengthOf(0);
  });
});