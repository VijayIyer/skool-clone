import UseCases from "@/pages/use-cases";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Testing Entry Page", () => {
    test("should render correct page layout", () => {
        render(<UseCases />);
        expect(screen.getByTestId("header")).toBeInTheDocument();
        expect(screen.getByTestId("content")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });
});