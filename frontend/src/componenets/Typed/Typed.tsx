import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
interface TypedComponentProps{
    string :string;
}
const TypedComponent = ({string}:TypedComponentProps) => {
    const el = useRef(null);

    useEffect(() => {
        const options = {
            strings: [string],
            typeSpeed: 50, 
            backSpeed: 30, 
            backDelay: 1500,
            loop: true, 
        };

        // Initialize Typed.js
        const typed = new Typed(el.current, options);

        // Cleanup function to destroy the Typed instance
        return () => {
            typed.destroy();
        };
    }, []); 

    return <span ref={el} />; 
};

export default TypedComponent;
