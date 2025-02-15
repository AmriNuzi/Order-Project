import React, { useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, Button, Modal } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Item } from '../types';
import CreateItemForm from '../components/CreateItemForm';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [cart, setCart] = useState<Item[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleAddItem = (newItem: Item) => {
    setItems([...items, newItem]);
    setIsModalVisible(false); 
  };

  const addToCart = (item: Item) => {
    setCart([...cart, item]);
  };

  return (
    <View style={styles.container}>
      <Button title="Create New Item" onPress={() => setIsModalVisible(true)} />

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <CreateItemForm onAddItem={handleAddItem} />
          <Button title="Close" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Button title="Add to Cart" onPress={() => addToCart(item)} />
          </View>
        )}
      />

      <Button title="Go to Cart" onPress={() => navigation.navigate('Cart', { cart })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default HomeScreen;