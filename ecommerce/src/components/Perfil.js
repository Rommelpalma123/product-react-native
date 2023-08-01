import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import image from '../assets/logo.jpg';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAutentication } from '../store/autentication';

export const Perfil = props => {
  const { isLogin, logout } = useAutentication();

  const logoutButton = () => {
    if (isLogin) {
      return (
        <TouchableOpacity
          onPress={() => logout()}
          style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon2 name="logout" size={20} style={{ color: '#e82954' }} />
            <Text style={{ color: '#e82954', fontSize: 15, marginLeft: 10 }}>
              Cerrar Sesión
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'green', fontSize: 15, marginLeft: 10 }}>
            @RSPP
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <View style={{ alignItems: 'center', height: 150 }}>
          <Image
            source={image}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              marginBottom: 10,
            }}
          />
          <Text style={{ color: 'black', fontSize: 18, marginBottom: 5 }}>
            {isLogin ? 'Admin' : 'Bienvenido'}
          </Text>
        </View>

        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        {logoutButton()}
      </View>
    </View>
  );
};
