import { createDrawerNavigator } from '@react-navigation/drawer';
import { Login } from '../pages/Login';
import { Perfil } from '../components/Perfil';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import { Categories } from '../pages/Categories';
import { useAutentication } from '../store/autentication';
import { CreateProduct } from '../pages/CreateProduct';
import { Horario } from '../pages/Horario';
import { DetailsCategori } from './DetailsCategori';
import { ProductListAdmin } from './ProductListAdmin';
import { useRoute } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export const Sidebar = () => {
  const { isLogin } = useAutentication();

  return (
    <Drawer.Navigator
      initialRouteName="Lista de productos"
      drawerContent={props => <Perfil {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#98C1D9',
        drawerInactiveBackgroundColor: '#fff',
        drawerLabelStyle: { marginLeft: -20, fontSize: 15 },
      }}>
      {!isLogin ? (
        <>
          <Drawer.Screen
            name="Lista de productos"
            component={DetailsCategori}
            options={{
              title: 'Metamorphosis Style',
              drawerLabel: 'Productos',
              drawerIcon: ({ focused }) => (
                <Icon
                  name="filter"
                  size={20}
                  color={focused ? '#e82954' : '#333'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Iniciar Sesion"
            component={Login}
            options={{
              title: 'Metamorphosis Style',
              drawerLabel: 'Iniciar Sesion',
              drawerIcon: ({ focused }) => (
                <Icon
                  name="sign-in"
                  size={20}
                  color={focused ? '#e82954' : '#333'}
                />
              ),
            }}
          />

          <Drawer.Screen
            name="Horario"
            component={Horario}
            options={{
              title: 'Metamorphosis Style',
              drawerLabel: 'Horario',
              drawerIcon: ({ focused }) => (
                <Icon4
                  name="date-range"
                  size={20}
                  color={focused ? '#e82954' : '#333'}
                />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen
            name="Lista"
            component={ProductListAdmin}
            options={{
              title: 'Metamorphosis Style',
              drawerLabel: 'Lista Productos',
              drawerIcon: ({ focused }) => (
                <Icon
                  name="shopping-cart"
                  size={20}
                  color={focused ? '#e82954' : '#333'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Categorias"
            component={Categories}
            options={{
              title: 'Metamorphosis Style',
              drawerLabel: 'Categorias',
              drawerIcon: ({ focused }) => (
                <Icon
                  name="shopping-cart"
                  size={20}
                  color={focused ? '#e82954' : '#333'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Create"
            component={CreateProduct}
            options={{
              title: 'Metamorphosis Style',
              drawerLabel: 'Crear Producto',
              drawerIcon: ({ focused }) => (
                <Icon2
                  name="create"
                  size={20}
                  color={focused ? '#e82954' : '#333'}
                />
              ),
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};
