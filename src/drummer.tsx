
interface DrummerProps {
    text: string,
    url: string,
    vol: number,
    isPlaying: string,
    setIsPlaying: React.Dispatch<React.SetStateAction<string>>
}

function Drummer({ text, url, vol, isPlaying, setIsPlaying }: DrummerProps) {
    const audio = new Audio(url)
    audio.volume = vol

    const playAudio = () => {
        audio.play()
        setIsPlaying(text)

        audio.addEventListener('ended', () => {
            setIsPlaying("")
        })
    }

    return (
        <>
            <button className={isPlaying == text ? 'active' : ''} onClick={playAudio}>{text}</button>
        </>
    )
}

export default Drummer 