import { useRoute } from '@react-navigation/native';
import { useProducts } from '../store/products';
import { View, Button, TextInput, StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { updateProductAny } from '../utils/constants';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const categoriesOptions = [
  { label: 'Cabello', value: 'cabello' },
  { label: 'Uñas', value: 'unas' },
  { label: 'Maquillaje', value: 'maquillaje' },
  { label: 'Depilaciones', value: 'depilacion' },
  { label: 'Tintes', value: 'tintes' },
  { label: 'Tratamientos Capilares', value: 'tratamientos' },
];

const imageUrlToBase64 = async url => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const base64String = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return base64String;
  } catch (error) {
    console.log('Error al convertir la imagen a base64:', error);
    return null;
  }
};

export const DetailProduct = () => {
  const [formValues, setFormValues] = useState(updateProductAny);
  const [img, setImg] = useState('');

  const {
    getProductBiId,
    updateProductById,
    deleteProductBiId,
    getAllProducts,
  } = useProducts();
  const route = useRoute();
  const productId = route.params.productId;
  const navigation = useNavigation();

  const update = async () => {
    try {
      let data;
      if (formValues.photoUrl.includes('cloudinary')) {
        const base64Image = await imageUrlToBase64(formValues.photoUrl);
        console.log(base64Image, 'sin modificar');
        data = {
          precio: parseFloat(formValues.precio),
          name: formValues.name,
          description: formValues.description,
          photoUrl: base64Image,
          categories: formValues.categories,
        };
      } else {
        data = {
          precio: parseFloat(formValues.precio),
          name: formValues.name,
          description: formValues.description,
          photoUrl: formValues.photoUrl,
          categories: formValues.categories,
        };
      }
      await updateProductById(productId, data);

      navigation.navigate('Lista');
    } catch (error) {
      console.log('error al actualizar el producto', error);
    } finally {
      await getAllProducts();
    }
  };

  const eliminarBiId = async id => {
    try {
      await deleteProductBiId(productId);
      navigation.navigate('Lista');
    } catch (err) {
      console.log(err);
    } finally {
      await getAllProducts();
    }
  };

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
          const igmSelect = response.assets[0].uri;
          setImg(igmSelect);
          const selectedBase64Image = response.assets[0].base64;
          setFormValues({ ...formValues, photoUrl: selectedBase64Image });
        }
      });
    } catch (error) {
      console.log('Error al seleccionar imagen:', error);
    }
  };

  useEffect(() => {
    const getProductId = async () => {
      try {
        const product = await getProductBiId(productId);
        console.log(product);
        setFormValues(product);
      } catch (error) {
        console.log('Error al obtener el producto', error);
      }
    };

    getProductId();
  }, [productId]);
  return (
    <View style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}>
      <TextInput
        value={formValues?.name}
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
        value={formValues?.precio.toString()}
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
        value={formValues?.description}
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
        search
        maxHeight={300}
        itemTextStyle={{ color: 'black' }}
        labelField="label"
        valueField="value"
        placeholder="Seleccione una categoria"
        value={formValues?.categories}
        onChangeText={item => {
          setFormValues({ ...formValues, categories: item });
        }}
        onChange={item => {
          setFormValues({ ...formValues, categories: item.value });
        }}
      />

      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: formValues?.photoUrl }}
          style={{ height: 40, width: 40, marginTop: 10, borderRadius: 50 }}
        />
        <Image
          source={{ uri: img }}
          style={{ height: 50, width: 50, borderRadius: 50, marginTop: 5 }}
        />
      </View>

      <View style={{ marginTop: 8 }}>
        <Button title="Seleccionar imagen" onPress={selectImage} />
      </View>

      <View style={{ marginTop: 20, flexDirection: 'row' }}>
        <View>
          <Button color="green" title="Actualizar" onPress={update} />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Button color="red" title="Eliminar" onPress={eliminarBiId} />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Button
            color="green"
            title="Regresar"
            onPress={() => navigation.navigate('Lista')}
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
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    color: 'black',
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
