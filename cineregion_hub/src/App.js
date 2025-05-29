import React, { useState } from 'react';
import './App.css';

// --- Sample data for demonstration (This would come from API or DB in a real app) ---
const directorsData = {
  Tamil: [
    {
      name: 'Mani Ratnam',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Maniratnam68.jpg',
      filmography: [
        {
          title: 'Roja',
          poster: 'https://upload.wikimedia.org/wikipedia/en/5/5d/Roja_poster.jpg',
          streamingUrl: 'https://www.youtube.com/embed/FjD2QB3GkCM'
        },
        {
          title: 'Dil Se..',
          poster: 'https://upload.wikimedia.org/wikipedia/en/1/1e/Dil_Se_poster.jpg',
          streamingUrl: null
        },
      ]
    },
    {
      name: 'Shankar',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Shankar_director.jpg',
      filmography: [
        {
          title: 'Enthiran',
          poster: 'https://upload.wikimedia.org/wikipedia/en/1/17/Enthiran_film_poster.jpg',
          streamingUrl: null
        },
        {
          title: 'Sivaji',
          poster: 'https://upload.wikimedia.org/wikipedia/en/9/90/Sivaji_poster.jpg',
          streamingUrl: 'https://www.youtube.com/embed/VEpMj-tqixs'
        },
      ]
    },
  ],
  Hollywood: [
    {
      name: 'Christopher Nolan',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Christopher_Nolan_Cannes_2018.jpg',
      filmography: [
        {
          title: 'Inception',
          poster: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg',
          streamingUrl: null,
        },
        {
          title: 'Interstellar',
          poster: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg',
          streamingUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E'
        }
      ]
    },
    {
      name: 'Greta Gerwig',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Greta_Gerwig_2018.jpg',
      filmography: [
        {
          title: 'Little Women',
          poster: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Little_Women_2019_poster.png',
          streamingUrl: null
        },
        {
          title: 'Lady Bird',
          poster: 'https://upload.wikimedia.org/wikipedia/en/8/80/Lady_Bird_poster.png',
          streamingUrl: null
        },
      ]
    },
  ],
  'Other South Indian': [
    {
      name: 'Rajamouli',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/66/S._S._Rajamouli_Cropped_2015.jpg',
      filmography: [
        {
          title: 'Baahubali',
          poster: 'https://upload.wikimedia.org/wikipedia/en/4/47/Baahubali_Movie_Poster.jpg',
          streamingUrl: 'https://www.youtube.com/embed/sOEg_YZQsTI'
        },
        {
          title: 'Eega',
          poster: 'https://upload.wikimedia.org/wikipedia/en/c/cb/Eega_Poster.jpg',
          streamingUrl: null
        },
      ]
    },
    {
      name: 'Priyadarshan',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Priyadarshan_1.jpg',
      filmography: [
        {
          title: 'Kanchivaram',
          poster: 'https://upload.wikimedia.org/wikipedia/en/2/2d/Kanchivaram_poster.jpg',
          streamingUrl: null
        },
        {
          title: 'Hera Pheri',
          poster: 'https://upload.wikimedia.org/wikipedia/en/4/4f/Hera_Pheri_2000_film_poster.jpg',
          streamingUrl: null
        },
      ]
    }
  ]
};

// --------- Components ---------

// PUBLIC_INTERFACE
function SectionHeader({ title }) {
  /** Stylized section headers */
  return (
    <div style={{
      fontWeight: 600,
      fontSize: '1.5rem',
      color: 'var(--kavia-orange)',
      marginBottom: 12,
      marginTop: 32,
      letterSpacing: 1.5
    }}>{title}</div>
  );
}

// PUBLIC_INTERFACE
function DirectorCard({ director, selected, onClick }) {
  /** Card-like display for a director */
  return (
    <div
      onClick={onClick}
      className="director-card"
      style={{
        background: selected ? 'var(--kavia-orange)' : 'var(--kavia-dark)',
        color: selected ? '#222' : 'var(--text-color)',
        border: selected ? '2px solid var(--kavia-orange)' : '1px solid var(--border-color)',
        borderRadius: 12,
        cursor: 'pointer',
        padding: 16,
        margin: 8,
        minWidth: 180,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'background 0.2s, color 0.2s, border 0.2s',
        boxShadow: selected ? '0 2px 8px rgba(219,247,2,0.13)' : 'none'
      }}
    >
      <img src={director.image} alt={director.name}
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: 10,
          border: selected ? '2px solid #222' : '2px solid var(--kavia-orange)'
        }}
      />
      <span style={{ fontWeight: 500, fontSize: '1rem' }}>{director.name}</span>
    </div>
  );
}

