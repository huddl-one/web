'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { Button } from '../ui/button'


interface CloseModalProps {
    onClick: React.Dispatch<React.SetStateAction<boolean>>; // Define the type of the function prop
}

const CloseModal: FC<CloseModalProps> = ({onClick}) => {
  const router = useRouter()

  return (
    <Button variant='ghost' className='h-6 w-6 p-0 rounded-md' onClick={() => onClick(false)}>
      <X aria-label='close modal' className='h-4 w-4' />
    </Button>
  )
}

export default CloseModal