import Entry from "@/pages";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const imgData = [
    {
        img: "https://assets.skool.com/skool/4a532a8d526a43faa120e4c42bb9463c.png",
        title: "Turn your passion"
    },
    {
        img: "https://assets.skool.com/skool/f7863e11e92a4ad796e44841e5c4371e.png",
        title: "Into a Community"
    },
    {
        img: "https://assets.skool.com/skool/d1f2c4971b6f440ab6f24823468e8607.png",
        title: "Learn Together"
    },
    {
        img: "https://assets.skool.com/skool/6f1bb511462644009de19e949b8b2c20.png",
        title: "Make Money"
    },
];

describe("Testing Entry Page", () => {
    test("should render correct page layout", () => {
        render(<Entry />);
        expect(screen.getByTestId("header")).toBeInTheDocument();
        expect(screen.getByTestId("content")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
    test("should render images on the page", () => {
        render(<Entry />);
        const images = screen.getAllByRole("img");
        expect(images).toHaveLength(4);
        expect(images[0]).toHaveAttribute('src', imgData[0].img);
        expect(images[1]).toHaveAttribute('src', imgData[1].img);
        expect(images[2]).toHaveAttribute('src', imgData[2].img);
        expect(images[3]).toHaveAttribute('src', imgData[3].img);
    });
});