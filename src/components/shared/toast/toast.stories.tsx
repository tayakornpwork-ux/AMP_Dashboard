import type { Meta, StoryObj } from "@storybook/react"
import { Toast, ToastContent, ToastTitle, ToastDescription, ToastClose } from "./toast"

const meta: Meta<typeof Toast> = {
  title: "Shared/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "destructive"],
    },
  },
  args: {
    variant: "default",
  },
}

export default meta
type Story = StoryObj<typeof Toast>

// ── Single variants ────────────────────────────────────────────────────────────
export const Default: Story = {
  render: () => (
    <Toast variant="default">
      <ToastContent>
        <ToastTitle>Toast title</ToastTitle>
        <ToastDescription>Toast description goes here.</ToastDescription>
      </ToastContent>
      <ToastClose />
    </Toast>
  ),
}

export const Success: Story = {
  render: () => (
    <Toast variant="success">
      <ToastContent>
        <ToastTitle>บันทึกสำเร็จ</ToastTitle>
        <ToastDescription>ข้อมูลถูกบันทึกเรียบร้อยแล้ว</ToastDescription>
      </ToastContent>
      <ToastClose />
    </Toast>
  ),
}

export const Warning: Story = {
  render: () => (
    <Toast variant="warning">
      <ToastContent>
        <ToastTitle>คำเตือน</ToastTitle>
        <ToastDescription>งบประมาณใกล้ถึงขีดจำกัดแล้ว</ToastDescription>
      </ToastContent>
      <ToastClose />
    </Toast>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Toast variant="destructive">
      <ToastContent>
        <ToastTitle>เกิดข้อผิดพลาด</ToastTitle>
        <ToastDescription>ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง</ToastDescription>
      </ToastContent>
      <ToastClose />
    </Toast>
  ),
}

// ── All variants ───────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["default", "success", "warning", "destructive"] as const).map((variant) => (
        <Toast key={variant} variant={variant}>
          <ToastContent>
            <ToastTitle>Toast title</ToastTitle>
            <ToastDescription>Toast description goes here.</ToastDescription>
          </ToastContent>
          <ToastClose />
        </Toast>
      ))}
    </div>
  ),
}

// ── Title only (no description) ───────────────────────────────────────────────
export const TitleOnly: Story = {
  render: () => (
    <Toast variant="success">
      <ToastContent>
        <ToastTitle>บันทึกสำเร็จ</ToastTitle>
      </ToastContent>
      <ToastClose />
    </Toast>
  ),
}
