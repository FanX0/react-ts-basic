import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ThemeBasic from "@/pages/data/clientstorage/localstorage/basic/Theme/ThemeBasic";
import * as themeStore from "@/services/theme";

vi.mock("@/services/theme");

describe("ThemeBasic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(themeStore.load).mockReturnValue("light");
    vi.mocked(themeStore.save).mockImplementation(() => {});
    vi.mocked(themeStore.toggle).mockImplementation(() => "dark");
    // Reset dataset before each test
    delete (document.documentElement as any).dataset.theme;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders title and shows current theme from store on mount", async () => {
    vi.mocked(themeStore.load).mockReturnValue("dark");
    render(<ThemeBasic />);

    expect(themeStore.load).toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.getByText("LocalStorage: Theme Basic")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByText(/Current theme:/)).toBeInTheDocument()
    );
    expect(screen.getByText(/Current theme:/).parentElement).toHaveTextContent(
      "dark"
    );
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("sets light theme when Light is clicked", async () => {
    vi.mocked(themeStore.load).mockReturnValue("dark");
    render(<ThemeBasic />);

    fireEvent.click(screen.getByRole("button", { name: "Set light theme" }));
    await waitFor(() => expect(themeStore.save).toHaveBeenCalledWith("light"));
    expect(screen.getByText(/Current theme:/).parentElement).toHaveTextContent(
      "light"
    );
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("sets dark theme when Dark is clicked", async () => {
    vi.mocked(themeStore.load).mockReturnValue("light");
    render(<ThemeBasic />);

    fireEvent.click(screen.getByRole("button", { name: "Set dark theme" }));
    await waitFor(() => expect(themeStore.save).toHaveBeenCalledWith("dark"));
    expect(screen.getByText(/Current theme:/).parentElement).toHaveTextContent(
      "dark"
    );
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("toggles theme using service and updates dataset", async () => {
    vi.mocked(themeStore.load).mockReturnValue("light");
    vi.mocked(themeStore.toggle).mockReturnValue("dark");
    render(<ThemeBasic />);

    fireEvent.click(screen.getByRole("button", { name: "Toggle theme" }));
    await waitFor(() => expect(themeStore.toggle).toHaveBeenCalled());
    expect(screen.getByText(/Current theme:/).parentElement).toHaveTextContent(
      "dark"
    );
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("has accessible labels for all theme control buttons", () => {
    render(<ThemeBasic />);
    expect(
      screen.getByRole("button", { name: "Set light theme" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Set dark theme" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Toggle theme" })
    ).toBeInTheDocument();
  });
});
