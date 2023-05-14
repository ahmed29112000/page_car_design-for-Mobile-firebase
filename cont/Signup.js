import React, {useState} from 'react';
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
import Field from './Field';
import {firebase} from '../config';

const Signup = (props) => {
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // eslint-disable-next-line no-undef
  registerUser = async (email, Password, firstName, lastName) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, Password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://test-auth-b69a7.firebaseapp.com',
          })
          .then(() => {
            // alert('verification email sent');
          })
          .catch(error => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection('users')
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email,
              });
          })
          .catch(error => {
            alert(error.message);
          });
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <View>
      <ImageBackground
        source={require('./1000_F_418917963_yvvRGRosS2UwUB1CrQrrZshZvTEXXD8L.jpg')}
        style={{height: '100%'}}
      />
      <View style={{alignItems: 'center', width: 460, position: 'absolute'}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 10,
            textAlign: 'center',
          }}>
          Register
        </Text>

        <View
          style={{
            backgroundColor: '#ffffffd1',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#009CF9',
              fontSize: 25,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Create a new account
          </Text>
          <Field
            placeholder="First Name"
            onChangeText={firstName => setFirstName(firstName)}
            autoCorrect={false}
          />
          <Field
            placeholder="Last Name"
            onChangeText={lastName => setLastName(lastName)}
            autoCorrect={false}
          />
          <Field
            placeholder="Email / User Name"
            keyboardType={'email-address'}
            onChangeText={email => setEmail(email)}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {/* <Field
            placeholder="Contact Number"
            keyboardType={'number'}
            onChangeText={number => setNumber(number)}
          /> */}
          <Field
            
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={Password => setPassword(Password)}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Text style={{
              marginBottom: 20,
            }}></Text>
          {/* <Field placeholder="Confirm Password" secureTextEntry={true} /> */}
          <TouchableOpacity
            // eslint-disable-next-line no-undef
            onPress={() => registerUser(email, Password, firstName, lastName)}
            style={{
              backgroundColor: '#2196F3',
              borderRadius: 50,
              alignItems: 'center',
              width: 330,
              paddingVertical: 5,
              marginVertical: 10,
            }}>
            <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
              Sign up
            </Text>
          </TouchableOpacity>
          {/* <Btn
            textColor="white"
            bgColor="#2196F3"
            btnLabel="Signup"
            Press={() => {
              alert('Accoutn created');
              props.navigation.navigate('Status');
            }}
          /> */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Already have an account ?{'   '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{color: '#009CF9', fontWeight: 'bold', fontSize: 16}}>
                Log in{'   '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Signup;
