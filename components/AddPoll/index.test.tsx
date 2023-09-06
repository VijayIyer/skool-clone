import {fireEvent, render, screen} from "@testing-library/react";
import NewPostInput from "@/components/NewPostInput";
import '@testing-library/jest-dom'

describe("Poll component should render", () => {
    test("should render the component", () => {
        const {container} = render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const pollIconBtn = screen.getByTestId('add-poll-icon-button');
        fireEvent.click(pollIconBtn);
        const pollContainer = container.querySelector('.pollContainer');
        expect(pollContainer).toBeInTheDocument();
        const cancelBtn = screen.getByTestId('poll-remove-btn')
        fireEvent.click(cancelBtn);
        const newPollContainer = screen.queryByText('Poll');
        expect(newPollContainer).toBeNull();
    })

    test("should add options", () => {
        const {container} = render(<NewPostInput/>)
        const avatarElement = screen.getByAltText('Avatar')
        fireEvent.click(avatarElement);
        const pollIconBtn = screen.getByTestId('add-poll-icon-button');
        fireEvent.click(pollIconBtn);
        const addOptionBtn = screen.getByTestId('poll-add-option-btn');
        fireEvent.click(addOptionBtn);
        const pollOptionContainer = container.querySelectorAll('.pollOptionContainer');
        expect(pollOptionContainer.length).toBeLessThanOrEqual(3);
        const deleteOptionBtn = pollOptionContainer[0].querySelector('button');
        // @ts-ignore
        fireEvent.click(deleteOptionBtn);
        const pollOptionInput = container.querySelector('.pollOptionContainer')?.querySelector('input');
        // @ts-ignore
        fireEvent.change(pollOptionInput, {target: {value: 'test 1'}});
        // @ts-ignore
        expect(pollOptionInput.value).toBe('test 1');
    })
})