import React, {useReducer, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import FormField from '../components/FormField';
import Modal from '../components/Modal';
import colors from '../constants/colors';
import {addUser} from '../store/reducers/userSlice';

const initialState = {
  name: {
    isTouched: false,
    isValid: false,
    error: 'Name is required',
    value: '',
  },
  phone: {
    isTouched: false,
    isValid: false,
    error: 'Phone is Requried',
    value: '',
  },
  profession: {
    isTouched: false,
    isValid: false,
    error: 'Profession is Requried',
    value: '',
  },
  address: {
    isTouched: false,
    isValid: false,
    error: 'Address is Requried',
    value: '',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return {
        name: {
          ...state.name,
          isValid: action.payload.isValid,
          error: action.payload.error,
          value: action.payload.value,
        },
        profession: state.profession,
        phone: state.phone,
        address: state.address,
      };
    case 'profession':
      return {
        name: state.name,
        profession: {
          ...state.profession,
          isValid: action.payload.isValid,
          error: action.payload.error,
          value: action.payload.value,
        },
        phone: state.phone,
        address: state.address,
      };
    case 'phone':
      return {
        name: state.name,
        profession: state.profession,
        phone: {
          ...state.phone,
          isValid: action.payload.isValid,
          error: action.payload.error,
          value: action.payload.value,
        },
        address: state.address,
      };
    case 'address':
      return {
        name: state.name,
        profession: state.profession,
        phone: state.phone,
        address: {
          ...state.address,
          isValid: action.payload.isValid,
          error: action.payload.error,
          value: action.payload.value,
        },
      };
    case 'nameBlur':
      return {
        name: {...state.name, isTouched: true},
        profession: {...state.profession},
        phone: {...state.phone},
        address: {...state.address},
      };
    case 'professionBlur':
      return {
        name: {...state.name},
        profession: {...state.profession, isTouched: true},
        phone: {...state.phone},
        address: {...state.address},
      };
    case 'phoneBlur':
      return {
        name: {...state.name},
        profession: {...state.profession},
        phone: {...state.phone, isTouched: true},
        address: {...state.address},
      };
    case 'addressBlur':
      return {
        name: {...state.name},
        profession: {...state.profession},
        phone: {...state.phone},
        address: {...state.address, isTouched: true},
      };
    default:
      break;
  }
};

const UserEditScreen = ({navigation}) => {
  const [formState, formDispatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const nameChangeHandler = value => {
    let isValid = true;
    let error = '';
    if (value.length === 0) {
      isValid = false;
      error = 'Name is required';
    }
    formDispatch({type: 'name', payload: {value, isValid, error}});
  };
  const nameBlurHandler = value => {
    if (formState.name.isTouched) {
      return;
    }
    formDispatch({type: 'nameBlur'});
  };

  const professionChangeHandler = value => {
    let isValid = true;
    let error = '';
    if (value.length === 0) {
      isValid = false;
      error = 'Profession is required';
    }
    formDispatch({type: 'profession', payload: {value, isValid, error}});
  };
  const profesisonBlurHandler = value => {
    if (formState.profession.isTouched) {
      return;
    }
    formDispatch({type: 'professionBlur'});
  };

  const addressChangeHandler = value => {
    let isValid = true;
    let error = '';
    if (value.length === 0) {
      isValid = false;
      error = 'Address is required';
    }
    formDispatch({type: 'address', payload: {value, isValid, error}});
  };
  const addressBlurHandler = value => {
    if (formState.address.isTouched) {
      return;
    }
    formDispatch({type: 'addressBlur'});
  };

  const phoneChangeHandler = value => {
    let isValid = true;
    let error = '';
    if (value.length === 0) {
      isValid = false;
      error = 'Phone is required';
    } else if (value.length < 10 || value.length > 15) {
      isValid = false;
      error = 'Phone is not valid';
    }
    formDispatch({type: 'phone', payload: {value, isValid, error}});
  };
  const phoneBlurHandler = value => {
    if (formState.phone.isTouched) {
      return;
    }
    formDispatch({type: 'phoneBlur'});
  };

  const submitHandler = () => {
    const user = {
      id: Date.now(),
      name: formState.name.value,
      profession: formState.profession.value,
      phone: formState.phone.value,
      address: formState.address.value,
    };
    dispatch(addUser(user));
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
    navigation.goBack();
  };

  const isValid =
    formState.name.isValid &&
    formState.address.isValid &&
    formState.profession.isValid &&
    formState.phone.isValid;

  return (
    <View>
      <Modal visible={isModalVisible} onClose={onModalClose} />
      <FormField
        placeholder="Full Name"
        label="Full Name"
        onChangeText={nameChangeHandler}
        onBlur={nameBlurHandler}
        errorMessage={formState.name.isTouched ? formState.name.error : ''}
      />
      <FormField
        placeholder="Profession"
        label="Profession"
        onChangeText={professionChangeHandler}
        onBlur={profesisonBlurHandler}
        errorMessage={
          formState.profession.isTouched ? formState.profession.error : ''
        }
      />
      <FormField
        placeholder="Phone"
        label="Phone"
        onChangeText={phoneChangeHandler}
        onBlur={phoneBlurHandler}
        errorMessage={formState.phone.isTouched ? formState.phone.error : ''}
      />
      <FormField
        placeholder="Address"
        label="Address"
        onChangeText={addressChangeHandler}
        onBlur={addressBlurHandler}
        errorMessage={
          formState.address.isTouched ? formState.address.error : ''
        }
      />
      <Button
        containerStyle={styles.buttonContainer}
        title="Add"
        buttonStyle={styles.buttonStyle}
        onPress={submitHandler}
        disabled={!isValid}
      />
    </View>
  );
};

export default UserEditScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 300,
    borderRadius: 40,
    backgroundColor: colors.secondaryLight,
  },
});
