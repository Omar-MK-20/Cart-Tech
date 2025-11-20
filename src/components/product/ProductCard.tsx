"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/helpers/currency";
import { formatNumberWithSuffix } from "@/helpers/formatNumber";
import { renderStars } from "@/helpers/rating";
import { ProductI } from "@/interfaces";
import { ArrowUpRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps
{
    product: ProductI;
    viewMode?: "grid" | "list";
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps)
{
    // const navigate = Navigate

    if (viewMode === "list")
    {
        return (
            <div className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex flex-col justify-between items-center">
                    <div className="relative w-32 h-32 flex-shrink-0">
                        <Image
                            src={product.imageCover}
                            alt={product.title}
                            fill
                            className="object-cover rounded-2xl"
                            sizes="128px"
                        />

                    </div>
                    <span className="text-2xl font-bold text-primary">
                        {formatPrice(product.price)}
                    </span>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2 relative">
                        <h3 className="font-semibold text-lg line-clamp-2">
                            <Link
                                href={`/products/${product.id}`}
                                className="hover:text-primary transition-colors"
                            >
                                {product.title}
                            </Link>
                        </h3>
                        <Link
                            className="absolute -top-2 sm:top-2 -right-2 sm:right-2  group-hover:opacity-100 bg-white/80 hover:bg-slate-700/80 border-2 hover:text-white rounded-md transition-all"
                            href={`/products/${product.id}`}
                        >
                            <ArrowUpRight className="h-6 w-6" />
                        </Link>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-1 sm:line-clamp-2">
                        {product.description}
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                            {renderStars(product.ratingsAverage)}
                            <span className="text-sm text-muted-foreground ml-1">
                                ({formatNumberWithSuffix(product.ratingsQuantity)})
                            </span>
                        </div>

                        <span className="text-sm text-muted-foreground">
                            {formatNumberWithSuffix(product.sold)} sold
                        </span>
                    </div>

                    {/* <div className="flex items-center"> */}
                    <div className="flex flex-col sm:flex-row md:justify-between gap-3">

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>
                                Brand:{" "}
                                <Link
                                    href={`/products?brand=${product.brand._id}`}
                                    className="hover:text-primary hover:underline transition-colors"
                                >
                                    {product.brand.name}
                                </Link>
                            </span>
                            <span>
                                Category:{" "}
                                <Link
                                    href={`/products?category[in]=${product.category._id}`}
                                    className="hover:text-primary hover:underline transition-colors"
                                >
                                    {product.category.name}
                                </Link>
                            </span>
                        </div>
                        <Button>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                        </Button>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        );
    }

    return (
        <div className="group flex flex-col justify-between bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                    src={product.imageCover}
                    alt={product.description}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Wishlist Button */}
                {/* <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
        > */}
                {/* <Heart  /> */}
                <Link
                    className="absolute top-2 right-2 group-hover:opacity-100 bg-white/80 hover:bg-slate-700/80 border-2 hover:text-white rounded-md transition-all"
                    href={`/products/${product.id}`}
                >
                    <ArrowUpRight className="h-6 w-6" />
                </Link>
                {/* </Button> */}

                {/* Badge for sold items */}
                {product.sold > 100 && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        Popular
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                {/* Brand */}
                <Link
                    href={`/products?brand=${product.brand._id}`}
                    className="text-xs text-muted-foreground mb-1 uppercase tracking-wide hover:text-primary hover:underline transition-colors">
                    {product.brand.name}
                </Link>

                {/* Title */}
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                        {renderStars(product.ratingsAverage)}
                    </div>
                    <span className="text-xs text-muted-foreground">
                        ({product.ratingsQuantity})
                    </span>
                </div>

                {/* Category */}
                <p className="text-xs text-muted-foreground mb-2">
                    <Link
                        href={`/products?category[in]=${product.category._id}`}
                        className="hover:text-primary hover:underline transition-colors"
                    >
                        {product.category.name}
                    </Link>
                </p>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-primary">
                        {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {formatNumberWithSuffix(product.sold)} sold
                    </span>
                </div>

                {/* Add to Cart Button */}
                <Button className="w-full" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}
