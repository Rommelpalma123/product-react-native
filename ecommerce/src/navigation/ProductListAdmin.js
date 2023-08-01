import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ListProductsAdmin } from '../pages/ListProductsAdmin';
import { DetailProduct } from '../pages/DetailProduct';
import { ListCategoriesFilter } from '../pages/ListCategoriesFilter';

const Stack = createStackNavigator();

export const ProductListAdmin = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lista"
        options={{ headerShown: false }}
        component={ListProductsAdmin}
      />

      <Stack.Screen
        name="Details"
        options={{ headerShown: false }}
        component={DetailProduct}
      />

      <Stack.Screen
        name="Categorias Filtradas"
        options={{ headerShown: false }}
        component={ListCategoriesFilter}
      />
    </Stack.Navigator>
  );
};
