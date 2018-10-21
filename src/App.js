import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Modal} from 'react-bootstrap';
import SelectCamComp from './selectCamComp';
import ExplosiveText from './explosiveText';

class App extends Component {
  render() {
    return (
        <Trigger/>
    );
  }
}
const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };

class Trigger extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleHide = this.handleHide.bind(this);

        this.state = {
            show: false,
            cameras: [],
            updatedCams: []
        };
    }

    handleHide() {
        this.setState({ show: false });
    }


    updateData = (updatedCams) => {
        this.setState({updatedCams: updatedCams});
        console.log('state update and ', this.state)
    }

    handleSave = () => {
        console.log('save is called')
        this.setState({cameras:this.state.updatedCams});
        this.setState({ show: false });
    }

    render() {
        console.log('cams is ', this.state.cameras)
        return (
            <div className="modal-container" style={{ height: 200 }}>
                <div className="well" style={wellStyles}>
                    <Button
                        bsStyle="primary"
                        bsSize="large"
                        block
                        onClick={() => this.setState({ show: true })}
                    >
                        选择摄像头
                    </Button>
                </div>

                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            选择摄像头
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SelectCamComp
                            cams={this.state.cameras}
                            updateData = {this.updateData}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleHide}>关闭</Button>
                        <Button bsStyle="primary" onClick={this.handleSave}>保存</Button>
                    </Modal.Footer>
                </Modal>
                <hr/>
                {/*<div className="well" style={wellStyles}>*/}
                    {/*<ExplosiveText/>*/}
                {/*</div>*/}
            </div>
        );


    }
}

export default App;
