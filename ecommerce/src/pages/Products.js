import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProducts } from '../store/products';
import { categoriAdmin } from '../utils/constants';
import { Loader } from '../components/Loader';
import { ButtomWhatsapp } from '../components/ButtomWhatsapp';

const ProductComponent = ({ product }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const getFirst25Words = text => {
    if (text.length > 25 && !showFullContent) {
      return text.slice(0, 25) + '...';
    } else {
      return text;
    }
  };

  const handleShowMore = () => {
    setShowFullContent(true);
  };

  const handleShowLess = () => {
    setShowFullContent(false);
  };

  return (
    <>
      <TouchableOpacity>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            marginBottom: 10,
            marginRight: 5,
            marginLeft: 5,
          }}>
          <Image
            style={{
              maxWidth: '100%',
              height: 70,
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
            }}
            source={{ uri: product?.photoUrl }}
          />
          <Text
            style={{
              color: '#000000',
              textAlign: 'justify',
              maxWidth: '90%',
              marginTop: 3,
              marginLeft: 4,
            }}>
            {showFullContent ? product?.name : getFirst25Words(product?.name)}
          </Text>
          <Text style={{ color: 'green', marginLeft: 4 }}>
            Precio: ${product?.precio}
          </Text>
          {showFullContent && (
            <View>
              <Text
                style={{
                  color: 'black',
                  maxWidth: '90%',
                  textAlign: 'justify',
                  marginTop: 4,
                  marginBottom: 4,
                  fontSize: 12,
                }}>
                {product?.description}
              </Text>
            </View>
          )}
          {showFullContent ? (
            <TouchableOpacity onPress={handleShowLess}>
              <Text
                style={{
                  color: 'red',
                  marginTop: 5,
                  marginRight: 15,
                  fontSize: 16,
                  marginBottom: 6,
                  textAlign: 'right',
                }}>
                Cerrar
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleShowMore}>
              <Text
                style={{
                  color: 'blue',
                  fontSize: 14,
                  marginBottom: 4,
                  marginLeft: 4,
                }}>
                Mostrar más
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

const Categorias = ({ item }) => {
  const navigation = useNavigation();

  const handleCategoryPress = () => {
    navigation.navigate('Lista de Categorias', {
      selectedCategory: item.value,
    });
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        flex: 1,
        padding: 15,
        justifyContent: 'space-around',
      }}
      onPress={handleCategoryPress}>
      <View>
        <Image
          source={item.icons}
          style={{ height: 50, width: 50, borderRadius: 50 }}
        />
        <Text style={{ color: 'black', textAlign: 'center' }}>
          {item.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const Products = () => {
  const { products, getAllProducts } = useProducts();
  const [isLoading, setIsLoading] = useState(true);
  const limitProducts = products.slice(0, 5);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    getAllProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <View>
            <FlatList
              keyExtractor={item => item.value}
              numColumns={3}
              columnWrapperStyle={{}}
              data={categoriAdmin}
              renderItem={({ item }) => <Categorias item={item} />}
            />
          </View>

          <FlatList
            data={limitProducts}
            renderItem={({ item }) => (
              <ProductComponent key={item._id} product={item} />
            )}
          />
        </>
      )}

      <ButtomWhatsapp />
    </>
  );
};
