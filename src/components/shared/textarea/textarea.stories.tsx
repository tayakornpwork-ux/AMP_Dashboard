import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = {
  title: "Shared/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    placeholder: "Type your message here",
    error: false,
    disabled: false,
    resize: "vertical",
  },
  argTypes: {
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
    },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

// ── States ─────────────────────────────────────
export const Default: Story = {}

export const WithValue: Story = {
  args: { defaultValue: "Lorem ipsum dolor sit amet consectetur." },
}

export const Error: Story = {
  args: { error: true, placeholder: "Type your message here" },
}

export const Disabled: Story = {
  args: { disabled: true },
}

// ── With Label (composition) ───────────────────
export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 w-[530px]">
      <label className="text-sm font-medium text-text-primary">Your message</label>
      <Textarea placeholder="Type your message here" />
    </div>
  ),
}

// ── With Button (composition) ──────────────────
export const WithButton: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-[530px]">
      <label className="text-sm font-medium text-text-primary">Your message</label>
      <Textarea placeholder="Type your message here" />
      <button className="w-full bg-brand-blue text-text-on-brand px-4 py-2 rounded-md text-sm font-medium">
        Send message
      </button>
    </div>
  ),
}

// ── Resize options ─────────────────────────────
export const NoResize: Story = {
  args: { resize: "none" },
}
