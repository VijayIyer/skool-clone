import Header from "@/components/Header/Header";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Testing Component Footer", () => {
    test("should render footer link button", () => {
        render(<Header />);
        expect(screen.getAllByTestId("footer-item")).toHaveLength(7);
    });
});