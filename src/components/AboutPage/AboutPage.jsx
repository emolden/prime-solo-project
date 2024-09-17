import React from 'react';

import './AboutPage.css';

function AboutPage() {
  return (
    <div className="container">
      <h2>West Metro Softball</h2>
      <div className='mission'>
        <p className='mission-info'>Women's Softball Organization in New Hope, MN</p>
        <p className='mission-info'>​"Women empowering women through community and athletics"</p>
        <p className='mission-info'>Fall Season: August 6 - October 8</p>
      </div>
      <div className='leagues'>
        <div>
          <h4 className='league-info'>Silver League</h4>
          <p className='league-info'>Tuesday Nights</p>
          <p className='league-info'>Double Headers</p>
          <p className='league-info'>Experienced players</p>
          <p className='league-info'>Play Level: C/D</p>
        </div>
        <div>
          <h4 className='league-info'>Bronze League</h4>
          <p className='league-info'>Thursday Nights</p>
          <p className='league-info'>Single Games</p>
          <p className='league-info'>Players of all skill levels</p>
          <p className='league-info'>Play Level: E(Recreational)</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
