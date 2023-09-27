import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import IconAndModal from "@/components/ProfileAvatar/PointsModal/IconAndModal";
import "@testing-library/jest-dom";

describe("IconAndModal Component", () => {
  it("opens and closes the modal when the icon is clicked", () => {
    render(<IconAndModal />);

    // Check if the modal is initially closed
    const modal = screen.queryByTestId("modal-wraper");
    expect(modal).not.toBeInTheDocument();

    // Click the icon to open the modal
    const icon = screen.getByTestId("modal-icon");
    fireEvent.click(icon);

    // Check if the modal is open
    const openedModal = screen.getByTestId("modal-wrapper");
    expect(openedModal).toBeInTheDocument();

    // Click the close button to close the modal
    const closeButton = screen.getByLabelText("Close Skool Points modal");
    fireEvent.click(closeButton);

    // Check if the modal is closed
    const closedModal = screen.queryByTestId("modal-wrapper");
    expect(closedModal).not.toBeInTheDocument();
  });
});
