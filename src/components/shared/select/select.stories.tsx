import type { Meta, StoryObj } from "@storybook/react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select"

const meta: Meta = {
  title: "Shared/Select",
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj

// ── Helper ────────────────────────────────────────────────────────────────────
const FruitSelect = ({ error, disabled }: { error?: boolean; disabled?: boolean }) => (
  <Select disabled={disabled}>
    <SelectTrigger className="w-[204px]" error={error}>
      <SelectValue placeholder="Select an option" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>Vegetables</SelectLabel>
        <SelectItem value="aubergine">Aubergine</SelectItem>
        <SelectItem value="broccoli">Broccoli</SelectItem>
        <SelectItem value="carrot" disabled>Carrot</SelectItem>
        <SelectItem value="leek">Leek</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
)

// ── States ─────────────────────────────────────────────────────────────────────
export const Default: Story = {
  render: () => <FruitSelect />,
}

export const WithValue: Story = {
  render: () => (
    <Select defaultValue="grapes">
      <SelectTrigger className="w-[204px]">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="apple">Apple</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Error: Story = {
  render: () => <FruitSelect error />,
}

export const Disabled: Story = {
  render: () => <FruitSelect disabled />,
}

// ── Grouped ───────────────────────────────────────────────────────────────────
export const WithGroups: Story = {
  render: () => <FruitSelect />,
}

// ── Widths ────────────────────────────────────────────────────────────────────
export const FullWidth: Story = {
  render: () => (
    <div className="w-80">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[204px]">
      <FruitSelect />
      <FruitSelect error />
      <FruitSelect disabled />
    </div>
  ),
}
