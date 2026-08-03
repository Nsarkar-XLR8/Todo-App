import { useEffect } from 'react';

export function useKeyboard(keyCombo, callback, deps = []) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      const keyMatches = event.key.toLowerCase() === keyCombo.key.toLowerCase();
      const ctrlMatches = keyCombo.ctrl ? isCtrlOrCmd : true;
      const altMatches = keyCombo.alt ? event.altKey : true;
      const shiftMatches = keyCombo.shift ? event.shiftKey : true;

      if (keyMatches && ctrlMatches && altMatches && shiftMatches) {
        if (keyCombo.preventDefault !== false) {
          event.preventDefault();
        }
        callback(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyCombo, callback, ...deps]);
}
