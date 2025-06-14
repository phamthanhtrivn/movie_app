import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'

const SavedMovieCard = ({ movie_id, poster_url, title, vote_average, release_date }: SavedMovies) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild >
          <TouchableOpacity className='w-[30%]'>
            <Image 
              source={{
                uri: poster_url
                ? poster_url
                : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
              }}
              className='w-full rounded-lg h-52'
              resizeMode='cover'
            />
            <Text className='mt-2 text-sm font-bold text-white' numberOfLines={1} >{title}</Text>
    
            <View className='flex-row items-center justify-start gap-x-1'>
              <Image source={icons.star} className='size-4' />
              <Text className='text-xs font-bold text-white uppercase'>{Math.round(vote_average / 2)}</Text>
            </View>
    
            <View className='flex-row items-center justify-between'>
              <Text className='mt-1 text-xs font-medium text-light-300'>
                {release_date?.split('-')[0]}
              </Text>
              <Text className='text-xs font-medium uppercase text-light-300'>Movie</Text>
            </View>
          </TouchableOpacity>
        </Link>
  )
}

export default SavedMovieCard