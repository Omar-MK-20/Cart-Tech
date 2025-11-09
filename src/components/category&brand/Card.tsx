"use client"
import { getInitials } from '@/helpers/initials';
import { BrandI, CategoryI } from '@/interfaces';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardHeader } from '../ui/card';
import { useRouter } from 'next/navigation';

function CardComponent({ item, name }: { item: CategoryI | BrandI, name: string }) {
    const router = useRouter()

    function handleNavigate()
    {
        switch (name) {
            case "Categories":
                router.push(`/products?category[in]=${item._id}`)
                break;
        
            default:
                break;
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

export default CardComponent