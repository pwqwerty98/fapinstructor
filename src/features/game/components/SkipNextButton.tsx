import { useCallback } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import SkipNextIcon from "@material-ui/icons/SkipNext";

import useWindowEvent from "@/hooks/useWindowEvent";
import { MediaService } from "@/game/xstate/services";

export function SkipNextButton() {
  const handleKeydown = useCallback((event: KeyboardEvent) => {
    if (event.key === "ArrowRight" && !event.repeat) {
      MediaService.nextLink();
    }
  }, []);
  useWindowEvent("keydown", handleKeydown);

  return (
    <Tooltip title="Next Image [Right Arrow]" placement="bottom">
      <IconButton
        color="inherit"
        onClick={() => {
          MediaService.nextLink();
        }}
      >
        <SkipNextIcon />
      </IconButton>
    </Tooltip>
  );
}
