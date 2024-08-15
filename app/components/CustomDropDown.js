import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, RefreshControl, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Ensure this is installed

const RenderEmpty = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text>List Empty!</Text>
    </View>
  );
};

const RenderFooter = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }
  return (
    <View style={styles.footerContainer}>
      <ActivityIndicator color={'gray'} size={'large'} />
    </View>
  );
};

const CustomDropDown = () => {
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const ref = useRef(null);

  const fetchApi = async (url, isRefresh = false) => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const json = await response.json();

      if (json) {
        if (isRefresh) {
          setData([]);
        }

        setNextPage(json?.next || null);
        setData((prev) => [...prev, ...json?.results]);

        setIsLoading(false);
      }
    } catch (error) {
      console.log('Error: ', error);
      setIsLoading(false);
    }
  };

  const onRefresh = () => {
    fetchApi('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0', true);
  };

  const onLoadMore = () => {
    if (!isSearch && nextPage) {
      fetchApi(nextPage);
    }
  };

  useEffect(() => {
    fetchApi('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
  }, []);

  return (
    <Dropdown
      ref={ref}
      style={styles.dropdown}
      containerStyle={styles.container}
      backgroundColor={'rgba(0,0,0,0.2)'}
      data={data}
      value={value}
      inverted={false}
      labelField="name"
      valueField="url"
      placeholder="Lazy Load Dropdown"
      search
      maxHeight={250}
      searchPlaceholder="Search..."
      onChange={(item) => {
        setValue(item?.url || null);
        setIsSearch(false);
      }}
      onChangeText={(keyword) => {
        setIsSearch(keyword.length > 0);
      }}
      flatListProps={{
        ListEmptyComponent: <RenderEmpty />,
        ListFooterComponent: <RenderFooter isLoading={isLoading} />,
        refreshControl: (
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        ),
        onEndReachedThreshold: 0.5,
        onEndReached: onLoadMore,
      }}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} name="dribbble" size={20} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#DDDDDD',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
  },
  icon: {
    marginRight: 5,
  },
  container: {
    marginTop: 4,
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  footerContainer: {
    padding: 16,
    alignItems: 'center',
  },
});

export default CustomDropDown;