// PUBLIC_INTERFACE
function MovieCard({ movie, onWatch }) {
  /** Card-like display for a movie in filmography */
  return (
    <div className="movie-card" style={{
      background: 'var(--secondary, #232343)',
      borderRadius: 12,
      padding: 14,
      display: 'flex',
      alignItems: 'center',
      marginBottom: 16,
      boxShadow: '0 2px 8px #10141a44',
      minWidth: 230
    }}>
      <img src={movie.poster}
        alt={movie.title}
        style={{
          width: 60,
          height: 88,
          borderRadius: 8,
          objectFit: 'cover',
          marginRight: 16,
          border: '2px solid var(--kavia-orange)'
        }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--kavia-orange)' }}>{movie.title}</div>
        <div style={{ marginTop: 10 }}>
          {
            movie.streamingUrl ?
              <button className="btn"
                onClick={onWatch}
                style={{ fontSize: '.98rem', padding: '4px 14px', marginTop: 4 }}
              >
                ▶ Watch
              </button>
              :
              <span style={{ color: 'var(--text-secondary)' }}>Streaming unavailable</span>
          }
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function FilmographyPanel({ director, onClose }) {
  /** Panel displaying all movies by selected director; allows streaming */
  const [watching, setWatching] = useState(null);

  return (
    <div className="filmography-panel" style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      zIndex: 900,
      background: 'rgba(15,17,28,0.92)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
    }}>
      <div style={{
        background: 'var(--secondary, #232343)',
        borderRadius: 16,
        minWidth: 340,
        minHeight: 350,
        padding: 32,
        boxShadow: '0 8px 40px rgba(0,0,0,0.47)',
        maxWidth: '94vw'
      }}>
        <button
          style={{
            position: 'absolute',
            right: 30,
            top: 16,
            background: 'transparent',
            border: 'none',
            color: 'var(--kavia-orange)',
            fontSize: '1.8rem',
            cursor: 'pointer'
          }}
          onClick={onClose}
          aria-label="close panel"
        >×</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18 }}>
          <img src={director.image} alt={director.name} style={{ width: 58, height: 58, borderRadius: '50%', border: '2px solid var(--kavia-orange)' }} />
          <span style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--kavia-orange)' }}>{director.name}</span>
        </div>
        <div style={{ maxHeight: 330, overflowY: 'auto', marginTop: 10 }}>
          {director.filmography.map((movie, idx) => (
            <MovieCard
              key={movie.title}
              movie={movie}
              onWatch={() => setWatching(idx)}
            />
          ))}
        </div>
        {
          watching !== null && director.filmography[watching].streamingUrl &&
          <div style={{
            marginTop: 20, textAlign: 'center'
          }}>
            <div style={{ fontWeight: 500, marginBottom: 7 }}>
              Now Playing: <span style={{ color: 'var(--kavia-orange)' }}>{director.filmography[watching].title}</span>
            </div>
            <div style={{ borderRadius: 12, overflow: 'hidden', display: 'inline-block', boxShadow: '0 4px 24px #191a2e77' }}>
              <iframe
                width="360"
                height="215"
                src={director.filmography[watching].streamingUrl}
                title={director.filmography[watching].title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen
                style={{ border: 'none', background: '#000' }}
              ></iframe>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function DirectorsSection({ region, directors, selectedDirector, onSelect }) {
  /** Section for a region: shows a list of directors for selection  */
  return (
    <section style={{ marginBottom: 32 }}>
      <SectionHeader title={region + ' Directors'} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
        {directors.map((director) =>
          <DirectorCard
            key={director.name}
            director={director}
            selected={selectedDirector && selectedDirector.name === director.name}
            onClick={() => onSelect(director)}
          />
        )}
      </div>
    </section>
  );
}

// ---------------- MAIN APP ----------------

function App() {
  /** Main container for Directors Mania - CineRegion Hub */
  // Selected holds info as { region, directorObj }
  const [selected, setSelected] = useState(null);

  // Handler to open filmography of a director
  function handleSelect(region, director) {
    setSelected({ region, director });
  }

  // Handler to close filmography panel
  function closeFilmography() {
    setSelected(null);
  }

  return (
    <div className="app" style={{ backgroundColor: '#1a1a2e', minHeight: '100vh' }}>
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo" style={{ color: 'var(--kavia-orange)' }}>
              <span className="logo-symbol" role="img" aria-label="camera">🎬</span>
              CineRegion Hub
            </div>
            <button className="btn" style={{ backgroundColor: '#dbf702', color: '#222' }}>
              Directors Mania
            </button>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="hero" style={{ paddingTop: 120, paddingBottom: 32 }}>
            <div className="subtitle">Directors Mania</div>
            <h1 className="title" style={{ color: '#dbf702', fontSize: '2.6rem', letterSpacing: 2, marginBottom: 6 }}>CineRegion Hub</h1>
            <div className="description" style={{ color: 'var(--text-secondary)', maxWidth: 700 }}>
              Discover celebrated film directors from <span style={{ color: "#dbf702" }}>Tamil</span>, <span style={{ color: "#dbf702" }}>Hollywood</span>, and <span style={{ color: "#dbf702" }}>Other South Indian</span> regions. Select your favorite director, explore their movies, and watch available films — all in one place.
            </div>
          </div>

          {/* Directors by region */}
          {Object.keys(directorsData).map(region => (
            <DirectorsSection
              key={region}
              region={region}
              directors={directorsData[region]}
              selectedDirector={selected && selected.region === region ? selected.director : null}
              onSelect={director => handleSelect(region, director)}
            />
          ))}
        </div>
      </main>

      {/* Filmography Panel */}
      {selected &&
        <FilmographyPanel
          director={selected.director}
          onClose={closeFilmography}
        />
      }
    </div>
  );
}

export default App;
