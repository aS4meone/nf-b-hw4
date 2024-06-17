import { ISong } from '@/types/song'
import axiosInstance from '../utils/axiosInstance'


export const getAllSongs = async (): Promise<ISong[]> => {
  const response = await axiosInstance.get('/songs')
  return response.data
}

export const streamSongById = (id: string): string => {
  const url = `${axiosInstance.defaults.baseURL}songs/stream/${id}`
  return url
}


export const getUserSongs = async (): Promise<ISong[]> => {
  const accessToken = localStorage.getItem('accessToken')
  const response = await axiosInstance.get('/songs/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return response.data
}


export const deleteSongById = async (id: string): Promise<void> => {
  const accessToken = localStorage.getItem('accessToken')
  await axiosInstance.delete(`/songs/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}