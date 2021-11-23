import { Paper, Box, Typography } from "@material-ui/core";

import { ProfileIcon } from "@/components/Icons";

export function ProfileCard() {
  return (
    <Box component={Paper} display="flex" p={2} alignItems="center">
      <ProfileIcon/>
      <Box ml={2}>
        <Typography>{"tests"}</Typography>
      </Box>
    </Box>
  );
}
