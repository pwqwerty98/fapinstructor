import { Tab, TabProps, Tooltip } from "@material-ui/core";

export type AuthTabProps = TabProps;

export function AuthTab(props: TabProps) {

  return (
    <Tooltip
      title="Please login"
      disableFocusListener={false}
      disableHoverListener={false}
      disableTouchListener={false}
    >
      <span>
        <Tab disabled={false} {...props} />
      </span>
    </Tooltip>
  );
}
