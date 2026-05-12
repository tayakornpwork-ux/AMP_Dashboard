import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "./switch"

const meta: Meta<typeof Switch> = {
  title: "Shared/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
    label: { control: "text" },
    description: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

// ── States ─────────────────────────────────────────────────────────────────────
export const Default: Story = {}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const WithLabel: Story = {
  args: { label: "Airplane mode" },
}

export const CheckedWithLabel: Story = {
  args: { defaultChecked: true, label: "Airplane mode" },
}

export const WithDescription: Story = {
  args: {
    label: "รับการแจ้งเตือน",
    description: "รับอีเมลเมื่อมีกิจกรรมในบัญชีของคุณ",
  },
}

export const Disabled: Story = {
  args: { disabled: true, label: "ไม่สามารถเปลี่ยนแปลงได้" },
}

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true, label: "ไม่สามารถเปลี่ยนแปลงได้" },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Off (default)" />
      <Switch label="On" defaultChecked />
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
      <Switch
        label="With description"
        description="คำอธิบายเพิ่มเติมอยู่ที่นี่"
      />
    </div>
  ),
}
