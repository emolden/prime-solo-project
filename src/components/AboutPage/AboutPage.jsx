import React from 'react';

import './AboutPage.css';

function AboutPage() {
  return (
    <div className="container">
      <h2>West Metro Softball</h2>
      <div className='mission'>
        <p>Women's Softball Organization in New Hope, MN</p>
        <p>​"Women empowering women through community and athletics"</p>
        <p>Fall Season: August 6 - October 8</p>
      </div>
      <div className='leagues'>
        <div>
          <h4>Silver League</h4>
          <p>Tuesday Nights</p>
          <p>Double Headers</p>
          <p>Experienced players</p>
          <p>Play Level: C/D</p>
        </div>
        <div>
          <h4>Bronze League</h4>
          <p>Thursday Nights</p>
          <p>Single Games</p>
          <p>Players of all skill levels</p>
          <p>Play Level: E(Recreational)</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
