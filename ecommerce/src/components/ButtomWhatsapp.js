import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';

export const ButtomWhatsapp = () => {
  const handleFloatingButtonPress = async () => {
    const phoneNumber = '593961789353';
    const message = 'Estoy interesado en tus servicios de belleza';

    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message,
    )}`;

    try {
      const supported = await Linking.canOpenURL(url);
      await Linking.openURL(url);
    } catch (error) {
      console.log('Error al abrir WhatsApp:', error);
      Alert.alert('Error', 'Hubo un error al abrir WhatsApp.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleFloatingButtonPress}>
        <Icon name="whatsapp" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  floatingButton: {
    backgroundColor: '#25d366',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
});
