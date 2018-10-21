import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Modal} from 'react-bootstrap';
import SelectCamComp from './selectCamComp';


class ExplosiveText extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
        };
    }


    render() {
        return (
            <div className='textContainer'>
                <span className='animation-text'>A</span>
            </div>
        )
    }
}

export default ExplosiveText;
