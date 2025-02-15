import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Item } from '../types';

type CartScreenRouteProp = RouteProp<RootStackParamList, 'Cart'>;

interface Props {
  route: CartScreenRouteProp;
}

const CartScreen: React.FC<Props> = ({ route }) => {
  const { cart } = route.params;

  const itemCounts: { [key: string]: number } = {};
  cart.forEach((item) => {
    itemCounts[item.id] = (itemCounts[item.id] || 0) + 1;
  });

  const uniqueItems = Object.keys(itemCounts).map((id) => {
    const item = cart.find((item) => item.id === id)!;
    return { ...item, quantity: itemCounts[id] };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      <FlatList
        data={uniqueItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
});

export default CartScreen;