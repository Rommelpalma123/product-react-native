import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { categoriAdmin } from '../utils/constants';
import { Loader } from '../components/Loader';

export const Categories = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const handleCategoryPress = async value => {
    console.log(value);
    navigation.navigate('Categorias Filtradas', {
      selectedCategory: value,
    });
  };

  useEffect(() => {
    setInterval(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ScrollView>
            {categoriAdmin.map((categori, index) => (
              <TouchableOpacity
                onPress={() => handleCategoryPress(categori.value)}
                key={index}
                style={{ padding: 10, alignItems: 'center' }}>
                <Image
                  source={categori.icons}
                  style={{ height: 100, width: 100, borderRadius: 50 }}
                />
                <View>
                  <Text style={{ color: 'black', fontSize: 20 }}>
                    {categori.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </>
  );
};
