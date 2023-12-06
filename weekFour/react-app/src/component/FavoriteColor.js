import { useState } from "react";

function FavoriteColor() {
    const [favoriteColor, setFavoriteColor] = useState('')
    return ( 
        <div>
            <h3 style={{ color: favoriteColor }}>My favorite color is <span>{favoriteColor}</span></h3>
            <button onClick={() => setFavoriteColor('Red')} className="ui button red" >
                Red
            </button>
            <button onClick={() => setFavoriteColor('Blue')} className="ui button blue" >
                Blue
            </button>
            <button onClick={() => setFavoriteColor('Green')} className="ui button green" >
                Green
            </button>
            <button onClick={() => setFavoriteColor('Yellow')} className="ui button yellow" >
                Yellow
            </button>
        </div>
     );
}

export default FavoriteColor;