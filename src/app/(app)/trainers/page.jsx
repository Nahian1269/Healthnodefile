import { trainers } from '../../../lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';
import { PlaceHolderImages } from '../../../lib/placeholder-images';
import Link from 'next/link';

export default function TrainersPage() {
    return (
        <div className="p-4 md:p-8">
            <h1 className="font-headline text-3xl font-bold text-foreground md:text-4xl mb-2">
                Find a Certified Trainer
            </h1>
            <p className="text-muted-foreground mb-8">
                Connect with professional trainers to guide you on your fitness journey.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {trainers.map((trainer) => {
                    const image = PlaceHolderImages.find(img => img.id === trainer.imageId);
                    return (
                        <Card key={trainer.id} className="flex flex-col">
                            <CardHeader className="items-center">
                                <Avatar className="h-24 w-24">
                                    {image && <AvatarImage src={image.imageUrl} alt={trainer.name} data-ai-hint={image.imageHint} />}
                                    <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </CardHeader>
                            <CardContent className="text-center flex-1">
                                <CardTitle className="text-xl font-headline">{trainer.name}</CardTitle>
                                <p className="text-sm text-primary font-semibold mt-1">{trainer.specialization}</p>
                                <p className="text-sm text-muted-foreground mt-4">{trainer.bio}</p>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                                  <Link href="/chat-trainer">Book Consultation</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
