import { products } from '../../../lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { PlaceHolderImages } from '../../../lib/placeholder-images';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

export default function StorePage() {
    return (
        <div className="p-4 md:p-8">
            <h1 className="font-headline text-3xl font-bold text-foreground md:text-4xl mb-2">
                Health & Fitness Store
            </h1>
            <p className="text-muted-foreground mb-8">
                Quality supplements and equipment to fuel your goals.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => {
                    const image = PlaceHolderImages.find(img => img.id === product.imageId);
                    return (
                        <Card key={product.id} className="flex flex-col overflow-hidden">
                            <CardHeader className="p-0">
                                <div className="relative aspect-square w-full">
                                    {image && (
                                        <Image
                                            src={image.imageUrl}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                            data-ai-hint={image.imageHint}
                                        />
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4 flex-1">
                                <CardTitle className="text-lg font-headline leading-snug">{product.name}</CardTitle>
                                <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                                <p className="text-lg font-semibold text-primary">
                                    ${product.price.toFixed(2)}
                                </p>
                                <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Add to Cart
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
