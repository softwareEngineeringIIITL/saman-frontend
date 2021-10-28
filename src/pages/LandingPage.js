import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logIn, getSession, setPathname } from '../actions/users';
import { Col, Row } from 'react-bootstrap';
import DevicesImg from '../assets/images/devices.png';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LogInForm from '../forms/LogInForm';

class LandingPage extends PureComponent {

    constructor(props) {
        super(props);
        const session = localStorage.getItem('session');
        if (!session) {
            this.props.setPathname('/');
        }
    }

    componentDidMount() {
        this.props.getSession();
        window.scrollTo(0, 0);
    }

    handleSubmitLogIn = (data) => {
        this.props.logIn(data);
    };

    render() {
        const { session, pathname } = this.props;

        if (session) {
            if (pathname !== '/') {
                return <Redirect to={{ pathname }} />
            } else {
                return <Redirect to={{ pathname: '/inventory' }} />
            }
        }

        return (
            <React.Fragment>
                <Header />
                <Row className="landing-page justify-content-center">
                    <Col xs={12} md={6} className="hero">
                        <Row>
                            <Col>
                                <h2>Add, Edit and Remove items.</h2>
                                <p>Manage all your inventory online with SAMAN.</p>
                                <img src={DevicesImg} alt="Devices" />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={6} className="log-in-form">
                        <LogInForm submitLogIn={this.handleSubmitLogIn} />
                    </Col>
                </Row>
                <Footer />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        session: state.UserReducer.session,
        pathname: state.UserReducer.pathname
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logIn: (data) => dispatch(logIn(data)),
        getSession: () => dispatch(getSession),
        setPathname: (pathname) => dispatch(setPathname(pathname))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
