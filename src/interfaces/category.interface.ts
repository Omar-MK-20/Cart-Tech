export interface CategoryI {
    _id: string
    name: string
    slug: string
    image: string
    createdAt?: string
    updatedAt?: string
}

export interface SubCategoryI {
    _id: string
    name: string
    slug: string
    category: string
    createdAt?: string
    updatedAt?: string
}