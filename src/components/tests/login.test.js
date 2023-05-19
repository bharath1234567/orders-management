import { render, fireEvent, screen } from "@testing-library/react";
import LoginPage from "../login/login";

describe("LoginPage", () => {
  it("submits the form with valid credentials", () => {
    const onLoginMock = jest.fn();
    render(<LoginPage onLogin={onLoginMock} />);

    fireEvent.change(screen.getByLabelText("Username/Email:"), { target: { value: "mockuser" } });
    fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "mockpassword" } });
    fireEvent.click(screen.getByText("Login"));

    expect(onLoginMock).toHaveBeenCalledTimes(1);
  });

  it("displays an error for invalid credentials", () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText("Username/Email:"), { target: { value: "incorrect" } });
    fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "incorrect" } });
    fireEvent.click(screen.getByText("Login"));

    expect(screen.getByText("Invalid username or password")).toBeInTheDocument();
  });

  it("updates the username input field correctly", () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText("Username/Email:"), { target: { value: "testuser" } });

    expect(screen.getByLabelText("Username/Email:").value).toBe("testuser");
  });

  it("updates the password input field correctly", () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "testpassword" } });

    expect(screen.getByLabelText("Password:").value).toBe("testpassword");
  });

  it("validates that the username field is required", () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByText("Login"));

    expect(screen.getByLabelText("Username/Email:")).toHaveAttribute("required");
  });

  it("validates that the password field is required", () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByText("Login"));

    expect(screen.getByLabelText("Password:")).toHaveAttribute("required");
  });
});
