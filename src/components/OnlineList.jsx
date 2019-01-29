import React from 'react';
import { API } from 'aws-amplify';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import {
    Cells,
    CellsTitle,
    Cell,
    CellBody,
    CellFooter,
    Dialog,
    Toast
} from 'react-weui';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');
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
                    onClick: this.kicking.bind(this)
                }
            ]
        },
        onlinelist:[],
        kick:null,
        AcctUniqueId:null,
        showToast:false,
        showLoading:false,
        showToasterror:false
    };
    loadOnlineUser(){
        API.get('useronlineApi', '/online').then(response => {
            this.setState({onlinelist: response.online});
        }).catch(error => {
            console.log(error.response)
        });
    }
    hideDialog() {
        this.setState({
            showIOS2: false,
            kick:null,
            AcctUniqueId:null
        });
    }
    kicking() {
        this.setState({ showLoading: true}); 
        const init = {
            body: {
                "username": this.state.kick,
                "AcctUniqueId": this.state.AcctUniqueId,
                "acctstoptime": new Date().toISOString()
            }
        };
        API.post('useronlineApi', '/online',init).then(response => {
            this.loadOnlineUser();
            this.hideDialog();
            this.setState({ showLoading: false}); 
            this.setState({ showToast: true}); 
            setTimeout(()=> {
                this.setState({showToast: false});
            }, 2000);
        }).catch(error => {
            console.log(error)
            this.setState({ showToasterror: true}); 
            setTimeout(()=> {
                this.setState({showToasterror: false});
            }, 2000);
        });
    }
    componentDidMount() {
        this.loadOnlineUser();
    }

    render() {
        return (
            <div id="OnlineList">
                <CellsTitle>Online User @ TARNTIP</CellsTitle>
                <Cells>
                    {this.state.onlinelist.map(userOnce => (
                        <Cell onClick={ e=> {
                            this.setState({ showIOS2: true}); 
                            this.setState({ kick: userOnce.username});
                            this.setState({ AcctUniqueId: userOnce.AcctUniqueId});
                        }} key={userOnce.username}>
                        <CellBody>
                            {userOnce.username}
                        </CellBody>
                        <CellFooter>
                        {timeAgo.format(new Date(userOnce.acctstarttime.substring(0, 19)))}
                        </CellFooter>
                        </Cell>
                    ))}
                </Cells>
                <Dialog type="ios" title={this.state.kick} buttons={this.state.style2.buttons} show={this.state.showIOS2}>
                    Need to Kick this user?
                </Dialog>
                <Toast icon="warn" size="large" show={this.state.showToasterror}>ERROR</Toast>
                <Toast icon="success-no-circle" show={this.state.showToast}>Done</Toast>
                <Toast icon="loading" show={this.state.showLoading}>Loading...</Toast>
            </div>
        );
    }
}

export default OnlineList;