import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ListCategoriesFilter } from '../pages/ListCategoriesFilter';
import { Products } from '../pages/Products';

const Stack = createStackNavigator();

export const create = () => {
  return (
    <View>
      <Text>prueba</Text>
    </View>
  );
};

export const DetailsCategori = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Lista de productos"
        component={Products}
      />
      <Stack.Screen
        name="Lista de Categorias"
        options={{
          headerShown: false,
        }}
        component={ListCategoriesFilter}
      />
    </Stack.Navigator>
  );
};
