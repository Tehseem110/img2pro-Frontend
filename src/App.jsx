import { useState, useEffect } from 'react';
import Nav from './Component/Nav';
import { Route, Routes } from 'react-router-dom';
import ImageConvertorPage from './pages/ImageConvertor/ImageConvertorPage';
import Loading from './Component/Loading';
import backgroundImagedark from './assets/Group.svg';
import backgroundImagelight from './assets/light.svg';

function App() {
  const [theme, setThemes] = useState('light');
  const [click, setClick] = useState(false);

  // useEffect(() => {
  //   if (true) {
  //     setThemes('light');
  //   } else {
  //     setThemes('dark');
  //   }
  // }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleMode = () => {
    setThemes(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <div
        className={`w-full h-screen overflow-x-hidden `}
        style={{
          backgroundImage: `url(${
            theme === 'dark' ? backgroundImagelight : backgroundImagedark
          })`,
          backgroundSize: 'cover', // Adjust as needed
          backgroundPosition: 'center', // Adjust as needed
        }}
      >
        <Loading />
        <Nav handleMode={handleMode} theme={theme} setClick={setClick} />
        <Routes>
          <Route
            path="/"
            element={<ImageConvertorPage theme={theme} click={click} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
