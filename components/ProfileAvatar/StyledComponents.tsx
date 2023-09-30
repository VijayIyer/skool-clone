import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import CancelIcon from "@mui/icons-material/Cancel";

export const flexCenterStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#4357ad",
    color: "#ffffff",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    width: "48px",
    height: "48px",
    borderRadius: "50%",
  },
}));

export const GrayCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const BlueTextTypography = styled(Typography)({
  color: "rgb(67, 87, 173)",
});

export const GrayTextTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const StyledEditButton = styled(Button)({
  width: "100%",
  height: "46px",
  border: "1px solid rgb(228, 228, 228)",
  color: "rgb(144, 144, 144)",
  "&:hover": { color: "black" },
});

export const CancelButtonIcon = styled(CancelIcon)({
  color: "white",
  fontSize: "50px",
  "&:hover": { color: "black" },
});

export const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "454px",
  bgcolor: "background.paper",
  border: "1px solid rgb(228, 228, 228)",
  borderRadius: "10px",
  color: "rgb(32,33,36)",
  p: 4,
  lineHeight: 1.5,
};

export const ModalHeader = styled(Typography)({
  fontWeight: "bold",
  fontSize: "23px",
  margin: "0 0 16px 0",
});

export const ModalSubHeader = styled(Typography)({
  fontWeight: "bold",
  fontSize: "16px",
  margin: "0 0 4px 0",
});

export const ModalParagraph = styled(Typography)({
  margin: "0 0 16px 0",
});

export const StackItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const CustomTypography = styled(Typography)({
  color: "#202124",
  fontSize: "18px",
  fontWeight: "500",
});

export const PaperContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
}));
