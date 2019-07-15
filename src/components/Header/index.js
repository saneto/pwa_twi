import React, { Component } from 'react';
import Navigation from '../Navigation';

class Header extends Component{
    constructor(props)
    {
        super(props);
    }

    render(){
        return(
         <Navigation />
        )
    };
}

export default Header;