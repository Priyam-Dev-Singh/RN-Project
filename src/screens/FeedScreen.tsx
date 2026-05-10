import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, TextInput, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setLoading, setListData, nextPage, setSearchTxt, setErrorMsg } from '../store/feedSlice';
import { fetchFeedData } from '../api/apiClient';

const FeedScreen = (props: any) => {
  const dispatch = useAppDispatch();
  const { navigation }: any = props; // Pass props to FeedScreen component: const FeedScreen = (props: any) => {
  const { listData, currentPage, isLoading, searchTxt } = useAppSelector((state) => state.feed);

  const loadData = useCallback(async (isRefresh = false) => {
    if (isLoading) return;
    dispatch(setLoading(true));

    const data = await fetchFeedData(searchTxt, isRefresh ? 1 : currentPage);
    
    if (data) {
      dispatch(setListData({ data, refresh: isRefresh }));
    } else {
      dispatch(setErrorMsg('Failed to fetch data.'));
    }
  }, [searchTxt, currentPage, isLoading, dispatch]);

  // First load
  useEffect(() => {
    if (listData.length === 0) {
      loadData(true);
    }
  }, []);

 
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTxt !== '') loadData(true);
    }, 500);
    return () => clearTimeout(delay);
  }, [searchTxt]);

  const handleLoadMore = () => {
    if (!isLoading) {
      dispatch(nextPage());
      loadData();
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Details', { item })}
    >
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.subtext}>
        {item.author_name ? item.author_name[0] : 'Unknown Author'}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="Search archives..."
          placeholderTextColor="#666"
          value={searchTxt}
          onChangeText={(text) => dispatch(setSearchTxt(text))}
        />
      </View>

      <FlatList
        data={listData}
        keyExtractor={(item, index) => `${item.key}-${index}`}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading ? <ActivityIndicator color="#fff" style={styles.loader} /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  input: {
    backgroundColor: '#111',
    color: '#fff',
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#333',
  },
  card: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtext: {
    color: '#888',
    marginTop: 4,
  },
  loader: {
    marginVertical: 20,
  }
});

export default FeedScreen;