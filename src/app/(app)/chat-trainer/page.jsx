import { ChatUI } from './chat-ui';

export default function ChatTrainerPage() {
  return (
    <div className="h-full flex flex-col">
       <div className="p-4 md:p-8 pb-0">
          <h1 className="font-headline text-3xl font-bold text-foreground md:text-4xl mb-2">
            Chat with a Trainer
          </h1>
          <p className="text-muted-foreground">
            Get expert advice from our certified personal trainers.
          </p>
       </div>
      <ChatUI />
    </div>
  );
}
