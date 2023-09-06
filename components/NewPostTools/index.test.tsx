import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'

import NewPostInput from "@/components/NewPostInput/index";

describe('New post component should render', function () {
    test("It should have add attachment IconButtons", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const addAttachmentIconButton = screen.getByTestId('add-attachment-icon-button');
        fireEvent.mouseOver(addAttachmentIconButton)
        const tooltip = screen.getByLabelText('Add attachment')
        expect(tooltip).toBeInTheDocument();
    })

    test("It should have add link IconButtons", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const addLinkIconButton = screen.getByTestId('add-link-icon-button');
        fireEvent.mouseOver(addLinkIconButton)
        const tooltip = screen.getByLabelText('Add link')
        expect(tooltip).toBeInTheDocument();
    })

    test("It should have add video IconButtons", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const addVideoIconButton = screen.getByTestId('add-video-icon-button');
        fireEvent.mouseOver(addVideoIconButton)
        const tooltip = screen.getByLabelText('Add Video')
        expect(tooltip).toBeInTheDocument();
    })

    test("It should have add poll IconButtons", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const addPollIconButton = screen.getByTestId('add-poll-icon-button');
        fireEvent.mouseOver(addPollIconButton)
        const tooltip = screen.getByLabelText('Add Poll')
        expect(tooltip).toBeInTheDocument();
    })

    test("It should have add emoji IconButtons", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const addEmojiIconButton = screen.getByTestId('add-emoji-icon-button');
        fireEvent.mouseOver(addEmojiIconButton)
        const tooltip = screen.getByLabelText('Add emoji')
        expect(tooltip).toBeInTheDocument();
    })

    test("It should have add gif IconButtons", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const addGifIconButton = screen.getByTestId('add-gif-icon-button');
        fireEvent.mouseOver(addGifIconButton)
        const tooltip = screen.getByLabelText('Add gif')
        expect(tooltip).toBeInTheDocument();
    })

    test("It should have select component with two options", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const select = screen.getByTestId('select-category');
        expect(select).toHaveTextContent('Select a Category');
    })
});

describe("IconButtons should be functional", () => {
    test("should allow user upload files", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const addAttachmentIconButton = screen.getByTestId('add-attachment-icon-button');
        fireEvent.click(addAttachmentIconButton);
        const fileInput = screen.getByTestId('file-input');
        const file = new File(['file content'], 'example.jpg', { type: 'image/jpeg' })
        fireEvent.change(fileInput, { target: { files: [file] } });
        const previewContainer = screen.getByTestId('file-upload-preview-container')
        expect(previewContainer).toBeInTheDocument();
        const newAttachmentDiv = screen.getByTestId('new-attachment-div');
        expect(newAttachmentDiv).toBeInTheDocument();
        fireEvent.click(newAttachmentDiv);
    })

    test("should show link component", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const addLinkIconButton = screen.getByTestId('add-link-icon-button');
        fireEvent.click(addLinkIconButton);
        const addLinkContainer = screen.getByText('Add Link');
        expect(addLinkContainer).toBeInTheDocument();
    })

    test("should show video component", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const addVideoIconButton = screen.getByTestId('add-video-icon-button');
        fireEvent.click(addVideoIconButton);
        const addVideoContainer = screen.getByText('Add Video');
        expect(addVideoContainer).toBeInTheDocument()
    })

    test("should show poll component", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const addPollIconButton = screen.getByTestId('add-poll-icon-button');
        fireEvent.click(addPollIconButton);
        const addPollContainer = screen.getByText('Poll');
        expect(addPollContainer).toBeInTheDocument();
    })

    test("should show gif component", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const addGifIconButton = screen.getByTestId('add-gif-icon-button');
        fireEvent.click(addGifIconButton);
        const addGifContainer = screen.getByTestId('gif-container');
        expect(addGifContainer).toBeInTheDocument();
    })

    // test("should show emoji component", async () => {
    //     render(<NewPostInput />);
    //     const avatarElement = screen.getByAltText('Avatar');
    //     fireEvent.click(avatarElement);
    //     const addEmojiIconButton = screen.getByTestId('add-emoji-icon-button');
    //     fireEvent.click(addEmojiIconButton);
    //     const addEmojiContainer = screen.getByTestId('emoji-container');
    //     expect(addEmojiContainer).toBeInTheDocument();
    // })
})