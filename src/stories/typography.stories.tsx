import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta = {
  title: "Design System/Typography",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}
export default meta
type Story = StoryObj

// ── Helpers ───────────────────────────────────────────────────────────────────
function Row({
  styleName,
  family,
  weight,
  size,
  lineHeight,
  className,
  sample = "The quick brown fox — ภาษาไทยสวยงาม",
}: {
  styleName: string
  family: string
  weight: string
  size: string
  lineHeight: string
  className: string
  sample?: string
}) {
  return (
    <div className="flex items-baseline gap-6 py-4 border-b border-border-default last:border-0">
      <div className="w-52 shrink-0">
        <p className="text-[11px] font-medium text-text-primary font-mono">{styleName}</p>
        <p className="text-[11px] text-text-tertiary mt-0.5">{family} · {weight} · {size} / {lineHeight}</p>
      </div>
      <p className={`text-text-primary ${className}`}>{sample}</p>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-[11px] font-semibold text-text-tertiary uppercase tracking-widest mb-1">
        {title}
      </h2>
      <div>{children}</div>
    </div>
  )
}

// ── Stories ───────────────────────────────────────────────────────────────────
export const AllStyles: Story = {
  render: () => (
    <div className="p-6 bg-background-default max-w-4xl">
      <Section title="Heading">
        <Row styleName="heading/h1"     family="Noto Looped Thai" weight="ExtraBold" size="48px" lineHeight="48px"
          className="text-5xl font-extrabold leading-[48px] tracking-tight" />
        <Row styleName="heading/h2"     family="Noto Looped Thai" weight="SemiBold"  size="30px" lineHeight="36px"
          className="text-[30px] font-semibold leading-9 tracking-[-0.75px]" />
        <Row styleName="heading/h3"     family="Noto Looped Thai" weight="SemiBold"  size="24px" lineHeight="32px"
          className="text-2xl font-semibold leading-8" />
        <Row styleName="heading/h4"     family="Noto Looped Thai" weight="SemiBold"  size="20px" lineHeight="28px"
          className="text-xl font-semibold leading-7" />
      </Section>

      <Section title="Body">
        <Row styleName="body/lead"      family="Noto Looped Thai" weight="Regular"   size="20px" lineHeight="28px"
          className="text-xl font-normal leading-7" />
        <Row styleName="body/large"     family="Noto Looped Thai" weight="SemiBold"  size="18px" lineHeight="28px"
          className="text-lg font-semibold leading-7" />
        <Row styleName="body/default"   family="Noto Looped Thai" weight="Regular"   size="16px" lineHeight="28px"
          className="text-base font-normal leading-7" />
        <Row styleName="body/medium"    family="Noto Looped Thai" weight="Medium"    size="14px" lineHeight="24px"
          className="text-sm font-medium leading-6" />
        <Row styleName="body/subtle"    family="Noto Looped Thai" weight="Regular"   size="14px" lineHeight="20px"
          className="text-sm font-normal leading-5" />
        <Row styleName="body/small"     family="Noto Looped Thai" weight="Medium"    size="14px" lineHeight="14px"
          className="text-sm font-medium leading-[14px]" />
        <Row styleName="body/xs"        family="Noto Looped Thai" weight="Regular"   size="12px" lineHeight="16px"
          className="text-xs font-normal leading-4" />
      </Section>

      <Section title="UI">
        <Row styleName="ui/title"           family="Noto Looped Thai" weight="Medium"    size="18px" lineHeight="24px"
          className="text-lg font-medium leading-6" />
        <Row styleName="ui/description"     family="Noto Looped Thai" weight="Regular"   size="14px" lineHeight="18px"
          className="text-sm font-normal leading-[18px]" />
        <Row styleName="ui/button"          family="Noto Looped Thai" weight="Medium"    size="14px" lineHeight="24px"
          className="text-sm font-medium leading-6" sample="Save changes · บันทึก" />
        <Row styleName="ui/label"           family="Noto Looped Thai" weight="Medium"    size="12px" lineHeight="16px"
          className="text-xs font-medium leading-4" sample="Label · ป้ายกำกับ" />
        <Row styleName="ui/label-strong"    family="Noto Looped Thai" weight="Bold"      size="12px" lineHeight="16px"
          className="text-xs font-bold leading-4" sample="Label Strong · ป้ายหนา" />
        <Row styleName="ui/badge"           family="Noto Looped Thai" weight="Medium"    size="12px" lineHeight="16px"
          className="text-xs font-medium leading-4" sample="Badge · Default · Success" />
        <Row styleName="ui/caption"         family="Noto Looped Thai" weight="Regular"   size="11px" lineHeight="16px"
          className="text-[11px] font-normal leading-4" sample="Caption · คำอธิบายย่อย" />
        <Row styleName="ui/overline"        family="Noto Looped Thai" weight="SemiBold"  size="11px" lineHeight="16px"
          className="text-[11px] font-semibold leading-4 uppercase tracking-widest" sample="OVERLINE · หัวข้อย่อย" />
        <Row styleName="ui/compact-medium"  family="Noto Looped Thai" weight="Medium"    size="16px" lineHeight="16px"
          className="text-base font-medium leading-4" />
        <Row styleName="ui/inline-code"     family="Menlo"            weight="Bold"      size="14px" lineHeight="20px"
          className="font-mono text-sm font-bold leading-5" sample='const x = "token"' />
      </Section>

      <Section title="Data">
        <Row styleName="data/stat-display"  family="Noto Looped Thai" weight="ExtraBold" size="36px" lineHeight="40px"
          className="text-4xl font-extrabold leading-10" sample="฿ 1,234,567" />
        <Row styleName="data/stat-large"    family="Noto Looped Thai" weight="Bold"      size="28px" lineHeight="36px"
          className="text-[28px] font-bold leading-9" sample="98.6%" />
        <Row styleName="data/stat-medium"   family="Noto Looped Thai" weight="Bold"      size="22px" lineHeight="28px"
          className="text-[22px] font-bold leading-7" sample="1,024" />
        <Row styleName="data/table-head"    family="Noto Looped Thai" weight="SemiBold"  size="14px" lineHeight="24px"
          className="text-sm font-semibold leading-6" sample="Column Header" />
        <Row styleName="data/table-head-lg" family="Inter"            weight="Bold"      size="16px" lineHeight="24px"
          className="text-base font-bold leading-6" sample="Large Column Header" />
        <Row styleName="data/table-item"    family="Noto Looped Thai" weight="Regular"   size="14px" lineHeight="24px"
          className="text-sm font-normal leading-6" sample="Table cell value" />
        <Row styleName="data/badge"         family="Inter"            weight="Regular"   size="12px" lineHeight="AUTO"
          className="font-sans text-xs font-normal" sample="badge-value" />
      </Section>
    </div>
  ),
}

