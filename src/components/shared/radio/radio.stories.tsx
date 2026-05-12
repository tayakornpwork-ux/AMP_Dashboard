import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup, RadioItem } from "./radio"

const meta: Meta<typeof RadioItem> = {
  title: "Shared/Radio",
  component: RadioItem,
  tags: ["autodocs"],
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: { control: "boolean" },
    label: { control: "text" },
    description: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof RadioItem>

// ── Single Item Stories ────────────────────────────────────────────────────────
export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <RadioItem value="option1" />
    </RadioGroup>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <RadioItem value="comfortable" label="Comfortable" />
    </RadioGroup>
  ),
}

export const Selected: Story = {
  render: () => (
    <RadioGroup defaultValue="selected">
      <RadioItem value="selected" label="Selected option" />
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <RadioItem value="option1" label="ไม่สามารถเปลี่ยนแปลงได้" disabled />
    </RadioGroup>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <RadioItem
        value="option1"
        label="รับการแจ้งเตือน"
        description="รับอีเมลเมื่อมีกิจกรรมในบัญชีของคุณ"
      />
    </RadioGroup>
  ),
}

// ── Group Stories ─────────────────────────────────────────────────────────────
export const Group: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <RadioItem value="default" label="Default" />
      <RadioItem value="comfortable" label="Comfortable" />
      <RadioItem value="compact" label="Compact" />
    </RadioGroup>
  ),
}

export const GroupDisabled: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable" disabled>
      <RadioItem value="default" label="Default" />
      <RadioItem value="comfortable" label="Comfortable" />
      <RadioItem value="compact" label="Compact" />
    </RadioGroup>
  ),
}

export const GroupWithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <RadioItem
        value="default"
        label="Default"
        description="แสดงผลแบบมาตรฐาน"
      />
      <RadioItem
        value="comfortable"
        label="Comfortable"
        description="เพิ่มระยะห่างระหว่างรายการ"
      />
      <RadioItem
        value="compact"
        label="Compact"
        description="ลดระยะห่างเพื่อแสดงข้อมูลได้มากขึ้น"
      />
    </RadioGroup>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <RadioGroup defaultValue="checked">
        <RadioItem value="unchecked" label="Unchecked" />
        <RadioItem value="checked" label="Checked (selected)" />
        <RadioItem value="disabled" label="Disabled" disabled />
        <RadioItem value="disabled-checked" label="Disabled (would be checked)" disabled />
      </RadioGroup>
    </div>
  ),
}
