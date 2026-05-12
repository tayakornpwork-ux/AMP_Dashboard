import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "./checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "Shared/Checkbox",
  component: Checkbox,
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
type Story = StoryObj<typeof Checkbox>

// ── Variants (ตรงกับ Figma 7 variants) ────────
export const Default: Story = {}

export const WithText: Story = {
  args: { label: "ยอมรับเงื่อนไขการใช้งาน" },
}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const CheckedWithText: Story = {
  args: { defaultChecked: true, label: "ยอมรับเงื่อนไขการใช้งาน" },
}

export const Disabled: Story = {
  args: { disabled: true, label: "ไม่สามารถเปลี่ยนแปลงได้" },
}

// ── Description variants (Figma ใหม่) ──────────
export const WithTextAndDescription: Story = {
  args: {
    label: "รับการแจ้งเตือน",
    description: "รับอีเมลเมื่อมีกิจกรรมในบัญชีของคุณ",
  },
}

export const CheckedWithTextAndDescription: Story = {
  args: {
    defaultChecked: true,
    label: "รับการแจ้งเตือน",
    description: "รับอีเมลเมื่อมีกิจกรรมในบัญชีของคุณ",
  },
}

// ── All States ─────────────────────────────────
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Default (unchecked)" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled + Checked" disabled defaultChecked />
      <Checkbox
        label="With description"
        description="คำอธิบายเพิ่มเติมอยู่ที่นี่"
      />
      <Checkbox
        label="Checked + description"
        description="คำอธิบายเพิ่มเติมอยู่ที่นี่"
        defaultChecked
      />
    </div>
  ),
}
