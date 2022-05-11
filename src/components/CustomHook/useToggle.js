import { useState } from 'react';

const useToggle = () => {
  const [isToggleOn, setIsToggleOn] = useState(false);

  const toggleHandler = () => {
    setIsToggleOn(!isToggleOn);
  };
  return { isToggleOn, toggleHandler };
};

export default useToggle;
