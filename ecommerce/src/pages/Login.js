import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAutentication } from '../store/autentication';
import { Loader } from '../components/Loader';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { login } = useAutentication();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    login(email, password);
  };

  useEffect(() => {
    setInterval(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{ color: 'black', textAlign: 'center', fontSize: 20 }}>
        Iniciar sesión
      </Text>
      <View style={styles.inputContainer}>
        <Icon2 name="email" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          placeholder="Correo"
          placeholderTextColor="black"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          placeholderTextColor="black"
        />
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={20}
            color={showPassword ? 'black' : 'black'}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 16,
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'none',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: 'transparent',
    color: 'black',
  },
  icon: {
    padding: 8,
  },
  button: {
    backgroundColor: '#e82954',
    padding: 8,
    borderRadius: 5,
    marginTop: 24,
    marginLeft: 8,
    marginRight: 8,
    maxWidth: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
