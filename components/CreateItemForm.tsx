import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Item } from '../types';

interface CreateItemFormProps {
  onAddItem: (item: Item) => void;
}

const CreateItemForm: React.FC<CreateItemFormProps> = ({ onAddItem }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [photo, setPhoto] = useState<string>('');

  const handleAddItem = () => {
    const newItem: Item = {
      id: Date.now().toString(),
      title,
      description,
      price,
      photo,
    };
    onAddItem(newItem);
    setTitle('');
    setDescription('');
    setPrice('');
    setPhoto('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Photo URL"
        value={photo}
        onChangeText={setPhoto}
        style={styles.input}
      />
      <Button title="Add Item" onPress={handleAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
});

export default CreateItemForm;