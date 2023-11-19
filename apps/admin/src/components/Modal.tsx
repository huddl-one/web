
import { Loader2 } from 'lucide-react';
import React, { FC, useState } from 'react';
import CloseModal from './CloseModal';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface ModalProps {
  popupTitle: string;
  popupDescription: string;
  popupCTA: string;
  popupCTAHandler: () => void;
  children: React.ReactNode;
  toClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal: FC<ModalProps> = (params) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className='fixed inset-0 bg-zinc-900/20 z-10'>
    <div className='container flex items-center h-full max-w-md mx-auto'>
    <Card className="relative bg-white w-full h-fit rounded-lg p-2">
<div className='absolute top-4 right-4'>
          <CloseModal onClick={params.toClose} />
        </div>
      <CardHeader>
        <CardTitle>{params.popupTitle}</CardTitle>
        <CardDescription>{params.popupDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        {params.children}
      </CardContent>
      <CardFooter className="flex gap-3 w-full">
        <Button variant="outline" disabled={loading} onClick={() => params.toClose(false)} className='w-full'>Cancel</Button>
        <Button className='w-full' disabled={loading} onClick={() => {
            setLoading(true)
          params.popupCTAHandler()
          }}><span>{loading ? <Loader2 className="w-4 h-4 animate-spin stroke-white mr-2" /> : ""}</span>{params.popupCTA}</Button>
      </CardFooter>
    </Card>
    </div>
  </div>
  )
}



