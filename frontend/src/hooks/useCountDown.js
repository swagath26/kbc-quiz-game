import { useState, useEffect } from 'react';

const useCountDown = (start = 5) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (count <= 0) return;

    const timer = setInterval(() => {
      setCount(prevCount => prevCount - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [count]);

  return count;
};

export default useCountDown;