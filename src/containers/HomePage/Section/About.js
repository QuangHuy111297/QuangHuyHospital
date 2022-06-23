import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';

class About extends Component {
    render() {
        return (
            <div className="specialty video">
                <div className="specialty-container">
                    <div className="specialty-content">
                        <div className="specialty-header">
                            <span className="specialty-title">Truyền thông nói về HospitalQH </span>
                            <button className="specialty-btn">Xem thêm</button>
                        </div>
                        <div className="video-content">
                            <div className="content-left">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/F_7GfRTQXaE"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="content-right">
                                <span>Lê Quang Huy</span>
                                <p>Developer</p>
                            </div>
                        </div>
                    </div>
                </div>
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
