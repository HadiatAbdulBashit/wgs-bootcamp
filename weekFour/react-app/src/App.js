import React from 'react';
import FavoriteColor from './component/FavoriteColor';

import GetVideo from './component/GetVideo';

function App() {
  return (
    <div className='ui container'>
      <GetVideo />
      <FavoriteColor />
    </div>
  )
}

export default App;
