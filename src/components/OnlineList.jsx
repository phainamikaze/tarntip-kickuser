import React from 'react';
import { API } from 'aws-amplify';
import {
    Cells,
    CellsTitle,
    Cell,
    CellBody,
    CellFooter,
    Dialog
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';

class OnlineList extends React.Component {
    state = {
        showIOS2: false,
        style2: {
            title: 'Confirm',
            buttons: [
                {
                    type: 'default',
                    label: 'Cancel',
                    onClick: this.hideDialog.bind(this)
                },
                {
                    type: 'default',
                    label: 'Kick',
                    onClick: this.hideDialog.bind(this)
                }
            ]
        },
        onlinelist:[]
    };
    hideDialog() {
        this.setState({
            showIOS2: false,
        });
    }
    componentDidMount() {
        API.get('useronlineApi', '/online').then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error.response)
        });
    }
    render() {
        return (
            <div id="OnlineList">
                <CellsTitle>Online User @ TARNTIP</CellsTitle>
                <Cells>
                    {this.state.onlinelist.map(userOnce => (
                        <Cell onClick={ e=> this.setState({ showIOS2: true}) }>
                        <CellBody>
                            Title
                        </CellBody>
                        <CellFooter>
                            Description
                        </CellFooter>
                        </Cell>
                    ))}
                </Cells>
                <Dialog type="ios" title={this.state.style2.title} buttons={this.state.style2.buttons} show={this.state.showIOS2}>
                    Need to Kick this user?
                </Dialog>
            </div>
        );
    }
}

export default OnlineList;