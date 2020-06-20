import React, { Fragment } from 'react';
import Hero from './Hero';
import HomeContent from './HomeContent';
import HomeListData from './HomeListData';
import SliderEffect from './SliderEffect';

export default function Home() {
  return (
    <Fragment>
      
      <div className="tst-try">
          <img src={require('../images/sliderbg1.jpg')} />
</div>
      
    
      <HomeListData />

    </Fragment>
  )
}
