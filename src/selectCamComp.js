import React, { Component } from 'react';
import './App.css';
import {Checkbox} from 'react-bootstrap'


class SelectCamComp extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            cams: []
        };
    }

    componentWillMount() {
        let cams = [
            {
                'cameras': [
                    {'id': '001', 'isChecked': false},
                    {'id': '002', 'isChecked': true},
                    {'id': '003', 'isChecked': true},
                    {'id': '004', 'isChecked': false}
                ],
                'name': '分组一',
                'id': '1'

            },
            {
                'cameras': [
                    {'id': '001', 'isChecked': false},
                    {'id': '002', 'isChecked': false},
                    {'id': '003', 'isChecked': false},
                ],
                'name': '分组二',
                'id': '2'

            },
            {
                'cameras': [
                    {'id': '001', 'isChecked': true},
                    {'id': '002', 'isChecked': false},
                    {'id': '003', 'isChecked': false},
                ],
                'name': '分组三',
                'id': '3'

            }
        ];

        console.log('this.props.cams is ', this.props.cams)
        this.setState({
                cams: this.props.cams.length ? this.props.cams : cams
            });

    }

    getCheckBoxGroups() {
        return (
            <div>
                {
                    this.state.cams.map( (group) => {
                        return this.getCheckBoxes(group)
                    }, this)
                }
            </div>
        );
    }

    getCheckBoxes = (group) => {

        return (
            <div>
                <Checkbox id={group.id} inline key={group.id} checked={this.isAllChecked(group.id) == 2} onChange={this.handleClickAllCheckBox.bind(this, group.id)}>
                    {group.name}
                </Checkbox>
                <ul>

                    {group.cameras ?
                        group.cameras.map( (item) => {
                            return <li key={item.id}><Checkbox name={item.id} inline key={item.id} checked={item.isChecked} onChange={this.handleClickCheckBox.bind(this, group.id)}>{group.id + '-' + item.id}</Checkbox></li>
                        }) : null
                    }
                </ul>
            </div>
        );
    }

    handleClickCheckBox = (groupId, el) => {
        let camGroups = this.state.cams;

        camGroups.forEach((group, i) => {
            if (group.id === groupId){
                group.cameras.forEach((camera, j) => {
                    if(camera.id === el.target.name){
                        camGroups[i].cameras[j].isChecked = !camGroups[i].cameras[j].isChecked;
                    }
                })
            }
        });

        this.setState({camGroups});
        this.props.updateData(camGroups);

    };

    handleClickAllCheckBox = (groupId, e) => {

        let group = this.state.cams[groupId-1];
        let camGroups = this.state.cams;
        if (this.isAllChecked(groupId) === 2){
            group.cameras.forEach((camera, j) => {
                console.log('groupid1 is', groupId)
                camGroups[groupId-1].cameras[j].isChecked = !camGroups[groupId-1].cameras[j].isChecked;
            });
            e.target.isChecked = false
        }
        else {
            group.cameras.forEach((camera, j) => {
                console.log('group.id2 is ',groupId)
                camGroups[groupId-1].cameras[j].isChecked = true;
                e.target.isChecked = true
            });
        }
        this.setState({camGroups});
        this.props.updateData(camGroups);
    };

    isAllChecked(groupId) {
        let group = this.state.cams[groupId-1];
        let checkStatus = 0;
        let hasUnchecked = false;
        if(group.cameras){
            group.cameras.map(function (item) {
                if (item.isChecked === true){
                    checkStatus = 2;
                } else {
                    hasUnchecked = true
                }
            });
            let checkbox = document.getElementById(group.id)
            if(checkStatus && hasUnchecked && checkbox){
                checkbox.indeterminate = true;
            }
            if (checkStatus && !hasUnchecked && checkbox){
                checkbox.indeterminate = false;
            }
            if (!checkStatus && checkbox){
                checkbox.indeterminate = false;
            }

        }

        return hasUnchecked ? --checkStatus : checkStatus;
    }


    render() {
        return (
            <div>
                {this.getCheckBoxGroups()}
            </div>
        );
    }
}

export default SelectCamComp;
