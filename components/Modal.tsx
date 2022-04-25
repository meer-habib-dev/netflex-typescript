import React, { useEffect, useState } from 'react'
import MuiModal from '@mui/material/Modal'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtoms'
import { XIcon } from '@heroicons/react/solid'
import { Movie } from '../typing'

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useState<Movie | null>(null)
  const handleClose = () => {
    setShowModal(false)
  }
  useEffect(() => {
    if (!movie) return

    const fetchMovie = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json())
    }
  }, [])
  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <>
        <button
          onClick={handleClose}
          className=" modalButton absolute top-5 right-5 !z-40 flex h-9 w-9 items-center justify-center border-none bg-[#181818] hover:bg-[#181818]  "
        >
          <XIcon className="h-6 w-6" />
        </button>
      </>
    </MuiModal>
  )
}

export default Modal
