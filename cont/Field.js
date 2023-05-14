import React from 'react';
import {TextInput} from 'react-native';
import {darkGreen} from './Constants';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 100, color:'#ffffff', paddingHorizontal: 10, width: '70%', backgroundColor: '#002E56', marginVertical: 10,height:60}}
      placeholderTextColor='#ffffff'></TextInput>
  );
};

export default Field;