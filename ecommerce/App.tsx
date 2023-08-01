import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Sidebar } from './src/navigation/Sidebar';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Sidebar />
    </NavigationContainer>
  );
}

export default App;