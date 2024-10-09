import { CardFooter } from "@/components/ui/card";
import FloatingCheckoutIndicator from "./components/FloatingCheckoutIndicator";
import MovieList from "./components/MovieList";

export default function Home() {
  return (
        <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <MovieList />
          <FloatingCheckoutIndicator />
        </div>
  );
}
