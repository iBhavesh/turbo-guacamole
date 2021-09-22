import React, {useReducer} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import FormField from '../components/FormField';
import colors from '../constants/colors';
import {addUser} from '../store/reducers/userSlice';

const initialState = {
  name: {
    isTouched: false,
    isValid: false,
    error: 'Name is required',
    value: '',
  },
  age: {
    isTouched: false,
    isValid: false,
    error: 'Age is Requried',
    value: '',
  },
  profession: {
    isTouched: false,
    isValid: false,
    error: 'Profession is Requried',
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
        age: state.age,
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
        age: state.age,
      };
    case 'age':
      return {
        name: state.name,
        profession: state.profession,
        age: {
          ...state.age,
          isValid: action.payload.isValid,
          error: action.payload.error,
          value: action.payload.value,
        },
      };
    case 'nameBlur':
      return {
        name: {...state.name, isTouched: true},
        profession: {...state.profession},
        age: {...state.age},
      };
    case 'professionBlur':
      return {
        name: {...state.name},
        profession: {...state.profession, isTouched: true},
        age: {...state.age},
      };
    case 'ageBlur':
      return {
        name: {...state.name},
        profession: {...state.profession},
        age: {...state.age, isTouched: true},
      };
    default:
      break;
  }
};

const UserEditScreen = ({navigation}) => {
  const [formState, formDispatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();

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
  const ageChangeHandler = value => {
    let isValid = true;
    let error = '';
    if (value.length === 0) {
      isValid = false;
      error = 'Age is required';
    } else if (+value <= 0 || +value > 150) {
      isValid = false;
      error = 'Age is not valid';
    }
    formDispatch({type: 'age', payload: {value, isValid, error}});
  };
  const ageBlurHandler = value => {
    if (formState.age.isTouched) {
      return;
    }
    formDispatch({type: 'ageBlur'});
  };

  const submitHandler = () => {
    const user = {
      name: formState.name.value,
      age: formState.age.value,
      profession: formState.profession.value,
    };
    dispatch(addUser(user));
    navigation.goBack();
  };

  const isValid =
    formState.name.isValid &&
    formState.age.isValid &&
    formState.profession.isValid;

  return (
    <View>
      <FormField
        placeholder="Name"
        label="Name"
        onChangeText={nameChangeHandler}
        onBlur={nameBlurHandler}
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
        placeholder="Age"
        label="Age"
        onChangeText={ageChangeHandler}
        onBlur={ageBlurHandler}
        keyboardType="numeric"
        errorMessage={formState.age.isTouched ? formState.age.error : ''}
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
