import React from 'react'

interface NavbarItemProps {
    label: string;
}

const NavbarItems: React.FC<NavbarItemProps> = ({
    label
}) => {
    return (
        <div className="text-white cursor-pointer hover:text-gray-300 transition">
            {label}
        </div>
    )
}

export default NavbarItems