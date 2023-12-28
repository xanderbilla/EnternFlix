"use client"

import useInfoModal from "@/hooks/useInfoModal/useInfoModal";
import Image from "next/image";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";
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

    if (!visible) {
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
                            muted loop />
                        <div className="cursor-pointer absolute top-3 right-3 h-10 w-10 
                        rounded-full bg-black bg-opacity-70 flex items-center justify-center"
                            onClick={handleClose}>
                            <AiOutlineClose className="text-white" size={20} />
                        </div>
                        <div className="absolute bottom-[10%] left-10">
                            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl
                            font-bold mb-8">
                                Black Mirror
                            </p>
                            <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                                <button
                                    className="bg-white text-black rounded-[4px] 
                    py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold 
                    flex flex-row items-center hover:bg-neutral-300 transition"
                                >
                                    <BsPlayFill className="mr-1" /> Play
                                </button>
                                <button
                                    className="bg-white text-white bg-opacity-30 rounded-[4px] 
                    py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold 
                    flex flex-row items-center hover:bg-opacity-20 gap-1 transition"
                                >
                                    <AiOutlineInfoCircle className="mr-1" /> More Info
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="px-12 py-8 flex xs:flex- justify-between">
                        <div className="flex flex-col flex-1 pr-6">
                            <div className="flex flex-col text-white text-lg mb-8 gap-2">
                                <div><span className="font-semibold">Casts: </span>Wunmi Mosaku · Katie</div>
                                <div><span className="font-semibold">Released At: </span>2011</div>
                            </div>
                            <div className="text-white text-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus voluptatem a ratione suscipit voluptate tempore ipsa.</div>
                        </div>
                        <div className="flex flex-[0.5] items-center gap-2 mb-8">
                            <div className="w-full flex-col items-center justify-center">
                                <div className="w-full h-14 flex items-center justify-center py-4">
                                    <Image src="/img/logo.png" width={100} height={100} alt="" />
                                </div>
                                <div className="flex gap-2 items-center justify-center mb-2">
                                    <p className="text-green-400 font-semibold text-lg">
                                        New
                                    </p>
                                    <p
                                        className="border border-neutral-500/90 rounded-lg p-1 px-2 
                                    text-white text-[12px] lg:text-sm font-medium"
                                    >
                                        U/A 16+
                                    </p>
                                    <p className="flex items-center justify-center bg-neutral-600 px-2 rounded-md text-white text-[12px] lg:text-sm">
                                        HD
                                    </p>
                                </div>
                                <div className="flex items-center justify-center py-2 text-white text-[22px]">
                                    1h 23m
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    )
};

export default InfoModal;
