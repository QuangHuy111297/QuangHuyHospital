import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfo.scss';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getExtraInfoDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
            extraInfo: {},
        };
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data,
                });
            }
        }
    }

    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfo: status,
        });
    };

    render() {
        let { isShowDetailInfo, extraInfo } = this.state;
        let { language } = this.props;
        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address">
                        <FormattedMessage id="patient.extra-info-doctor.text-address" />
                    </div>
                    <div className="name-clinic">
                        {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : 'Phòng khám Bệnh viện'}
                    </div>
                    <div className="detail-address">
                        {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : 'Tp. HCM'}
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailInfo === false && (
                        <div className="detail-info2">
                            <span className="left">
                                <FormattedMessage id="patient.extra-info-doctor.price" />
                            </span>
                            <span className="right">
                                {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI && (
                                    <NumberFormat
                                        value={extraInfo.priceTypeData.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' VND'}
                                    />
                                )}

                                {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN && (
                                    <NumberFormat
                                        value={extraInfo.priceTypeData.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' $'}
                                    />
                                )}
                            </span>{' '}
                            <span className="info-show" onClick={() => this.showHideDetailInfo(true)}>
                                <FormattedMessage id="patient.extra-info-doctor.detail" />
                            </span>{' '}
                        </div>
                    )}
                    {isShowDetailInfo === true && (
                        <>
                            <div className="title-price">
                                <FormattedMessage id="patient.extra-info-doctor.price" />
                            </div>
                            <div className="info-gray">
                                <div className="info-up">
                                    <div className="detail-info">
                                        <span className="left">
                                            <FormattedMessage id="patient.extra-info-doctor.price" />
                                        </span>
                                        <span className="right">
                                            {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.VI && (
                                                <NumberFormat
                                                    value={extraInfo.priceTypeData.valueVi}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={' VND'}
                                                />
                                            )}

                                            {extraInfo && extraInfo.priceTypeData && language === LANGUAGES.EN && (
                                                <NumberFormat
                                                    value={extraInfo.priceTypeData.valueEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={' $'}
                                                />
                                            )}
                                        </span>
                                    </div>
                                    <div className="text-info-book">
                                        <FormattedMessage id="patient.extra-info-doctor.note" />
                                    </div>
                                </div>
                                <div className="info-down">
                                    <FormattedMessage id="patient.extra-info-doctor.payment" />
                                </div>
                            </div>
                            <div className="info-hide" onClick={() => this.showHideDetailInfo(false)}>
                                <FormattedMessage id="patient.extra-info-doctor.hide-price" />
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
