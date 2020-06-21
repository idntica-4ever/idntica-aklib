import React, { Fragment } from 'react';
import Hero from './Hero';
import HomeContent from './HomeContent';
<<<<<<< HEAD
import SearchList from './SearchList';
=======
import HomeListData from './HomeListData';
import SliderEffect from './SliderEffect';
>>>>>>> 7419178c4c1bd8927c0bce57d8c5d2193b158b0b

export default function Home() {
  return (
    <Fragment>
      
<<<<<<< HEAD
      {/*<div className="box cta">
        <p className="has-text-centered">
          <span className="tag is-primary">New</span> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
  </div>*/}
      <SearchList />
=======
      <div className="tst-try">
          <img src={require('../images/sliderbg1.jpg')} />
</div>
      
    
      <HomeListData />

>>>>>>> 7419178c4c1bd8927c0bce57d8c5d2193b158b0b
    </Fragment>
  )
}
