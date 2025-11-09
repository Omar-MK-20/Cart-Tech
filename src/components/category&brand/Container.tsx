import { BrandI, CategoryI } from '@/interfaces'
import React from 'react'
import CardComponent from './Card'

function Container({ list, name }: { list: CategoryI[] | BrandI[], name: string }) {
    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8 w-fit">
                    <h1 className="text-3xl font-bold mb-4">{name}</h1>
                    <p className="text-muted-foreground">
                        Discover amazing {name} from our collection
                    </p>
                </div>


                <div
                    className={`grid gap-6 relative
                    ${true
                            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                            : "grid-cols-1"
                        }`}
                >
                    {list.map((item) => (
                        <CardComponent key={item._id} item={item} name={name} />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Container