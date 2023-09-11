import {act, fireEvent, prettyDOM, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import NewPostInput from "@/components/NewPost/NewPostInput";
import {wait} from "next/dist/build/output/log";

describe('New post component should render', function () {
    test("It should have add attachment IconButtons", () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const addAttachmentIconButton = screen.getByTestId('add-attachment-icon-button');
        fireEvent.mouseOver(addAttachmentIconButton)
        const tooltip = screen.getByLabelText('Add attachment')
        expect(tooltip).toBeInTheDocument();
        const cancelBtn = screen.getByTestId('cancel-button');
        fireEvent.click(cancelBtn);
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
})

describe("Post button should be functional", () => {
    test("should allow user post content", async () => {
        const {container} = render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const addVideoIconButton = screen.getByTestId('add-video-icon-button');
        act(() => {
            addVideoIconButton.click();
        })
        const addVideoInput = container.querySelector('.MuiOutlinedInput-input');
        // @ts-ignore
        fireEvent.change(addVideoInput, {target: {value: 'https://www.youtube.com/watch?v=WCCovrKvAtU&ab_channel=rainbeary'}});
        // @ts-ignore
        expect(addVideoInput.value).toBe('https://www.youtube.com/watch?v=WCCovrKvAtU&ab_channel=rainbeary');
        const linkBtn = screen.getByTestId('pop-up-container-link-button');
        fireEvent.click(linkBtn);

        const addAttachmentIconButton = screen.getByTestId('add-attachment-icon-button');
        fireEvent.click(addAttachmentIconButton);
        const fileInput = screen.getByTestId('file-input');
        const file = new File(['file content'], 'example.jpg', { type: 'image/jpeg' })
        fireEvent.change(fileInput, { target: { files: [file] } });

        let addGifIconButton = screen.getByTestId('add-gif-icon-button');
        fireEvent.click(addGifIconButton);
        const addGifContainer = screen.getByTestId('gif-loading-container');
        expect(addGifContainer).toBeInTheDocument();
        await waitFor(() => {
            const gifImageContainer = screen.getByTestId("gif-image-container");
            expect(gifImageContainer).toBeInTheDocument();
            const newGifElements = gifImageContainer.querySelectorAll('.gifContainer');
            expect(newGifElements.length).toBeLessThanOrEqual(10)
        })
        const firstImgElement = screen.getByTestId('gif-images').querySelector('img');
        // @ts-ignore
        fireEvent.click(firstImgElement);

        const pollIconBtn = screen.getByTestId('add-poll-icon-button');
        fireEvent.click(pollIconBtn);
        const inputElement = screen.getByPlaceholderText('Option 1');
        fireEvent.change(inputElement, {target: {value: 'Test 1'}})
        const titleInput = screen.getByPlaceholderText('Title');
        fireEvent.change(titleInput, {target: {value: 'Test 1'}})
        const select = screen.getByTestId('select-category');
        fireEvent.mouseDown(select);
        const categoryOption = screen.getByTestId('category-option')
        expect(categoryOption).toBeInTheDocument();
        fireEvent.click(categoryOption)
        const postBtn = screen.getByTestId('post-button');
        fireEvent.click(postBtn);
        const postDefault = screen.getByTestId('post-default');
        expect(postDefault).toBeInTheDocument();
    })
})