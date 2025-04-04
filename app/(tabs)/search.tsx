import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import MovieCard from '@/components/MovieCard'
import {images} from 'assets/constants/images'
import {icons} from 'assets/constants/icons'
import { fetchMovies } from "@/Services/api";
import useFetch from "@/Services/useFetch";
import SearchBar from '@/components/SearchBar';
import { useEffect } from 'react'
import { updateSearchCount } from '@/Services/appwrite'

const search = () => {

  const [searchQuery,setSearchQuery] =useState('')

  const handleSearch = (text: string) => {
    // const sanitizedQuery = text.replace(/[^a-zA-Z0-9\s]/g, "").trim();
    // setSearchQuery(sanitizedQuery);
    setSearchQuery(text);
  };

  

  const {data: movies,
          loading,
          error,
        refetch: loadMovies,
      reset,} = useFetch(()=> 
          fetchMovies({
            query:searchQuery
          }),false)

          useEffect(() => {
            const timeoutId = setTimeout(async () => {
              if (searchQuery.trim()) {
                await loadMovies();
              } else {
                reset()
              }
            }, 500);
            return () => clearTimeout(timeoutId);
          }, [searchQuery]);

          useEffect(() => {
            if (searchQuery.trim() && movies?.length > 0) {
              updateSearchCount(searchQuery, movies[0])
                .catch((error) => console.error("Failed to update search count:", error));
            }
          }, [movies, searchQuery]);




  return (
    <View className='flex-1 bg-primary'>

      <Image source={images.bg} 
      className='flex-1 absolute w-full z-0' 
      resizeMode='cover'/>

<FlatList 
  className='px-5'
  data={movies} 
  renderItem={({item}) => <MovieCard {...item}/>}
  keyExtractor={(item) => item.id.toString()}
  numColumns={3}
  columnWrapperStyle={{
    justifyContent: "flex-start",
    gap: 16,
    marginVertical: 16,
  }}
  contentContainerStyle={{ paddingBottom: 100 }}
  ListHeaderComponent={
    <>
      <View className='w-full flex-row justify-center mt-20 items-center'>
        <Image source={icons.logo} className="w-12 h-10" />
      </View>

      <View className='my-5'>
        <SearchBar 
          placeholder="Search for a movie"
          value={searchQuery}
          onChangeText={handleSearch}
          style={{ color: 'white' }}
        />
      </View>

      {loading && (
        <ActivityIndicator 
          size="large" 
          color="#0000ff" 
          className='my-3' 
        />
      )}

      {error && (
        <Text className='text-red-500 px-5 my-3'>
          Error: {error.message}
        </Text>
      )}

      {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
        <Text className='text-xl text-white font-bold'>
          Search Results for{' '}
          <Text className='text-accent'>{searchQuery}</Text>
        </Text>
      )}
    </>
  }
  ListEmptyComponent={
    !loading && !error ? (
      <View className="mt-10 px-5">
        <Text className='text-center text-gray-500'>
          {searchQuery.trim() 
            ? 'No movies found'
            : 'Start typing to search for movies'}
        </Text>
      </View>
    ) : null
  }
      
      
      />
    </View>
  )
}

export default search