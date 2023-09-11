import { Stack, Link } from "@mui/material";

const footerItems = [
  {
    title: "help@skool.com",
    url: "mailto:help@skool.com",
    target: "_self",
  },
  {
    title: "Pricing",
    url: "/pricing",
    target: "_self",
  },
  {
    title: "Merch",
    url: "https://skoolmerch.com/",
    target: "_blank",
  },
  {
    title: "Affiliates",
    url: "/affiliate-program",
    target: "_self",
  },
  {
    title: "Careers",
    url: "/careers",
    target: "_self",
  },
  {
    title: "Privacy",
    url: "/legal",
    target: "_self",
  },
  {
    title: "Community",
    url: "/community",
    target: "_blank",
  },
];

export default function EntryPageFooter() {
  return (
    <Stack data-testid="footer" direction="row" spacing={2}>
      {footerItems.map((item) => {
        return (
          <Link
            key={item.url}
            color="rgb(144, 144, 144)"
            underline="hover"
            href={item.url}
            target={item.target}
          >
            {item.title}
          </Link>
        );
      })}
    </Stack>
  );
}
