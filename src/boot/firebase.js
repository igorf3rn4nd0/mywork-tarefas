import Firebase from 'firebase'
import 'firebase/firestore'

Firebase.initializeApp({
  apiKey: "AIzaSyAbvp_nbS6xeW9QThY0XhH_DglRSBK_bRM",
  authDomain: "mywork-tarefas.firebaseapp.com",
  databaseURL: "https://mywork-tarefas.firebaseio.com",
  projectId: "mywork-tarefas",
  storageBucket: "mywork-tarefas.appspot.com",
  messagingSenderId: "186934568460",
  appId: "1:186934568460:web:237aa1ae4d4abf49"
})

export default Firebase

export const db = Firebase.firestore();
