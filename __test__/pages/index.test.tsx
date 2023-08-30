import Entry from "@/pages";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Testing Entry Page", () => {
    test("should render correct page layout", () => {
        render(<Entry />);
        expect(screen.getByTestId("header")).toBeInTheDocument();
        expect(screen.getByTestId("content")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
});