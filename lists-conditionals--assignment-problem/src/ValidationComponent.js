import React from 'react';

const ValidationComponent = (props) => {
    let message = null;
    if(props.str === '0'){
        message = ''
    }
    else if(props.str > 0 && props.str <= 5){
        message = "Text Too Short";
    }
    else if(props.str > 5){
        message = "Text long enough";
    }
    
    return(
        <h3>Length is  : {message}</h3>
    );
}
export default ValidationComponent