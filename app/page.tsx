import { GameCanvas } from "./components/GameCanvas";
import { GameControls } from './components/GameControls';

export default function Home() {
  return (
    <main className="relative">
      <GameCanvas />
      <GameControls />
    </main>
  );
}