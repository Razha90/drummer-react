import Drummer from './drummer'
import { useEffect, useState} from 'react'
import './App.css'

const music: { text: string; url: string }[] = [
  { text: 'Q', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { text: 'W', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { text: 'E', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { text: 'A', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { text: 'S', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { text: 'D', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { text: 'Z', url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { text: 'X', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { text: 'C', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
];

function App() {
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const matchedMusic = music.find((m) => m.text.toLowerCase() === key);

      if (matchedMusic) {
        playMusic(matchedMusic.url);
        setIsPlaying(matchedMusic.text);
        
      }
    };

    const playMusic = (url: string) => {
      const audio = new Audio(url);
      audio.volume = volume;
      audio.play();
      audio.addEventListener('ended', () => {
        setIsPlaying("");
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [volume]);

    
    const volumeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVol = parseFloat(e.target.value)
      setVolume(newVol);
    }

  return (
    <div id='wrapper'>
      <h1>Drummer Machine</h1>
      <div id='drummer'>
      {
        music.map((item, index) => (
          <Drummer key={index} text={item.text} url={item.url} vol={volume} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        ))
      }
      </div>
      <div>
        <input type="range" onChange={volumeHandler} value={volume} min={0} max={1} step={0.1}/>
      </div>
    </div>
  )
}

export default App
