import { render, fireEvent, screen } from "@testing-library/react";
import OrdersPage from "../orders/order";
import { orders } from "../mockdata/mockdata";

describe("OrdersPage", () => {
  it("renders the orders table with mock data", () => {
    render(<OrdersPage />);

    const table = screen.getByRole("table");
    const tableHeaders = screen.getAllByRole("columnheader");
    const tableRows = screen.getAllByRole("row");

    expect(table).toBeInTheDocument();
    expect(tableHeaders).toHaveLength(4);
    expect(tableRows).toHaveLength(orders.length + 1); // +1 for the table header row
  });

  it("filters orders based on search query", () => {
    render(<OrdersPage />);

    const searchInput = screen.getByPlaceholderText("Search...");

    fireEvent.change(searchInput, { target: { value: "123" } });

    const tableRows = screen.getAllByRole("row");
    const filteredRows = tableRows.filter((row) => row !== screen.getByRole("rowheader"));

    expect(filteredRows).toHaveLength(2); // Assuming there are two orders with "123" in their data
  });

  it("changes the displayed orders on pagination", () => {
    render(<OrdersPage />);

    const paginationButtons = screen.getAllByRole("button");
    const secondPageButton = paginationButtons[1]; // Assuming there are at least two pages

    fireEvent.click(secondPageButton);

    const tableRows = screen.getAllByRole("row");
    const displayedRows = tableRows.filter((row) => row !== screen.getByRole("rowheader"));

    expect(displayedRows).toHaveLength(orders.length % 10); // Assuming there are remaining orders on the second page
  });
});
