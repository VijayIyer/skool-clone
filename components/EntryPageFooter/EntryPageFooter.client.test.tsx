import EntryPageFooter from "@/components/EntryPageFooter";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const footerItems = [{
    title: "help@skool.com",
    url: "mailto:help@skool.com",
    target: "_self"
},
{
    title: "Pricing",
    url: "/pricing",
    target: "_self"
},
{
    title: "Merch",
    url: "https://skoolmerch.com/",
    target: "_blank"
},
{
    title: "Affiliates",
    url: "/affiliate-program",
    target: "_self"
},
{
    title: "Careers",
    url: "/careers",
    target: "_self"
},
{
    title: "Privacy",
    url: "/legal",
    target: "_self"
},
{
    title: "Community",
    url: "/community",
    target: "_blank"
},]

describe("Testing Component EntryPageFooter", () => {
    test("should render footer link button", () => {
        render(<EntryPageFooter />);
        const links = screen.getAllByRole("link");
        expect(links).toHaveLength(footerItems.length);
        expect(links[0]).toHaveAttribute('href', footerItems[0].url);
        expect(links[1]).toHaveAttribute('href', footerItems[1].url);
        expect(links[2]).toHaveAttribute('href', footerItems[2].url);
        expect(links[3]).toHaveAttribute('href', footerItems[3].url);
        expect(links[4]).toHaveAttribute('href', footerItems[4].url);
        expect(links[5]).toHaveAttribute('href', footerItems[5].url);
        expect(links[6]).toHaveAttribute('href', footerItems[6].url);
    });
});