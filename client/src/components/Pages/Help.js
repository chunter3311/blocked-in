import React from 'react';
import globalStyles from '../../styles/global.module.css';

const setBackground = () => {
    const background = document.getElementById('page-background');
    console.log(background);
    background.classList.add(globalStyles.background_image_carbon_fiber);
}

setTimeout(setBackground, 0);


const Help = () => {
    return (
        <h1>Help</h1>
    );
}
export default Help;