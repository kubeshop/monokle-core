import { useEffect, useState } from "react";

export const useKeyCombo = (
  keyCombo: string[],
  callback: (e: KeyboardEvent) => void,
  target: React.RefObject<HTMLElement>
) => {
  const [keysPressed, setKeysPressed] = useState<string[]>([]);
  const [codesPressed, setCodesPressed] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!keysPressed.includes(e.key)) {
        setKeysPressed([...keysPressed, e.key]);
        setCodesPressed([...codesPressed, e.code]);
      }

      if (
        keyCombo.every(
          key =>
            e.key === key ||
            e.code === key ||
            keysPressed.includes(key) ||
            codesPressed.includes(key)
        )
      ) {
        callback(e);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeysPressed(keysPressed.filter(key => key !== e.key));
      setCodesPressed(codesPressed.filter(key => key !== e.code));
    };

    target.current?.addEventListener('keydown', handleKeyDown);
    target.current?.addEventListener('keyup', handleKeyUp);

    return () => {
      target.current?.removeEventListener('keydown', handleKeyDown);
      target.current?.removeEventListener('keyup', handleKeyUp);
    };
  }, [keysPressed, setKeysPressed]);
};
