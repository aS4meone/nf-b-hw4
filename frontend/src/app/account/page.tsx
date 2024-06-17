'use client'

import { useState, useEffect } from 'react'
import { getUserSongs, streamSongById, deleteSongById } from '@/utils/songService'
import { ISong } from '@/types/song'

const Home: React.FC = () => {
  const [songs, setSongs] = useState<ISong[]>([])
  const [currentSong, setCurrentSong] = useState<string | null>(null)
  const [audioSrc, setAudioSrc] = useState<string | null>(null)

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const fetchedSongs = await getUserSongs()
        setSongs(fetchedSongs)
      } catch (error) {
        console.error('Error fetching songs:', error)
      }
    }

    fetchSongs()
  }, [])

  useEffect(() => {
    if (currentSong) {
      const src = streamSongById(currentSong)
      console.log('Generated audio src:', src) // Debugging line to check URL
      setAudioSrc(src)
    }
  }, [currentSong])

  const playSong = (id: string) => {
    setCurrentSong(id)
  }

  const deleteSong = async (id: string) => {
    try {
      await deleteSongById(id)
      setSongs(songs.filter((song) => song._id !== id))
    } catch (error) {
      console.error('Error deleting song:', error)
    }
  }

  return (
    <div className='bg-gray-900 text-white min-h-screen p-4 mt-12'>
      <h1 className='text-3xl font-bold mb-1'>User&apos;s Songs</h1>
      <h2 className='text-xl mb-4 pr-5'>Если страница пустая - значит на вашем аккаунте нет песен (которые вы загрузили)</h2>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {songs.map((song) => (
          <li key={song._id} className='bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center'>
            <h2 className='text-xl font-semibold mb-2'>{song.title}</h2>
            <p className='text-gray-400 mb-4'>{song.artist}</p>
            <div className='flex space-x-4'>
              <button
                onClick={() => playSong(song._id)}
                className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full transition duration-300'
              >
                Play
              </button>
              <button
                onClick={() => deleteSong(song._id)}
                className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full transition duration-300'
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {audioSrc && (
        <div className='fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex items-center justify-center'>
          <audio controls autoPlay className='w-full max-w-md '>
            <source src={audioSrc} type='audio/mpeg' />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  )
}

export default Home
