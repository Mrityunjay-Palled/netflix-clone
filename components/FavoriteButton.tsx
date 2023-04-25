import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import {AiOutlinePlus,AiOutlineCheck} from "react-icons/ai"

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();
  console.log(movieId)
  const isFavorite = useMemo(() => {
    console.log("currentUser",currentUser)
    const list = currentUser?.favoriteIds || [];
    console.log(list.includes(movieId))
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    console.log(movieId)
    let response;
    if (!isFavorite) {
        response = await axios.post('/api/favorite', { movieId })
    }
    const updatedFavoriteIds = response?.data?.favoriteIds;
    mutate({ 
      ...currentUser, 
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);
  
  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div onClick={toggleFavorites} className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
      {/* <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" /> */}
      <Icon className='text-white' size={25} />
    </div>
  )
}

export default FavoriteButton;