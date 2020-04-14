import React, { Component } from 'react';
import { login } from '../api/api';
import '../App.css'
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            user: '',
            error: ''
        }
    }
    signin = async (e) => {
        e.preventDefault();
        const email = this.state.email
        const password = this.state.password
        console.log(email, "hello")
        if (!email && !password) {
            return false
        } else {
            try {
                const response = await login(email, password);
                if (response && response.data) {
                    const { access_token, refresh_token } = response.data;
                    this.setState({
                        email,
                        password,
                        accessToken: access_token,
                        refreshToken: refresh_token
                    })
                    this.props.history.push("/configure");

                } else {
                    console.log("failed")
                }

            }
            catch (e) {
                console.log(e, "errorfailed")
                this.setState({
                    error: e
                })
            }
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {

        return (
            <div>
                <form>
                    <div className="text-center"><h2>Admin Login</h2></div>
                    <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">Email ID:</label>
                        <div className="col-md-4">
                            <input type="text" className="form-control" name="email" onChange={this.handleChange}
                                value={this.state.email} required />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">Password:</label>
                        <div className="col-md-4">
                            <input type="password" className="form-control" name="password" onChange={this.handleChange}
                                value={this.state.password} required />
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col text-center">
                                <button className="button" onClick={this.signin} >Login</button>
                            </div>
                        </div>
                    </div>

                </form>
                <main className="login-form">
                    <div className="cotainer">

                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="">




                                    <div className="card-body">


                                    </div>
                                </div>

                            </div>

                        </div>
                        {/* <Footer /> */}
                        {/* <hr /> */}

                    </div>

                </main>

                {/* <div className="container">
                    <div className="row">
                        <div className="col text-left font-weight-bold">
                            &copy; 2020
                                </div>
                    </div>
                </div>
                <hr /> */}
            </div>


        )
    }
}

export default Login

