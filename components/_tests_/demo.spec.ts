import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import DateEntry from "../DateEntry.vue";

describe("DateEntry", () => {
    const dateString = "2024-03-18";

    it("renders correctly", async () => {
        // Render the component
        render(DateEntry, {
            props: { dateString }
        });

        // Find the element that displays the formatted date
        const dateElement = await screen.findByText("18.03.2024");

        // Assert that the element exists
        expect(dateElement).not.toBeNull();
    });
});
