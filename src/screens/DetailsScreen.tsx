import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DetailsScreen = ({ route }: any) => {
  // Extracting the data passed from the FeedScreen
  const { item } = route.params;

  return (
    <ScrollView style={styles.bg}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        
        <Text style={styles.author}>
          By {item.author_name ? item.author_name.join(', ') : 'Unknown Author'}
        </Text>
        
        {item.first_publish_year && (
          <Text style={styles.meta}>First Published: {item.first_publish_year}</Text>
        )}
        
        <View style={styles.divider} />
        
        <Text style={styles.body}>
          Archive ID: {item.key}{'\n\n'}
          In a full production environment, this screen would execute a secondary fetch 
          to retrieve the complete manifesto or text body associated with this ID. 
          For now, this validates the routing parameters and memory persistence.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    color: '#888',
    marginBottom: 16,
  },
  meta: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 20,
  },
  body: {
    fontSize: 16,
    color: '#bbb',
    lineHeight: 24,
  }
});

export default DetailsScreen;