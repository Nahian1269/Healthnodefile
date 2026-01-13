'use client';

import { useState } from 'react';
import { exercises } from '../../../lib/data';
import { Input } from '../../../components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../components/ui/accordion';
import Image from 'next/image';
import { PlaceHolderImages } from '../../../lib/placeholder-images';
import { Badge } from '../../../components/ui/badge';
import { Search } from 'lucide-react';

export default function ExerciseList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search exercises by name or muscle group..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Accordion type="single" collapsible className="w-full">
        {filteredExercises.map((exercise) => {
          const image = PlaceHolderImages.find((img) => img.id === exercise.imageId);
          return (
            <AccordionItem value={exercise.id} key={exercise.id}>
              <AccordionTrigger className="text-lg hover:no-underline">
                {exercise.name}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid md:grid-cols-3 gap-4 p-2">
                  <div className="md:col-span-2 space-y-3">
                    <p className="text-muted-foreground">{exercise.description}</p>
                    <div className='flex gap-2'>
                        {exercise.muscleGroup.split(',').map(group => (
                            <Badge key={group.trim()} variant="secondary">{group.trim()}</Badge>
                        ))}
                    </div>
                  </div>
                  {image && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                      <Image
                        src={image.imageUrl}
                        alt={exercise.name}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      {filteredExercises.length === 0 && (
        <div className="text-center text-muted-foreground mt-8">
          <p>No exercises found for "{searchTerm}".</p>
        </div>
      )}
    </div>
  );
}
