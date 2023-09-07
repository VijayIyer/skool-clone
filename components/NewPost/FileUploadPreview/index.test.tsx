import {act, fireEvent, queryByTestId, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'

import NewPostInput from "@/components/NewPost/NewPostInput";

describe("File upload preview container should render", () => {
    test("it should not be rendered when no attachment is added", () => {
        const {queryByTestId} = render(<NewPostInput/>)
        const filePreviewContainer = queryByTestId('file-upload-preview-container');
        expect(filePreviewContainer).toBeNull();
    })

    test("it should be rendered when video link is added", () => {
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
        const previewContainer = screen.getByTestId('file-upload-preview-container')
        expect(previewContainer).toBeInTheDocument();
    })

    test("it should be able to handle error message and allow user to cancel the video link upload", () => {
        const {container} = render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const addVideoIconButton = screen.getByTestId('add-video-icon-button');
        act(() => {
            addVideoIconButton.click();
        })
        const addVideoInput = container.querySelector('.MuiOutlinedInput-input');
        // @ts-ignore
        fireEvent.change(addVideoInput, {target: {value: 'https://www.youtube.com'}});
        const linkBtn = screen.getByTestId('pop-up-container-link-button');
        fireEvent.click(linkBtn);
        const errMsg = container.querySelector('.addLinkErrorMessage');
        expect(errMsg).toBeInTheDocument();
        const cancelBtn = screen.getByTestId('pop-up-container-cancel-button');
        fireEvent.click(cancelBtn);
        const videoPopUp = screen.queryByText('Add Video');
        expect(videoPopUp).toBeNull();
    })
})

describe("It should allow users to upload images", () => {
    test("cover photo upload", async () => {
        const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });

        const {container} = render(<NewPostInput />)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const addAttachmentBtn = screen.getByTestId('add-attachment-icon-button');
        fireEvent.click(addAttachmentBtn);
        await waitFor(() => {
            const previewInputFile = screen.getByTestId('file-input');
            fireEvent.change(previewInputFile, {target: {files: [file]}})
        })
        const previewLoadingIcon = container.querySelector('.uploadProgressDiv')
        expect(previewLoadingIcon).toBeInTheDocument();
        const uploadItemDiv = container.querySelector('.uploadItemDiv');
        expect(uploadItemDiv).toBeInTheDocument();
        // @ts-ignore
        fireEvent.click(uploadItemDiv);
        await waitFor(() => {
            const previewInputFile = screen.getByTestId('preview-input-file');
            fireEvent.change(previewInputFile, {target: {files: [file]}})
        })
    })
})