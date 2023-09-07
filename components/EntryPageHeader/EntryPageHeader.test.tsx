import EntryPageHeader from "@/components/EntryPageHeader";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Testing Component EntryPageHeader", () => {
    test("should render logo and navbar", () => {
        render(<EntryPageHeader />);
        expect(screen.getByTestId("logo")).toBeInTheDocument();
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
    });
    test("should render nav button link to page", () => {
        render(<EntryPageHeader />);
        expect(screen.getByTestId("link-use-cases")).toBeInTheDocument();
        expect(screen.getByTestId("link-signup")).toBeInTheDocument();
        expect(screen.getByTestId("link-login")).toBeInTheDocument();
    });
    test("should nav button link to correct path", () => {
        render(<EntryPageHeader />);
        const linkUseCases = screen.getByRole('link', { name: 'Use cases' });
        expect(linkUseCases).toHaveAttribute('href', '/use-cases');
        const linkSignUp = screen.getByRole('link', { name: 'Sign up' });
        expect(linkSignUp).toHaveAttribute('href', '/signup');
        const linkLogIn = screen.getByRole('link', { name: 'Log in' });
        expect(linkLogIn).toHaveAttribute('href', '/login');
    });
});