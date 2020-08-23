import React from 'react';

const CharComponent = (props) => {
    const style = {
        display :"inline-block",
        padding : '16px',
        textAlign : 'center',
        margin: '16px',
        border: '1px Solid Black'
    }
    const list = props.word.split('').map((value, index) => {
        return(
            <li key={index} 
                style={style}  
                onClick={() => props.removeHandler(index)} >{value}</li>
        )
    })
        return(
            <div>
                {list}
            </div>
        );
    
}
export default CharComponent