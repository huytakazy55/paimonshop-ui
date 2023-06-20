import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import imgLogin from '../../assets/img/logo-02.png';
import LoginService from '../Services/LoginService';
import { useNavigate } from "react-router-dom";
import navIcon1 from '../../assets/img/nav-icon1.svg'
import navIcon2 from '../../assets/img/nav-icon2.svg'
import navIcon3 from '../../assets/img/nav-icon3.svg'

export const FormModal = () => {
    const [stateLogin, setStateLogin] = useState({ userName: null, password: null });
    const [loginResponse, setLoginResponse] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLogin = (e) => {
        e.preventDefault();
        
        LoginService.login(stateLogin.userName, stateLogin.password)
            .then((res) => {
                console.log(res);
                localStorage.setItem('isLogin', true);
                handleClose();
                // window.location.href('/');
            })
            .catch((err) => {
                console.log(err);
                setLoginResponse(err.response.data);
            });
    }

    const isLogin = localStorage.getItem('isLogin');

    const HandleOnChangeStateLogin = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        let data = { ...stateLogin };
        data[name] = value;
        setStateLogin(data);
    }

    return (
        <section className="formModal">
            <Container>
                <form>
                    <div><img src={imgLogin} alt="Login" /></div>
                    <Row>
                        <h4>Account</h4>
                        <input type="text" name="userName" placeholder="Account" value={stateLogin.userName} onChange={(e) => HandleOnChangeStateLogin(e)} />
                    </Row>
                    <Row>
                        <h4>Password</h4>
                        <input type="password" name="password" placeholder="Password" value={stateLogin.password} onChange={(e) => HandleOnChangeStateLogin(e)} />
                    </Row>
                    <Row>
                        <Col md={6} className="remember_me">
                            <input type="checkbox" placeholder="Remember" />
                            <span>Remember me!</span>
                        </Col>
                        <Col md={6} className="forgot_pass">
                            <a href="#">Forgot password?</a>
                        </Col>
                    </Row>
                    <Col md={6} className="">
                        {loginResponse && <p>{loginResponse}</p>}
                    </Col>
                    <Row></Row>
                    {isLogin === 'true' ? (
                        
                        <>Login Success</>
                    ) : (
                            <button className="loginButton"  
                            onClick={(e) => {
                                handleLogin(e);
                              }}
                            //onClick={(e) => handleLogin(e)}
                            >LOGIN</button>
                        )}
                    <h5>Don't have an account <a href="#">Register?</a></h5>
                </form>
            </Container>
        </section>
    );
};