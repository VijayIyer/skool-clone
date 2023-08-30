import Header from "@/components/Header/Header";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Testing Component Header", () => {
    test("should render logo and navbar", () => {
        render(<Header />);
        expect(screen.getByTestId("logo")).toBeInTheDocument();
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
    });
    test("should render nav button link to page", () => {
        render(<Header />);
        expect(screen.getByTestId("link-use-cases")).toBeInTheDocument();
        expect(screen.getByTestId("link-signup")).toBeInTheDocument();
        expect(screen.getByTestId("link-login")).toBeInTheDocument();
    })
});