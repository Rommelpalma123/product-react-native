import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect } from 'react';
import { ButtomCreateProduct } from '../components/ButtomCreateProduct';
import { useProducts } from '../store/products';
import { useNavigation } from '@react-navigation/native';
import { Loader } from '../components/Loader';

export const ListProductsAdmin = () => {
  const { getAllProducts, products } = useProducts();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const navigateToDetail = productId => {
    navigation.navigate('Details', { productId });
  };

  useEffect(() => {
    getAllProducts()
      .then(() => setIsLoading(false))
      .catch(error => {
        console.log('Error al obtener los productos:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ScrollView>
            {products.map(product => {
              return (
                <TouchableOpacity
                  key={product?._id}
                  style={{ margin: 8 }}
                  onPress={() => navigateToDetail(product._id)}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={{ uri: product?.photoUrl }}
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 50,
                        marginRight: 10,
                      }}
                    />
                    <View style={{}}>
                      <Text
                        style={{
                          flexWrap: 'wrap',
                          maxWidth: '90%',
                          color: '#000049',
                        }}>
                        <Text style={{ color: 'black' }}>Nombre: </Text>
                        {product?.name}
                      </Text>
                      <Text
                        style={{
                          flexWrap: 'wrap',
                          maxWidth: '90%',
                          marginTop: 3,
                          color: '#000049',
                        }}>
                        <Text style={{ color: 'black' }}>Categoria: </Text>
                        {product?.categories}
                      </Text>
                      <Text
                        style={{
                          flexWrap: 'wrap',
                          maxWidth: '90%',
                          marginTop: 3,
                          color: '#000049',
                        }}>
                        <Text style={{ color: 'black' }}>Descripcion: </Text>
                        {product?.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={{ position: 'absolute', bottom: 16, right: 16 }}>
            <ButtomCreateProduct />
          </View>
        </>
      )}
    </>
  );
};
