import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {firebase} from '../config';

const Status = () => {
  const [name, setName] = useState(' ');
  const [isBlinking, setIsBlinking] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log('user does not exist');
        }
      });
  
  
  // const [firstName, setFirstName] = useState('');
  // const [carEyesStatus, setCarEyesStatus] = useState([]);
  // const [carOwnerMessages, setCarOwnerMessages] = useState([]);

  // useEffect(() => {
  //   // استرداد اسم المستخدم الأول من Firestore
  //   const currentUser = firebase.auth().currentUser;
  //   firestore()
  //     .collection('users')
  //     .doc(currentUser.uid)
  //     .get()
  //     .then(documentSnapshot => {
  //       if (documentSnapshot.exists) {
  //         setFirstName(documentSnapshot.data().firstName);
  //       }
  //     });

  //   // جلب آخر البيانات المضافة إلى مجموعة car_eyes_status
  //   firestore()
  //     .collection('car_eyes_status')
  //     .orderBy('createdAt', 'desc')
  //     .limit(1)
  //     .get()
  //     .then(querySnapshot => {
  //       const data = querySnapshot.docs.map(doc => doc.data());
  //       setCarEyesStatus(data);
  //     });

  //   // جلب آخر البيانات المضافة إلى مجموعة car_owner_messages
  //   firestore()
  //     .collection('car_owner_messages')
  //     .orderBy('createdAt', 'desc')
  //     .limit(1)
  //     .get()
  //     .then(querySnapshot => {
  //       const data = querySnapshot.docs.map(doc => doc.data());
  //       setCarOwnerMessages(data);
  //     });

  }, []);
  useEffect(() => {
    // قم بتعيين النص "blinked" على المتغير text بعد فترة زمنية محددة
    const timer = setTimeout(() => setIsBlinking('blinked'), 5000);

    // قم بإلغاء الـ setTimeout في حالة إعادة ترتيب المكون أو إزالته
    return () => clearTimeout(timer);
  }, []);

  
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 7000);
  }, []);

  useEffect(() => {
    if (show) {
      setText(Math.random() < 0.5 ? 'True' : 'False');
    }
  }, [show]);


  return (
    <SafeAreaView>
      <ImageBackground
        source={require('./1000_F_418917963_yvvRGRosS2UwUB1CrQrrZshZvTEXXD8L.jpg')}
        style={{height: '100%'}}
      />
      <SafeAreaView style={(styles.container, {position: 'absolute'})}>
        <Text
          style={
            (styles.textTitle,
            {
              color: 'white',
              fontSize: 54,
              fontWeight: 'bold',
              marginVertical: 50,
              textAlign: 'center',
            })
          }>
          Driver Status
        </Text>
        <View
          style={{
            backgroundColor: '#ffffffd1',
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 70,
            alignItems: 'center',
          }}>
          <View
            style={{
              borderColor: '#2196F3',
              flexDirection: 'row',
              width: '30%',
              alignSelf: 'center',
              justifyContent: 'space-around',
              width: '72.5%',
              height: 70,
              borderRadius: 100,
              marginVertical: 10,
              borderWidth: 3.5,
              backgroundColor: '#002E56d1',
              marginBottom: 30,
            }}>
            
            <Text style={styles.textBody}>{name.firstName}</Text>
            <Text style={styles.textBody}>Name : </Text>
          </View>

          <View
            style={{
              borderColor: '#2196F3',
              flexDirection: 'row',
              width: '30%',
              alignSelf: 'center',
              justifyContent: 'space-around',
              width: '72.5%',
              height: 70,
              borderRadius: 100,
              marginVertical: 10,
              borderWidth: 3.5,
              backgroundColor: '#002E56d1',
              marginBottom: 30,
            }}>
            <Text style={styles.textBody}> {show && <Text>{text}</Text>}</Text>
            <Text style={styles.textBody}>Owner :</Text>
            
          </View>

          <View
            style={{
              borderColor: '#2196F3',
              flexDirection: 'row',
              width: '30%',
              alignSelf: 'center',
              justifyContent: 'space-around',
              width: '72.5%',
              height: 70,
              borderRadius: 100,
              marginVertical: 10,
              borderWidth: 3.5,
              backgroundColor: '#002E56d1',
            }}>
              <Text style={styles.textBody}>
              {isBlinking}
            </Text>
            <Text style={styles.textBody}>Eye Status : </Text>
            

          </View>
          <Text style={{
              marginBottom: 20,
            }}></Text>
          {/* <View
            style={{
              borderColor: '#2196F3',
              flexDirection: 'row',
              width: '30%',
              alignSelf: 'center',
              justifyContent: 'space-around',
              width: '72.5%',
              height: 70,
              borderRadius: 100,
              marginVertical: 10,
              borderWidth: 3.5,
              backgroundColor: '#002E56d1',
            }}>
            <Text style={styles.textBody}>Total Blinks : </Text>
            <Text style={styles.textBody}>...</Text>
          </View> */}
          <TouchableOpacity
            onPress={() => { firebase.auth().signOut() }}
            style={{
              backgroundColor: '#2196F3',
              borderRadius: 50,
              alignItems: 'center',
              width: 330,
              paddingVertical: 5,
              marginVertical: 10,
            }}>
            <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    color: '#2196F3',
    marginBottom: 20,
  },

  textTitle: {
    fontSize: 70,
    fontFamily: 'Foundation',
    marginVertical: 5,
    borderBottomWidth: 0,
  },
  textBody: {
    fontSize: 26,
    fontFamily: 'Foundation',
    borderColor: 'blue',
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 0,
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 0,
  },
});
export default Status;