export const Headings: Story = {
  render: () => (
    <div className="p-6 bg-background-default space-y-4">
      <p className="text-5xl font-extrabold leading-[48px] text-text-primary tracking-tight">heading/h1 · 48px ExtraBold</p>
      <p className="text-[30px] font-semibold leading-9 text-text-primary tracking-[-0.75px]">heading/h2 · 30px SemiBold</p>
      <p className="text-2xl font-semibold leading-8 text-text-primary">heading/h3 · 24px SemiBold</p>
      <p className="text-xl font-semibold leading-7 text-text-primary">heading/h4 · 20px SemiBold</p>
    </div>
  ),
}

export const BodyText: Story = {
  render: () => (
    <div className="p-6 bg-background-default space-y-3 max-w-xl">
      <p className="text-xl font-normal leading-7 text-text-primary">body/lead — ข้อความขนาดใหญ่ใช้สำหรับ intro paragraph</p>
      <p className="text-lg font-semibold leading-7 text-text-primary">body/large — หัวข้อย่อยหรือ card title</p>
      <p className="text-base font-normal leading-7 text-text-primary">body/default — body text ทั่วไปในหน้า</p>
      <p className="text-sm font-medium leading-6 text-text-secondary">body/medium — คำอธิบายหรือ secondary content</p>
      <p className="text-sm font-normal leading-5 text-text-secondary">body/subtle — helper text หรือ description เล็กๆ</p>
      <p className="text-xs font-normal leading-4 text-text-tertiary">body/xs — timestamp, metadata, fine print</p>
    </div>
  ),
}

export const UIElements: Story = {
  render: () => (
    <div className="p-6 bg-background-default space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium leading-4 text-text-tertiary w-36">ui/badge</span>
        <span className="px-2 py-0.5 rounded-full bg-brand-blue text-text-inverse text-xs font-medium leading-4">Default</span>
        <span className="px-2 py-0.5 rounded-full bg-status-success-bg text-status-success-text border border-status-success-border text-xs font-medium leading-4">Success</span>
        <span className="px-2 py-0.5 rounded-full bg-status-warning-bg text-status-warning-text border border-status-warning-border text-xs font-medium leading-4">Warning</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium leading-4 text-text-tertiary w-36">ui/button</span>
        <button className="px-4 py-2 rounded-md bg-brand-blue text-text-inverse text-sm font-medium leading-6">Save changes</button>
        <button className="px-4 py-2 rounded-md border border-border-default text-text-primary text-sm font-medium leading-6">Cancel</button>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium leading-4 text-text-tertiary w-36">ui/label</span>
        <label className="text-xs font-medium leading-4 text-text-primary">Email address</label>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium leading-4 text-text-tertiary w-36">ui/caption</span>
        <span className="text-[11px] font-normal leading-4 text-text-tertiary">อัปเดตล่าสุด 5 นาทีที่แล้ว</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium leading-4 text-text-tertiary w-36">ui/overline</span>
        <span className="text-[11px] font-semibold leading-4 text-text-tertiary uppercase tracking-widest">Section Title</span>
      </div>
    </div>
  ),
}
