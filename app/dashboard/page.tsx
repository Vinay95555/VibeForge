import AddNewButton from '@/modules/dashboard/components/add-new'
import AddRepo from '@/modules/dashboard/components/add-repo'
import EmptyState from '@/modules/dashboard/components/empty-state'
import ProjectTable from '@/modules/dashboard/components/project-table'
import { getPlaygroundsForUser } from '@/modules/dashboard/actions'
import React from 'react'

const Page = async () => {
    const playgrounds = await getPlaygroundsForUser()

    return (
        <div className="flex flex-col justify-start items-center mx-auto max-w-7xl px-4 py-10 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <AddNewButton />
                <AddRepo />
            </div>
            <div className="mt-10 flex flex-col justify-start items-center w-full">
                {playgrounds && playgrounds.length === 0 ? (
                    <EmptyState />
                ) : (
                    <ProjectTable
                        projects={playgrounds || []}
                    />
                )}
            </div>
        </div>
    )
}

export default Page