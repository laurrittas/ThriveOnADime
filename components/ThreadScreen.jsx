import React from 'react';
import { View, Text, FlatList } from 'react-native';

const ThreadScreen = ({ route }) => {
  const { topicId } = route.params;

  // Dummy data for forum posts
  const posts = [
    { id: 1, text: 'Post 1', topicId: 1 },
    { id: 2, text: 'Post 2', topicId: 1 },
    { id: 3, text: 'Post 3', topicId: 2 },
    // ... add more posts here
  ];

  const filteredPosts = posts.filter((post) => post.topicId === topicId);

  const renderPost = ({ item }) => <Text>{item.text}</Text>;

  return (
    <View>
      <Text>Thread Screen</Text>
      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ThreadScreen;