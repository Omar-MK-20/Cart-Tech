"use client";
import { getInitials } from '@/helpers/initials';
import { BrandI, CategoryI } from '@/interfaces';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardHeader } from '../ui/card';

function CardComponent({ item, name }: { item: CategoryI | BrandI, name: string; })
{
    const router = useRouter();

    const navigationConfig = {
        Categories: `?category[in]=${item._id}`,
        Brands: `?brand=${item._id}`,
    };

    function handleNavigate()
    {
        const queryString = navigationConfig[name as keyof typeof navigationConfig];
        if (queryString)
        {
            router.push(`/products${queryString}`);
        }
    }
    return (
        <Card
            className="w-full max-w-sm cursor-pointer transition-all hover:shadow-md"
            onClick={handleNavigate}
        >
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage
                        src={item.image}
                        alt={item.name}
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                        {getInitials(item.name)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">@{item.slug}</p>
                </div>
            </CardHeader>
        </Card>
    );
}

export default CardComponent;