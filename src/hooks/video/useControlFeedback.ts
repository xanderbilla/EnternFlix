import { useState, useCallback } from "react";
import { VIDEO_CONTROLS } from "@/constants/video";

export function useControlFeedback() {
  const [activeControl, setActiveControl] = useState<string | null>(null);

  const triggerFeedback = useCallback((controlName: string) => {
    setActiveControl(controlName);
    setTimeout(() => {
      setActiveControl(null);
    }, VIDEO_CONTROLS.CONTROL_FEEDBACK_DURATION);
  }, []);

  return {
    activeControl,
    triggerFeedback,
  };
}
