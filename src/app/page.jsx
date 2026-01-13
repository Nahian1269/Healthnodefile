import { Button } from '../components/ui/button';
import { PlaceHolderImages } from '../lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '../components/logo';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <div className="flex min-h-screen flex-col">
      <header className="absolute inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />
        <Button asChild variant="ghost">
          <Link href="/login">Login</Link>
        </Button>
      </header>
      <main className="flex-1">
        <section className="relative flex h-screen w-full items-center justify-center">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 mx-4 max-w-3xl text-center text-white">
            <h1 className="font-headline text-5xl font-bold tracking-tight md:text-7xl">
              Welcome to HealthNode
            </h1>
            <p className="mt-6 text-lg leading-8 md:text-xl">
              Your all-in-one AI-powered companion for personalized health, fitness, and nutrition.
              We are the best because we offer personalized plans, AI coaching, and a supportive community to help you achieve your wellness goals.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
