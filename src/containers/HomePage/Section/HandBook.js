import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class HandBook extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };

        return (
            <div className="specialty white">
                <div className="specialty-container">
                    <div className="specialty-content">
                        <div className="specialty-header">
                            <span className="specialty-title">Cẩm nang</span>
                            {/* <button className="specialty-btn">Xem thêm</button> */}
                        </div>
                        <Slider {...settings}>
                            <div className="img-customize">
                                <div className="img-bg handBook"></div>
                                <div className="img-text">Địa chỉ khám uy tín</div>
                            </div>
                            <div className="img-customize">
                                <div className="img-bg handBook"></div>
                                <div className="img-text">7 bác sĩ Cột sống giỏi và nhiều kinh nghiệm</div>
                            </div>
                            <div className="img-customize">
                                <div className="img-bg handBook"></div>
                                <div className="img-text">8 bệnh viện và phòng khám chữa đau vai gáy</div>
                            </div>
                            <div className="img-customize">
                                <div className="img-bg handBook"></div>
                                <div className="img-text">Phòng khám đa khoa</div>
                            </div>
                            <div className="img-customize">
                                <div className="img-bg handBook"></div>
                                <div className="img-text">Phòng khám Quốc tế</div>
                            </div>
                            <div className="img-customize">
                                <div className="img-bg handBook"></div>
                                <div className="img-text">Bệnh viện Đa khoa</div>
                            </div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
