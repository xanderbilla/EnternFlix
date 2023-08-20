import Image from 'next/image'
import React from 'react'

interface AccountMenuProps {
    visible: boolean
}

const AccountMenu: React.FC<AccountMenuProps> = ({
    visible
}) => {

    if(!visible){
        return null
    }

  return (
    <div className='bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800'>
<div className="flex flex-col gap-3">
    <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
        <Image height={32} width={32} src="/img/default-blue.png" alt="avatar" className='w-8 rounded-md'/>
        <p className="text-white text-sm group-hover/item:underline">
            Username
        </p>
    </div>
    <hr className="bg-gray-600 border-0 h-px my-4" />
    <div className="px-3 text-center text-white text-sm hover:underline">
    Sign Out from Netflix
    </div>
</div>
    </div>
  )
}

export default AccountMenu