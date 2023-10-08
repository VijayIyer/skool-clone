import NewPostInput from "@/components/NewPost/NewPostInput";
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'

describe('Log In Sign Up Modal', () => {
    test('should render', () => {
        render(<NewPostInput/>)
        const loginBtn = screen.getByTestId('login-btn');
        const signupBtn = screen.getByTestId('signup-btn');
        fireEvent.click(loginBtn);
        const modalContainer = screen.getByTestId('modal-container');
        expect(modalContainer).toBeInTheDocument();
    })
    test('should hide modal when user click background', () => {
        render(<NewPostInput/>)
        const signupBtn = screen.getByTestId('signup-btn');
        fireEvent.click(signupBtn);
        const modalContainer = screen.getByTestId('modal-container');
        expect(modalContainer).toBeInTheDocument();
        const modalBackground = screen.getByTestId('modal-background');
        expect(modalBackground).toBeInTheDocument();
    })
    test('should allow users to switch between sign up component and log in component', () => {
        render(<NewPostInput/>)
        const signupBtn = screen.getByTestId('signup-btn');
        fireEvent.click(signupBtn);
        const signup = screen.getByTestId('sign-up-container');
        expect(signup).toBeInTheDocument();
        const loginSpan = screen.getByTestId('login-span');
        expect(loginSpan).toBeInTheDocument();
        fireEvent.click(loginSpan);
        const login = screen.getByTestId('login-container');
        expect(login).toBeInTheDocument();
    })
})