import { View, Text, Image } from 'react-native';
import logo from '../assets/logo.jpg';
export const Horario = () => {
  return (
    <View style={{ marginRight: 5, marginLeft: 5 }}>
      

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={logo}
          style={{
            justifyContent: 'center',
            width: 150,
            height: 150,
            marginTop: 20,
            borderRadius: 50,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text style={{ color: 'green', margin: 5 }}>Lunes</Text>
        <Text style={{ color: 'green', margin: 5 }}>Martes</Text>
        <Text style={{ color: 'green', margin: 5 }}>Miercoles</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text style={{ color: 'black', margin: 5 }}>8:00 a.m</Text>
        <Text style={{ color: 'black', margin: 5 }}>8:00 a.m</Text>
        <Text style={{ color: 'black', margin: 5 }}>8:00 a.m</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text style={{ color: 'black', margin: 5 }}>18:00 p.m</Text>
        <Text style={{ color: 'black', margin: 5 }}>18:00 p.m</Text>
        <Text style={{ color: 'black', margin: 5 }}>18:00 p.m</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text style={{ color: 'green', margin: 5 }}>Jueves</Text>
        <Text style={{ color: 'green', margin: 5 }}>Viernes</Text>
        <Text style={{ color: 'green', margin: 5 }}>Sabado</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text style={{ color: 'black', margin: 5 }}>8:00 a.m</Text>
        <Text style={{ color: 'black', margin: 5 }}>8:00 a.m</Text>
        <Text style={{ color: 'black', margin: 5 }}>8:00 a.m</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text style={{ color: 'black', margin: 5 }}>18:00 p.m</Text>
        <Text style={{ color: 'black', margin: 5 }}>18:00 p.m</Text>
        <Text style={{ color: 'black', margin: 5 }}>18:00 p.m</Text>
      </View>
      <Text style={{ color: 'red', fontSize: 15, marginTop: 10 }}>
        Los dias domingo no hay atencion
      </Text>
    </View>
  );
};
