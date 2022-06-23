import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManagerUser from './TableManagerUser';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: '',
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data,
        //         });
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;

            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
            });
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;

            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
            });
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;

            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
            });
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',
            });
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            let objectUrl = URL.createObjectURL(file);

            this.setState({
                previewImgURL: objectUrl,
                avatar: base64,
            });
        }
    };

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;

        this.setState({
            isOpen: true,
        });
    };

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            // fire action redux
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            });
        }
        if (action === CRUD_ACTIONS.EDIT) {
            // fire action redux
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            });
        }
    };

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];

        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required : ' + arrCheck[i]);
                break;
            }
        }

        return isValid;
    };

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };

        copyState[id] = event.target.value;

        this.setState({
            ...copyState,
        });
    };

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = Buffer.from(user.image, 'base64').toString('binary');
        }

        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
        });
    };

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGenders;

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role } = this.state;

        return (
            <div className="user-redux-container">
                <div className="title">User Redux</div>
                <div>{isGetGenders === true ? 'Loading genders' : ''}</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <form>
                                <div className="row">
                                    <div className="form-group col-md-12 my-3">
                                        <FormattedMessage id="manage-user.add" />
                                    </div>
                                    <div className="form-group col-md-3 my-3">
                                        <label>
                                            <FormattedMessage id="manage-user.email" />
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(event) => this.onChangeInput(event, 'email')}
                                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                        />
                                    </div>
                                    <div className="form-group col-md-3 my-3">
                                        <label>
                                            <FormattedMessage id="manage-user.password" />
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(event) => this.onChangeInput(event, 'password')}
                                            disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                        />
                                    </div>
                                    <div className="form-group col-md-3 my-3">
                                        <label>
                                            <FormattedMessage id="manage-user.firstName" />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Quang"
                                            value={firstName}
                                            onChange={(event) => this.onChangeInput(event, 'firstName')}
                                        />
                                    </div>
                                    <div className="form-group col-md-3 my-3">
                                        <label>
                                            <FormattedMessage id="manage-user.lastName" />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Huy"
                                            value={lastName}
                                            onChange={(event) => this.onChangeInput(event, 'lastName')}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-3 my-3">
                                        <label>
                                            <FormattedMessage id="manage-user.phoneNumber" />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="+84 123 456 789"
                                            value={phoneNumber}
                                            onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
                                        />
                                    </div>
                                    <div className="form-group col-md-9 my-3">
                                        <label>
                                            <FormattedMessage id="manage-user.address" />
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputAddress2"
                                            placeholder="Apartment, studio, or floor"
                                            value={address}
                                            onChange={(event) => this.onChangeInput(event, 'address')}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-md-3 my-3">
                                        <label>
                                            <FormattedMessage id="manage-user.gender" />
                                        </label>
                                        <select
                                            className="form-control"
                                            onChange={(event) => this.onChangeInput(event, 'gender')}
                                            value={gender}
                                        >
                                            {genders &&
                                                genders.length > 0 &&
                                                genders.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.keyMap}>
                                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3 my-3">
                                        <label>
                                            <FormattedMessage id="manage-user.position" />
                                        </label>
                                        <select
                                            className="form-control"
                                            onChange={(event) => this.onChangeInput(event, 'position')}
                                            value={position}
                                        >
                                            {positions &&
                                                positions.length > 0 &&
                                                positions.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.keyMap}>
                                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3 my-3">
                                        <label>
                                            <FormattedMessage id="manage-user.role" />
                                        </label>
                                        <select
                                            className="form-control"
                                            onChange={(event) => this.onChangeInput(event, 'role')}
                                            value={role}
                                        >
                                            {roles &&
                                                roles.length > 0 &&
                                                roles.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.keyMap}>
                                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3 my-3">
                                        <label>
                                            <FormattedMessage id="manage-user.image" />
                                        </label>
                                        <div className="preview-img-container">
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="previewImg"
                                                hidden
                                                onChange={(event) => this.handleOnChangeImage(event)}
                                            />
                                            <label htmlFor="previewImg" className="lable-upload">
                                                <FormattedMessage id="manage-user.upload" />{' '}
                                                <i className="fas fa-upload" />{' '}
                                            </label>
                                            <div
                                                className="preview-image"
                                                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                                onClick={() => this.openPreviewImage()}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className={
                                        this.state.action === CRUD_ACTIONS.EDIT
                                            ? 'btn btn-warning my-3 px-4'
                                            : 'btn btn-primary my-3 px-4'
                                    }
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                                        <FormattedMessage id="manage-user.edit" />
                                    ) : (
                                        <FormattedMessage id="manage-user.save" />
                                    )}
                                </button>
                            </form>
                        </div>
                        <div className="col-12 mb-5">
                            <TableManagerUser
                                handleEditUserFromParentKey={this.handleEditUserFromParent}
                                action={this.state.action}
                            />
                        </div>
                    </div>
                </div>

                {this.state.isOpen === true && (
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingGenders: state.admin.isLoadingGenders,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

        getPositionStart: () => dispatch(actions.fetchPositionStart()),

        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        createNewUser: (data) => dispatch(actions.createNewUser(data)),

        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),

        editAUserRedux: (data) => dispatch(actions.editAUser(data)),

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
