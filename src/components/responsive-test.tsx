import { useState, useEffect } from 'react';

export default function ResponsiveTest() {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  
  const [deviceType, setDeviceType] = useState('');
  
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    if (screenSize.width < 640) {
      setDeviceType('Mobile');
    } else if (screenSize.width < 768) {
      setDeviceType('Small Tablet');
    } else if (screenSize.width < 1024) {
      setDeviceType('Tablet');
    } else if (screenSize.width < 1280) {
      setDeviceType('Laptop');
    } else {
      setDeviceType('Desktop');
    }
  }, [screenSize]);
  
  return (
    <div className="fixed bottom-4 right-4 bg-crypto-blue-dark p-3 rounded-lg border border-crypto-cyan/30 text-sm z-50 opacity-80 hover:opacity-100 transition-opacity">
      <div className="text-crypto-cyan font-medium">Responsive Test</div>
      <div className="text-crypto-gray-light">
        <div>Width: {screenSize.width}px</div>
        <div>Height: {screenSize.height}px</div>
        <div>Device: {deviceType}</div>
      </div>
    </div>
  );
}
