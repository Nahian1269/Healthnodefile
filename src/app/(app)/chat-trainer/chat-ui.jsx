'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../../../components/ui/button';
import { Form, FormControl, FormField, FormItem } from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { getChatbotResponse } from './actions';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Bot, Loader2, Send, User } from 'lucide-react';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { cn } from '../../../lib/utils';
import { trainers } from '../../../lib/data';
import { PlaceHolderImages } from '../../../lib/placeholder-images';

const formSchema = z.object({
  prompt: z.string().min(1, 'Message cannot be empty.'),
});

export function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  async function onSubmit(values) {
    setMessages((prev) => [...prev, { role: 'user', content: values.prompt }]);
    setLoading(true);
    form.reset();

    // In a real app, you'd have a separate flow for trainer chat.
    // For now, we'll reuse the AI coach for demonstration.
    const response = await getChatbotResponse({ prompt: values.prompt });
    
    if (response.success && response.data) {
      setMessages((prev) => [...prev, { role: 'assistant', content: response.data.advice, isTrainer: true }]);
    } else {
      setMessages((prev) => [...prev, { role: 'assistant', content: response.error || 'Sorry, I encountered an error.', isTrainer: true }]);
    }
    setLoading(false);
  }
  
  // For demonstration, we'll use the first trainer.
  const trainer = trainers[1];
  const trainerImage = PlaceHolderImages.find(img => img.id === trainer.imageId);


  return (
    <div className="flex flex-col h-full p-4 md:p-8">
      <ScrollArea className="flex-1 mb-4 pr-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-4',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                 <Avatar className="h-8 w-8">
                    {trainerImage && <AvatarImage src={trainerImage.imageUrl} alt={trainer.name} />}
                    <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-md rounded-lg p-3 text-sm',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-card-foreground border'
                )}
              >
                {message.content}
              </div>
              {message.role === 'user' && (
                 <Avatar className="h-8 w-8 bg-muted text-muted-foreground">
                  <AvatarFallback><User size={18}/></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
           {loading && (
            <div className="flex items-start gap-4 justify-start">
              <Avatar className="h-8 w-8">
                  {trainerImage && <AvatarImage src={trainerImage.imageUrl} alt={trainer.name} />}
                  <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="max-w-md rounded-lg p-3 text-sm bg-card text-card-foreground border">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="mt-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Type your message to the trainer..." {...field} autoComplete="off" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} size="icon" className="bg-accent text-accent-foreground hover:bg-accent/90 flex-shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
