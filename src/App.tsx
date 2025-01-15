import React, { useState, useEffect } from 'react';
import { Waves, Wind, Leaf, Sun, Moon, TreePine, CloudRain, Thermometer, Mountain, Cloud, Flame, Stars, Droplets, Flower2 } from 'lucide-react';
import { format } from 'date-fns';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  name: string;
}

function App() {
  const [activeElement, setActiveElement] = useState<string>('forest');
  const [isDaytime, setIsDaytime] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=London&appid=05b100a12654fa32ca2956c0d7313b9c&units=metric`
        );
        if (!response.ok) {
          throw new Error('Weather data not available');
        }
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const elements = {
    forest: {
      title: "Ancient Forest",
      description: "Where shadows dance with filtered sunlight, creating a symphony of greens and golds. Each tree holds centuries of wisdom in its rings, whispering tales of time immemorial.",
      image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80",
      icon: <TreePine className="w-8 h-8" />,
    },
    mountain: {
      title: "Majestic Peaks",
      description: "Standing as ancient sentinels of the earth, mountains bridge the gap between ground and sky. Their snow-capped summits remind us of nature's enduring grandeur.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
      icon: <Mountain className="w-8 h-8" />,
    },
    ocean: {
      title: "Tidal Rhythms",
      description: "The eternal dance of waves, where chaos meets perfect harmony. In its depths lie mysteries as old as time, while its surface reflects the ever-changing sky.",
      image: "https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&q=80",
      icon: <Waves className="w-8 h-8" />,
    },
    wind: {
      title: "Whispers of Wind",
      description: "Invisible forces shaping the visible world, a testament to nature's subtle power. The wind carries stories from distant lands, sculpting landscapes with its timeless touch.",
      image: "https://images.unsplash.com/photo-1495571758719-6ec1e876d6ae?auto=format&fit=crop&q=80",
      icon: <Wind className="w-8 h-8" />,
    },
    growth: {
      title: "Seeds of Change",
      description: "Life emerging from darkness, reaching towards the light. In every seed lies the potential for transformation, a reminder that growth is nature's greatest miracle.",
      image: "https://images.unsplash.com/photo-1457530378978-8bac673b8062?auto=format&fit=crop&q=80",
      icon: <Leaf className="w-8 h-8" />,
    },
    storm: {
      title: "Thunder's Dance",
      description: "Nature's raw power unleashed in a spectacular display of light and sound. Storms remind us of the delicate balance between chaos and creation.",
      image: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&q=80",
      icon: <Cloud className="w-8 h-8" />,
    },
    fire: {
      title: "Primal Flame",
      description: "The eternal dance of destruction and renewal, fire transforms and purifies. Its warmth nurtures life while its power commands respect.",
      image: "https://images.unsplash.com/photo-1518017804476-016cb449c917?auto=format&fit=crop&q=80",
      icon: <Flame className="w-8 h-8" />,
    },
    night: {
      title: "Celestial Symphony",
      description: "Under the vast canvas of stars, we glimpse our place in the cosmic dance. The night sky tells ancient stories written in starlight.",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80",
      icon: <Stars className="w-8 h-8" />,
    },
    rain: {
      title: "Life's Tears",
      description: "Each droplet carries the essence of life, connecting sky to earth in an endless cycle. Rain transforms landscapes and cleanses the world anew.",
      image: "https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&q=80",
      icon: <Droplets className="w-8 h-8" />,
    },
    meadow: {
      title: "Flowering Dreams",
      description: "A tapestry of colors and fragrances where countless species dance in harmony. Meadows showcase nature's artistry in its most delicate form.",
      image: "https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?auto=format&fit=crop&q=80",
      icon: <Flower2 className="w-8 h-8" />,
    },
  };

  const renderWeatherInfo = () => {
    if (loading) return <p>Loading weather data...</p>;
    if (error) return <p>Weather data unavailable</p>;
    if (!weatherData) return null;

    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Thermometer className="w-5 h-5 mr-1" />
          <span>{Math.round(weatherData.main.temp)}°C</span>
        </div>
        <div className="flex items-center">
          <CloudRain className="w-5 h-5 mr-1" />
          <span>{weatherData.main.humidity}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${
      isDaytime ? 'bg-gradient-to-br from-blue-50 to-green-50' : 'bg-gradient-to-br from-blue-900 to-purple-900'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className={`mb-4 flex justify-center items-center space-x-4 ${isDaytime ? 'text-gray-800' : 'text-white'}`}>
            <span className="text-lg">{format(currentTime, 'PPpp')}</span>
            {renderWeatherInfo()}
          </div>
          <h1 className={`text-4xl font-bold mb-4 ${isDaytime ? 'text-gray-800' : 'text-white'}`}>
            Echoes of Nature: The Art of Harmony
          </h1>
          <button
            onClick={() => setIsDaytime(!isDaytime)}
            className="p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-colors duration-300"
          >
            {isDaytime ? (
              <Sun className="w-8 h-8 text-yellow-500" />
            ) : (
              <Moon className="w-8 h-8 text-yellow-200" />
            )}
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="relative h-[600px] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <img
              src={elements[activeElement as keyof typeof elements].image}
              alt={elements[activeElement as keyof typeof elements].title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
              <div className="absolute bottom-0 p-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {elements[activeElement as keyof typeof elements].title}
                </h2>
                <p className="text-gray-200">
                  {elements[activeElement as keyof typeof elements].description}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${
              isDaytime ? 'bg-white shadow-lg' : 'bg-gray-800'
            }`}>
              <h3 className={`text-xl font-semibold mb-4 ${
                isDaytime ? 'text-gray-800' : 'text-white'
              }`}>
                Elements of Nature
              </h3>
              <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                {Object.entries(elements).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setActiveElement(key)}
                    className={`p-4 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                      activeElement === key
                        ? (isDaytime ? 'bg-green-100 text-green-700' : 'bg-green-900 text-green-100')
                        : (isDaytime ? 'hover:bg-gray-100' : 'hover:bg-gray-700')
                    } ${isDaytime ? 'text-gray-700' : 'text-gray-300'}`}
                  >
                    {value.icon}
                    <span>{value.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-xl ${
              isDaytime ? 'bg-white shadow-lg' : 'bg-gray-800'
            }`}>
              <h3 className={`text-xl font-semibold mb-4 ${
                isDaytime ? 'text-gray-800' : 'text-white'
              }`}>
                Artist's Statement
              </h3>
              <p className={`leading-relaxed ${
                isDaytime ? 'text-gray-600' : 'text-gray-300'
              }`}>
                This digital interpretation explores the delicate balance between chaos and order in nature. 
                Through dynamic transitions and carefully chosen imagery, it invites viewers to contemplate 
                their connection with the natural world. The interplay of light and dark represents the 
                constant cycle of renewal and change, while the interactive elements encourage active 
                engagement with different aspects of nature's harmony.
              </p>
            </div>
          </div>
        </div>

        <footer className={`text-center ${isDaytime ? 'text-gray-600' : 'text-gray-400'}`}>
          <p className="text-sm">
            Experience the beauty of nature through digital art. Toggle between day and night to see different perspectives.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;