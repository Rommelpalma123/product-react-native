import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useProducts } from '../store/products';
import { Loader } from '../components/Loader';
import { ButtomWhatsapp } from '../components/ButtomWhatsapp'; 
import { useAutentication } from '../store/autentication'

export const ListCategoriesFilter = () => {
  const { getByCategory, getAllProducts } = useProducts();
  const route = useRoute();
  const { isLogin } = useAutentication();
  const [isLoading, setIsLoading] = useState(true);
  const selectedCategory = route.params.selectedCategory;
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchFilteredProducts = async () => {
    try {
      const response = await getByCategory(selectedCategory);
      setFilteredProducts(response);
      setIsLoading(false);
    } catch (error) {
      console.log('Error al obtener los productos filtrados:', error);
      setIsLoading(false);
    }
  };

  const resetFilteredProducts = () => {
    setFilteredProducts([]);
  };

  useEffect(() => {
    resetFilteredProducts();
    setIsLoading(true);
    fetchFilteredProducts();
  }, [selectedCategory]);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <Text style={{ color: 'black', marginLeft: 10, marginTop: 10 }}>
              Categoria: {selectedCategory}
            </Text>
            {filteredProducts.length ? (
              <>
                {filteredProducts.map(product => (
                  <View
                    key={product?._id}
                    style={{
                      marginLeft: 10,
                      marginRight: 10,
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        borderColor: '#000',
                        borderWidth: 0.2,
                        borderRadius: 5,
                      }}>
                      <View style={{ flexDirection: 'row', padding: 3 }}>
                        <View>
                          <Image
                            style={{ height: 80, width: 80, borderRadius: 100 }}
                            source={{ uri: product?.photoUrl }}
                          />
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: 12,
                              maxWidth: '85%',
                              flexWrap: 'wrap',
                              marginLeft: 5,
                              color: 'black',
                            }}>
                            <Text style={{ color: 'black' }}>Nombre: </Text>
                            {product?.name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              maxWidth: '85%',
                              flexWrap: 'wrap',
                              marginLeft: 5,
                              marginTop: 5,
                              color: 'black',
                            }}>
                            <Text style={{ color: 'black' }}>
                              Descripcion:{' '}
                            </Text>
                            {product?.description}
                          </Text>
                          <Text style={{ color: 'green', marginLeft: 5 }}>
                            <Text style={{ color: 'black' }}>Precio: </Text>$
                            {product?.precio}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </>
            ) : (
              <>
                <Text
                  style={{
                    color: 'red',
                    marginTop: 15,
                    fontSize: 20,
                    marginRight: 10,
                    marginLeft: 10,
                    textAlign: 'center',
                  }}>
                  No hay productos para esta categoria
                </Text>
              </>
            )}
          </>
        )}
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 16, right: 16 }}>
        {isLogin ? '' : <ButtomWhatsapp />}
      </View>
    </View>
  );
};
