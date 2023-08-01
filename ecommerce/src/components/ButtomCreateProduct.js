import React from 'react';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export const ButtomCreateProduct = () => {
  const navigation = useNavigation();

  const handleAddProduct = () => {
    navigation.navigate('Create'); 
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <FAB
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: '#e82954',
            elevation: 10,
          }}
          icon="plus"
          onPress={handleAddProduct}
        />
      </View>
    </View>
  );
};
