
import { ReactNode } from 'react'

export default function AdminLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <div className="flex-1 w-full flex flex-col items-center">
            {children}
        </div>
    )
}
