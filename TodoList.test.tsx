import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoList } from "./TodoList";

describe("TodoList Component", () => {
  test("renders empty todo list and adds a new item", async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-button");

    await user.type(input, "Buy milk");
    await user.click(addButton);

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByTestId("todo-count")).toHaveTextContent("1 items (0 completed)");
  });

  test("toggles completion status", async () => {
    const initial = [{ id: 1, text: "Test item", completed: false }];
    render(<TodoList initialTodos={initial} />);

    const checkbox = screen.getByTestId("todo-checkbox");
    await userEvent.click(checkbox);

    expect(screen.getByTestId("todo-text")).toHaveClass("line-through");
  });

  test("deletes a todo item", async () => {
    const initial = [{ id: 1, text: "Delete me", completed: false }];
    render(<TodoList initialTodos={initial} />);

    const deleteBtn = screen.getByTestId("delete-button");
    await userEvent.click(deleteBtn);

    expect(screen.queryByText("Delete me")).not.toBeInTheDocument();
  });
});