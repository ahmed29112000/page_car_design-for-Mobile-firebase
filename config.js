import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
apiKey: "AIzaSyAqQ7q48q_5EEheApXmpPBsq8Cks3E5pDA",
    authDomain: "test-auth-b69a7.firebaseapp.com",
    projectId: "test-auth-b69a7",
    storageBucket: "test-auth-b69a7.appspot.com",
    messagingSenderId: "798832621424",
    appId: "1:798832621424:web:baf0791df2031cec7001b5"
}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  
}
export {firebase};
