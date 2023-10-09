import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import CircleIcon from "@mui/icons-material/Circle";
import QueryBuilder from "@mui/icons-material/QueryBuilder";

interface StatusDisplayProps {
  isAccountOwner: boolean;
  activeTime: string;
}

export default function StatusDisplay({
  isAccountOwner,
  activeTime,
}: StatusDisplayProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      data-testid="status-display"
    >
      {isAccountOwner ? (
        <>
          <CircleIcon sx={{ color: "rgb(0, 158, 93)" }} />
          <Typography>Online now</Typography>
        </>
      ) : (
        <>
          <QueryBuilder sx={{ color: "rgb(0, 158, 93)" }} />
          <Typography>{activeTime}</Typography>
        </>
      )}
    </Stack>
  );
}
