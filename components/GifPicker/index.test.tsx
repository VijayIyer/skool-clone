import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import NewPostInput from "@/components/NewPostInput";
import {wait} from "next/dist/build/output/log";

describe("Gif picker should be functional", () => {
    test("should get gifs and search gifs", async () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const addGifIconButton = screen.getByTestId('add-gif-icon-button');
        fireEvent.click(addGifIconButton);
        const addGifContainer = screen.getByTestId('gif-loading-container');
        expect(addGifContainer).toBeInTheDocument();
        await waitFor(() => {
            const gifImageContainer = screen.getByTestId("gif-image-container");
            expect(gifImageContainer).toBeInTheDocument();
        })
        await waitFor(() => {
            const gifImageContainer = screen.getByTestId("gif-image-container");
            gifImageContainer.scrollTop = gifImageContainer.scrollHeight;
            fireEvent.scroll(gifImageContainer);
            wait(() => {
                const newGifElements = gifImageContainer.querySelectorAll('.gifContainer');
                expect(newGifElements.length).toBeGreaterThan(11);
            }, 1000)
        })
        const newGifData = screen.getByTestId('gif-images');
        expect(newGifData).toBeInTheDocument();

        const textInput = screen.getByTestId('gif-search-input')
        expect(textInput).toBeInTheDocument();
        const gifSearchInput = textInput.querySelector('input');
        // @ts-ignore
        fireEvent.change(gifSearchInput, {target: {value: 'happy'}});
        expect(gifSearchInput).toHaveValue('happy');
        await waitFor(() => {
            const gifImageContainer = screen.getByTestId("gif-image-container");
            const newGifElements = gifImageContainer.querySelectorAll('.gifContainer');
            wait(() => {
                expect(newGifElements.length).toBeLessThanOrEqual(10)
            }, 1000)

        })

        const deleteIcon = screen.getByTestId('CloseOutlinedIcon');
        expect(deleteIcon).toBeInTheDocument();
        fireEvent.click(deleteIcon)
        await waitFor(() => {
            const textInput = screen.getByTestId('gif-search-input')
            const gifSearchInput = textInput.querySelector('input');
            expect(gifSearchInput).toHaveValue("")
        })
    })

    test("should allow users to select gif", async () => {
        render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
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

        for (let i = 0; i < 5; i++) {
            addGifIconButton = screen.getByTestId('add-gif-icon-button');
            fireEvent.click(addGifIconButton);
            await waitFor(() => {
                const gifImageContainer = screen.getByTestId("gif-image-container");
                expect(gifImageContainer).toBeInTheDocument();
                const newGifElements = gifImageContainer.querySelectorAll('.gifContainer');
                expect(newGifElements.length).toBeLessThanOrEqual(10)
            })
        }

        const previewContainer = screen.getByTestId('file-upload-preview-container');
        expect(previewContainer).toBeInTheDocument();
        const preIconButton = screen.getByTestId('pre-icon-button');
        fireEvent.click(preIconButton)
        const nextIconButton = screen.getByTestId('next-icon-button');
        fireEvent.click(nextIconButton);

        const previewFullScreenBtn = screen.getByTestId('preview-full-screen-button');
        fireEvent.click(previewFullScreenBtn)
        const previewDeleteBtn = screen.getByTestId('preview-delete-button');
        fireEvent.click(previewDeleteBtn);
    })
})