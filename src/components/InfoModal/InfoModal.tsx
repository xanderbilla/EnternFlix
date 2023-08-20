"use client"

import useInfoModal from "@/hooks/useInfoModal/useInfoModal";
// import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface InfoModalProps {
  movieId: number;
  visible: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose, movieId }) => {
  const [isVisible, setIsVisible] = useState<boolean>(!!visible);
  // const { movieId } = useInfoModal();

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if(!visible){
    return null
  }

  return (
        <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex 
        justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
            <div className="relative w-[80%] max-w-3xl rounded-md overflow-hidden">
                <div className={`${isVisible ? 'scale-100' : 'scale-0'}
                transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
                    <div className="relative h-96">
                        <video 
                        className="w-full brightness-[60%] object-cover h-full"
                        poster="https://image.tmdb.org/t/p/original/wZMY9X8jtSS5GXFue2lvhgaJkii.jpg"
                        src="https://image.tmdb.org/t/p/original/wZMY9X8jtSS5GXFue2lvhgaJkii.mp4"
                        muted loop/> 
                        <div className="cursor-pointer absolute top-3 right-3 h-10 w-10 
                        rounded-full bg-black bg-opacity-70 flex items-center justify-center" 
                        onClick={handleClose}>
                            <AiOutlineClose className="text-white" size={20}/>
                        </div>
                        <div className="absolute bottom-[10%] left-10">
                            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl
                            font-bold mb-8">
                                Black Mirror
                            </p>
                            <div className="flex flex-row gap-4 items-center">
                                
                            </div>
                        </div>
                    </div>
                    <div className="px-12 py-8 flex justify-between">
                        <div className="flex flex-col flex-1">
                            <div className="flex gap-2 mb-8">
                            <p className="text-green-400 font-semibold text-lg">
                                New
                            </p>
                            <p className="text-white text-lg">1h 23m</p>
                            <p className="text-white text-lg">Comedy</p>
                            </div>
                            <div className="text-white text-lg">This is a descridivtion</div>
                        </div>
                        <div className="flex flex-2 items-center gap-2 mb-8">
                            <p className="text-white text-lg">This is a description</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default InfoModal;
