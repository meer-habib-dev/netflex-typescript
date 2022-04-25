import React, { useEffect, useState } from 'react'
import MuiModal from '@mui/material/Modal'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtoms'
import { XIcon } from '@heroicons/react/solid'
import { Element, Genre, Movie } from '../typing'
import ReactPlayer from 'react-player'
import { FaPlay } from 'react-icons/fa'

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState)
  const [trailer, setTrailer] = useState('')
  const [genres, setGenres] = useState<Genre[]>([])
  const [muted, setMuted] = useState(false )
  const handleClose = () => {
    setShowModal(false)
  }
  useEffect(() => {
    if (!movie) return

    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json())
      if (data.videos) {
        const index = data.videos.results.findIndex((element: Element) => element.type === 'Trailer')
        setTrailer(data.videos?.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
    }
    fetchMovie()
  }, [movie])
  console.log(trailer)
  return (
    <MuiModal open={showModal} onClose={handleClose} 
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
      <>
        <button
          onClick={handleClose}
          className=" modalButton absolute top-5 right-5 !z-40 flex h-9 w-9 items-center justify-center border-none bg-[#181818] hover:bg-[#181818]  "
        >
          <XIcon className="h-6 w-6" />
        </button>
        <div className='relative p-[56.25%]'>
            <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
                 <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>
                <button className="modalButton" onClick={handleList}>
                {addedToList ? (
                  <CheckIcon className="h-7 w-7" />
                ) : (
                  <PlusIcon className="h-7 w-7" />
                )}
              </button>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal
