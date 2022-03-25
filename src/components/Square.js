import React from 'react';


function Square(props) {
const {x,o} = props

    return (
        <div className={'square'} {...props} >
            {x ? 'x' : (o ? 'o': '')}
        </div>
    );
}

export default Square;
