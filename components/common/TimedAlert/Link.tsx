import { Link, LinkProps } from "@mui/material";
import { MouseEventHandler } from "react";
type CommonLinkProps = LinkProps & {
  onClick: any;
  text: String;
};

// Link which underline only on hover
export default function CommonLink({
  onClick,
  text,
  ...rest
}: CommonLinkProps) {
  return (
    <Link underline='hover' color={"secondary"} href='#' onClick={onClick}>
      {text}
    </Link>
  );
}
