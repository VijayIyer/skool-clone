import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'

import NewPostInput from "@/components/NewPostInput/index";

describe("New post component should render", () => {
    test("It should show avatar", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        expect(avatarElement).toBeInTheDocument();

    })
    test("It should show a text 'Write something'", () => {
        render(<NewPostInput/>)
        const textElement = screen.getByText('Write something');
        expect(textElement).toBeInTheDocument();
    })
    test("It should be replaced with a form after user click the component", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const newPostOnEditing = screen.getByTestId('new-post-input-onEditing');
        expect(newPostOnEditing).toBeInTheDocument();
    })
});

describe("Form component should render", () => {
    test("It should show avatar", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const newPostCardHeader = screen.getByTestId('new-post-card-header');
        expect(newPostCardHeader).toBeInTheDocument();
    })
    test("It should have two input, one for title, one for content", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const textElement = screen.getByPlaceholderText('Title')
        expect(textElement).toBeInTheDocument();
    })
    test("It should have a tool list component", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const newPostToolsElement = screen.getByTestId('new-post-tools-container');
        expect(newPostToolsElement).toBeInTheDocument();
    })
    test("It should have a button group includes two buttons, Cancel button and Post button", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const cancelButtonElement = screen.getByText('CANCEL');
        const postButtonElement = screen.getByText('POST');
        expect(cancelButtonElement).toBeInTheDocument();
        expect(postButtonElement).toBeInTheDocument();
    })
})