import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ModalWrapper from "@/components/ProfileAvatar/PointsModal/ModalWrapper";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("ModalWrapper Component", () => {
  it("renders correctly when open is true", () => {
    const handleClose = jest.fn(); // Mock function for testing

    render(
      <ModalWrapper open={true} onClose={handleClose}>
        <>Modal Content</>
      </ModalWrapper>
    );

    // Check if the Modal component is rendered
    const modal = screen.getByTestId("modal-wrapper"); // Use data-testid for better testing
    expect(modal).toBeInTheDocument();

    // Check if the Modal content is rendered
    const modalContent = screen.getByText("Modal Content");
    expect(modalContent).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    const handleClose = jest.fn(); // Mock function for testing

    render(
      <ModalWrapper open={false} onClose={handleClose}>
        <>Modal Content</>
      </ModalWrapper>
    );

    // Check if the Modal component is not rendered when open is false
    const modal = screen.queryByTestId("modal");
    expect(modal).not.toBeInTheDocument();
  });
});
