import { ChatUI } from './chat-ui';

export default function ChatbotPage() {
  return (
    <div className="h-full flex flex-col">
       <div className="p-4 md:p-8 pb-0">
          <h1 className="font-headline text-3xl font-bold text-foreground md:text-4xl mb-2">
            AI Health Coach
          </h1>
          <p className="text-muted-foreground">
            Ask me anything about health, fitness, or nutrition.
          </p>
       </div>
      <ChatUI />
    </div>
  );
}
