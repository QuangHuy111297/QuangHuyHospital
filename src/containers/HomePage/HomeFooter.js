import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';

class About extends Component {
    render() {
        return (
            <div className="home-footer">
                <p>
                    &copy; 2022 Lê Quang Huy Developer.{' '}
                    <a target="_blank" href="https://github.com/QuangHuy111297" rel="noreferrer">
                        More information, please visit my github
                    </a>
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
