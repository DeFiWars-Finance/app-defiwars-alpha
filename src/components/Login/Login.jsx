import React from 'react';
import axios from 'axios';
import style from './Login.css';
import appStyle from '../../App.module.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Store from '../../store/store';

const store = Store.store;

class Login extends React.Component {
    constructor(props) {
        super(props);
        const JWT = store.getStore('JWT');
        const loggedin = store.getStore('loggedin');
        this.state = {
            address: '',
            email: '',
            nickname: '',
            signature: '',
            publicName: '',
            JWT: JWT,
            loggedin: loggedin,
            errorMessage: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    trylogin = (signature) => {
        const me = this;
        const accountAddress = store.getStore('accountAddress');
        console.log(signature);
        axios
            .post(
                '/ajax.php', {
                    request: 'auth',
                    publicName: this.state.publicName,
                    email: this.state.email,
                    address: accountAddress,
                    signature: signature,
                },
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                },
            )
            .then(
                function(response) {
                    if (response.data[0] === 'Success') {
                        store.setLogin(true);
                        store.setJWT(response.data[2]);
                        me.setState({ JWT: response.data[2] });
                        me.setState({ loggedin: true });
                    } else {
                        me.setState({ errorMessage: response.data });
                    }
                }
            )
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const web3 = store.getStore('web3');
        const accountAddress = store.getStore('accountAddress');
        const { publicName, email, nickname } = this.state;
        const me = this;
        if (email !== '') {
            axios
                .post(
                    '/ajax.php', {
                        request: 'login',
                        publicName: publicName,
                        email: email,
                        nickname: nickname,
                        address: accountAddress,
                    },
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    },
                )
                .then(async function(response) {
                    if (response.data.substring(0, 5) !== 'Error') {
                        let message = response.data;
                        let signature = await web3.eth.personal.sign(web3.utils.fromUtf8(message), accountAddress);
                        console.log(signature);
                        let nextresponse = await axios.post('/ajax.php', {
                            request: 'auth',
                            publicName: publicName,
                            email: email,
                            nickname: nickname,
                            address: accountAddress,
                            signature: signature,
                        },
                        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        },
                        );
                        console.log(nextresponse);
                        if (nextresponse.data[0] === 'Success') {
                            store.setLogin(true);
                            store.setJWT(nextresponse.data[2]);
                            me.setState({ JWT: nextresponse.data[2] });
                            me.setState({ loggedin: true });
                            me.props.history.push('/Home');
                        } else {
                            me.setState({ errorMessage: nextresponse.data });
                        }

                    } else {
                        me.setState({ errorMessage: response.data });
                    }
                })
        } else {
            me.setState({ errorMessage: 'Email and Name cannot be empty' });
        }
    }

    onChange = (event) => {
        let val = []
        val[event.target.id] = event.target.value
        this.setState(val)
    }

    render() {
        return (
            < div className = { style.Sword } >
                < Header / >
                < div className = { appStyle.container } >
                    < div className = 'main-form' >
                        < div className = 'left-form' > {
                            this.state.errorMessage && (
                                < p className = { style.error } > { this.state.errorMessage } </ p >
                                )
                            }
                        </ div >
                        < div className = 'right-form' > {
                            this.state.loggedin && (
                                < p className = { style.error } > Welcome back! </ p >
                                )
                            } {
                            this.state.loggedin && (
                                < form onSubmit = { this.handleSubmit } >
                                    < div className = { style.form } >
                                        < input name = 'nickname'
                                            id = { 'nickname' }
                                            placeholder = 'nickname'
                                            value = { this.state.nickname }
                                            onChange = { this.onChange }
                                            >
                                        </ input >
                                        < input name = 'publicName'
                                            id = { 'publicName' }
                                            placeholder = 'Name'
                                            value = { this.state.publicName }
                                            onChange = { this.onChange }
                                            >
                                        </ input >
                                        < input name = 'email'
                                            id = { 'email' }
                                            placeholder = 'E-mail'
                                            value = { this.state.email }
                                            onChange = { this.onChange }
                                            >
                                        </ input >
                                        < button type = 'submit' > LOGIN </ button>
                                    </ div >
                                </ form>
                                )
                            }
                        </ div >
                    </ div >
                </ div >
                < Footer / >
            </ div >
        );
    }
}

export default Login;
