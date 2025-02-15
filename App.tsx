import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const HomeScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState(null);
  const [items, setItems] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const addItem = () => {
    if (title && description && price) {
      const newItem = { title, description, price, photo };
      setItems([...items, newItem]);
      setTitle('');
      setDescription('');
      setPrice('');
      setPhoto(null);
      navigation.navigate('Cart', { newItem });
    }
  };

  return (
    <View>
      <Text>Title:</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Enter title" />
      <Text>Description:</Text>
      <TextInput value={description} onChangeText={setDescription} placeholder="Enter description" />
      <Text>Price:</Text>
      <TextInput value={price} onChangeText={setPrice} placeholder="Enter price" keyboardType="numeric" />
      <Button title="Pick an Image" onPress={pickImage} />
      {photo && <Image source={{ uri: photo }} style={{ width: 100, height: 100 }} />}
      <Button title="Add Item" onPress={addItem} />
    </View>
  );
};

const CartScreen = ({ route }) => {
  const [cartItems, setCartItems] = useState([]);

  React.useEffect(() => {
    if (route.params?.newItem) {
      setCartItems([...cartItems, route.params.newItem]);
    }
  }, [route.params?.newItem]);

  return (
    <View>
      <Text>Cart Items:</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>${item.price}</Text>
            {item.photo && <Image source={{ uri: item.photo }} style={{ width: 100, height: 100 }} />}
          </View>
        )}
      />
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
