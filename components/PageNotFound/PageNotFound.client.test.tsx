import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import PageNotFound from ".";
import Entry from "@/pages";
import mockRouter from "next-router-mock";
jest.mock("next/router", () => jest.requireActual("next-router-mock"));
describe("Navigation to non-existent route", () => {
  it("should render 404 Error text", () => {
    render(<PageNotFound />);
    expect(screen.getByText("404 Error")).toBeInTheDocument();
  });
  it("should render Back To Home button", () => {
    render(<PageNotFound />);
    expect(screen.getByText("Back To Home")).toBeInTheDocument();
  });
  it("should render Skool logo button", () => {
    render(<PageNotFound />);
    expect(screen.getByAltText("logo of skool")).toBeInTheDocument();
  });
  it("should navigate to home when Back To Home button is clicked", async () => {
    render(<PageNotFound />);
    fireEvent.click(screen.getByText("Back To Home"));
    expect(mockRouter).toMatchObject({
      asPath: "/",
      pathname: "/",
    });
  });
  it("should navigate to home when skool logo is clicked", async () => {
    render(<PageNotFound />);
    fireEvent.click(screen.getByAltText("logo of skool"));
    expect(mockRouter).toMatchObject({
      asPath: "/",
      pathname: "/",
    });
  });
  // it("should render the PageNotFound component when navigate to non-existed path ", async () => {
  //   render(<Entry />);
  //   mockRouter.push("/non-existed-path");
  //   expect(mockRouter).toMatchObject({
  //     asPath: "/non-existed-path",
  //     pathname: "/non-existed-path",
  //   });
  //   expect(screen.getByText("404 Error")).toBeInTheDocument();
  // });
});
