import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, Text,  View } from 'react-native';
import Clima  from './componentes/clima';
export default function App() {
  return (
    <View style={styles.container}>
<Clima/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
