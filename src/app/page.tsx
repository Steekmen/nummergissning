import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to the Guess the Number game!</h1>
      <p>
        Head over to the game page to try your luck:
        <Link href='/guess-game'>
          <button style={{ marginLeft: '10px', padding: '10px 20px', cursor: 'pointer' }}>
            Play
          </button>
        </Link>
      </p>
    </div>
  );
}
