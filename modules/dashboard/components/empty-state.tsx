import React from 'react'
import Image from 'next/image'

const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16">
            <Image
                src="/empty-state.svg"
                alt="No Projects"
                width={192}
                height={192}
                className="w-48 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-500">No Projects Found</h2>
            <p className="text-gray-400">Create a new project to get started</p>
        </div>
    )
}

export default EmptyState