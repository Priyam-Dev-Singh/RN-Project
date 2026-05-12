import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, TextInput, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setLoading, setListData, nextPage, setSearchTxt, setErrorMsg } from '../store/feedSlice';
import { fetchFeedData } from '../api/apiClient';

const FeedScreen = (props: any) => {
  const dispatch = useAppDispatch(); // used to update the redux states like isLoading current page etc
  const { navigation }: any = props; 
  const { listData, currentPage, isLoading, searchTxt } = useAppSelector((state) => state.feed);// refreshes the screen and the feed whenever the redux state changes

  const loadData = useCallback(async (isRefresh = false) => {
    if (isLoading) return;
    dispatch(setLoading(true));

    const data = await fetchFeedData(searchTxt, isRefresh ? 1 : currentPage);
    // isRefresh acts as the trigger to load the new page.
    //loadData(true) clears the current page and loads page 1
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
  }, [listData.length, loadData]);

 
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTxt !== '') loadData(true);
    }, 500);// sets a delay after the each serach letter so the api call doesnt happen simultaneously only after the user has typed the full word
    return () => clearTimeout(delay);
  }, [searchTxt, loadData]);

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
      onPress={() => navigation.navigate('Details', { item })}// navigates to the Details screne by passing the parameter as item
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
          onChangeText={(text) => dispatch(setSearchTxt(text))}// the global search state is updated
        />
      </View>

      <FlatList
        data={listData}
        keyExtractor={(item, index) => `${item.key}-${index}`}
        renderItem={renderItem}
        onEndReached={handleLoadMore}// when end is reached load the next page
        onEndReachedThreshold={0.5} // when 50% of the screen is crossed onEndReached is triggered
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