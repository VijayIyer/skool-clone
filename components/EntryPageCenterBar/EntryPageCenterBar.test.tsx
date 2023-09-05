import EntryPageCenterBar from "@/components/EntryPageCenterBar";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Testing Component EntryPageCenterBar", () => {
    test("should nav button link to correct path", () => {
        render(<EntryPageCenterBar />);
        const linkSignUp = screen.getByRole('link', { name: 'Create Your Community' });
        expect(linkSignUp).toHaveAttribute('href', '/signup');
        const linkCommunity = screen.getByRole('link', { name: 'See it in Action' });
        expect(linkCommunity).toHaveAttribute('href', '/community');
    });
});