import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useProducts } from '../store/products';
import { createProductAny } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

const categoriesOptions = [
  { label: 'Cabello', value: 'cabello' },
  { label: 'Uñas', value: 'unas' },
  { label: 'Maquillaje', value: 'maquillaje' },
  { label: 'Depilaciones', value: 'depilacion' },
  { label: 'Tintes', value: 'tintes' },
  { label: 'Tratamientos Capilares', value: 'tratamientos' },
];

export const CreateProduct = () => {
  const [formValues, setFormValues] = useState(createProductAny);
  const { createProduct, getAllProducts } = useProducts();
  const [img, setImg] = useState('');
  const naviagation = useNavigation();

  const selectImage = async () => {
    try {
      const options = {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true,
      };

      launchImageLibrary(options, response => {
        if (
          !response.didCancel &&
          !response.error &&
          response.assets.length > 0
        ) {
          const imagSelect = response.assets[0].uri;
          setImg(imagSelect);
          const selectedBase64Image = response.assets[0].base64;
          setFormValues({ ...formValues, photoUrl: selectedBase64Image });
        }
      });
    } catch (error) {
      console.log('Error al seleccionar imagen:', error);
    }
  };

  const save = async () => {
    try {
      let _data = {
        ...formValues,
        precio: parseFloat(formValues.precio),
      };
      await createProduct(_data);
      naviagation.navigate('Lista');
      setFormValues(createProductAny);
    } catch (error) {
      console.log('error al crear el producto', error);
    } finally {
      await getAllProducts();
    }
  };

  return (
    <View style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}>
      <TextInput
        placeholderTextColor="black"
        placeholder="Nombre"
        onChangeText={text => setFormValues({ ...formValues, name: text })}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 4,
          padding: 8,
          marginTop: 8,
          color: 'black',
        }}
      />
      <TextInput
        keyboardType="numeric"
        onChangeText={text => setFormValues({ ...formValues, precio: text })}
        placeholderTextColor="black"
        placeholder="Precio"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 4,
          padding: 8,
          marginTop: 8,
          color: 'black',
        }}
      />
      <TextInput
        placeholderTextColor="black"
        onChangeText={text =>
          setFormValues({ ...formValues, description: text })
        }
        placeholder="Descripcion"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 4,
          padding: 8,
          marginTop: 8,
          color: 'black',
        }}
      />

      <Dropdown
        data={categoriesOptions}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        maxHeight={300}
        itemTextStyle={{ color: 'black' }}
        labelField="label"
        valueField="value"
        placeholder="Seleccione una categoria"
        value={formValues.categories}
        onChangeText={item => {
          setFormValues({ ...formValues, categories: item });
        }}
        onChange={item => {
          setFormValues({ ...formValues, categories: item.value });
        }}
      />
      <Image
        source={{ uri: img }}
        style={{ height: 50, width: 50, borderRadius: 50, marginTop: 5 }}
      />

      <View style={{ marginTop: 8 }}>
        <Button title="Seleccionar imagen" onPress={selectImage} />
      </View>

      <View style={{ marginTop: 20, flexDirection: 'row' }}>
        <View style={{ padding: 4 }}>
          <Button color="green" title="Guardar" onPress={() => save()} />
        </View>
        <View style={{ padding: 4 }}>
          <Button
            color="red"
            title="Regresar"
            onPress={() => naviagation.navigate('Lista')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 10,
    height: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },
});
