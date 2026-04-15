import { useEffect, useState } from 'react';

export function useDroneAnimation() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/animations/drone.json')
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

  return animationData;
}
