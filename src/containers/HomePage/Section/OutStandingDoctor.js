import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            });
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }
    handleViewDetailDoctor = (doctor) => {
        // console.log('view info', doctor);
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`);
        }
    };

    render() {
        // console.log('check props', this.props.topDoctorsRedux);
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // autoScroll: true,
            autoplay: true,
        };

        let arrDoctors = this.state.arrDoctors;
        if (arrDoctors.length < 10) {
            arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);
        }
        // console.log(arrDoctors);
        let { language } = this.props;

        return (
            <div className="specialty gray">
                <div className="specialty-container">
                    <div className="specialty-content">
                        <div className="specialty-header">
                            <span className="specialty-title">
                                <FormattedMessage id="homepage.outstanding-doctors" />
                            </span>
                            {/* <button className="specialty-btn">
                                <FormattedMessage id="homepage.more-info" />
                            </button> */}
                        </div>
                        <Slider {...settings}>
                            {arrDoctors &&
                                arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    // if (index == 0) {
                                    //     console.log('check item', item);
                                    // }
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                    return (
                                        <div
                                            className="img-customize"
                                            key={index}
                                            onClick={() => this.handleViewDetailDoctor(item)}
                                        >
                                            <div
                                                className="img-bg doctor"
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            ></div>
                                            <div className="img-text">
                                                {language === LANGUAGES.VI ? nameVi : nameEn}
                                            </div>
                                            <div className="img-text2">Bác sĩ chuyên khoa</div>
                                        </div>
                                    );
                                })}
                        </Slider>
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
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
