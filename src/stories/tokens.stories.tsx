import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta = {
  title: "Design System/Tokens",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}
export default meta
type Story = StoryObj

// ── Helpers ───────────────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-text-primary font-semibold text-base mb-4 pb-2 border-b border-border-default">
        {title}
      </h2>
      {children}
    </div>
  )
}

function ColorSwatch({ name, cssVar }: { name: string; cssVar: string }) {
  const value = typeof window !== "undefined"
    ? getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim()
    : ""
  return (
    <div className="flex flex-col gap-1.5 min-w-[120px]">
      <div
        className="h-12 w-full rounded-md border border-border-default"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <p className="text-[11px] font-medium text-text-primary leading-none">{name}</p>
      <p className="text-[11px] text-text-tertiary leading-none font-mono">{value}</p>
    </div>
  )
}

function SwatchRow({ swatches }: { swatches: { name: string; cssVar: string }[] }) {
  return (
    <div className="flex flex-wrap gap-4">
      {swatches.map((s) => <ColorSwatch key={s.name} {...s} />)}
    </div>
  )
}

function RadiusSwatch({ name, value, cls }: { name: string; value: string; cls: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-16 h-16 bg-brand-blue ${cls}`} />
      <p className="text-[11px] font-medium text-text-primary">{name}</p>
      <p className="text-[11px] text-text-tertiary font-mono">{value}</p>
    </div>
  )
}

function SpacingRow({ token, cssVar, tailwind }: { token: string; cssVar: string; tailwind: string }) {
  const value = typeof window !== "undefined"
    ? getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim()
    : ""
  return (
    <div className="flex items-center gap-4 py-2 border-b border-border-default last:border-0">
      <span className="w-24 text-[11px] font-mono text-text-primary shrink-0">{token}</span>
      <span className="w-16 text-[11px] text-text-tertiary shrink-0">{value}</span>
      <span className="w-16 text-[11px] font-mono text-text-tertiary shrink-0">{tailwind}</span>
      <div
        className="h-4 bg-brand-blue rounded-sm shrink-0"
        style={{ width: `var(${cssVar})` }}
      />
    </div>
  )
}

function ShadowSwatch({ name, cls }: { name: string; cls: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`w-20 h-20 bg-background-default rounded-lg ${cls}`} />
      <p className="text-[11px] font-medium text-text-primary">{name}</p>
    </div>
  )
}

// ── Stories ───────────────────────────────────────────────────────────────────
export const Colors: Story = {
  render: () => (
    <div className="p-6 bg-background-default">
      <Section title="Background">
        <SwatchRow swatches={[
          { name: "background/default",  cssVar: "--color-background-default" },
          { name: "background/subtle",   cssVar: "--color-background-subtle" },
          { name: "background/muted",    cssVar: "--color-background-muted" },
          { name: "background/card",     cssVar: "--color-background-card" },
          { name: "background/overlay",  cssVar: "--color-background-overlay" },
          { name: "background/inverse",  cssVar: "--color-background-inverse" },
        ]} />
      </Section>

      <Section title="Text">
        <SwatchRow swatches={[
          { name: "text/primary",     cssVar: "--color-text-primary" },
          { name: "text/secondary",   cssVar: "--color-text-secondary" },
          { name: "text/tertiary",    cssVar: "--color-text-tertiary" },
          { name: "text/placeholder", cssVar: "--color-text-placeholder" },
          { name: "text/disabled",    cssVar: "--color-text-disabled" },
          { name: "text/inverse",     cssVar: "--color-text-inverse" },
          { name: "text/on-brand",    cssVar: "--color-text-on-brand" },
          { name: "text/link",        cssVar: "--color-text-link" },
          { name: "text/link-hover",  cssVar: "--color-text-link-hover" },
        ]} />
      </Section>

      <Section title="Border">
        <SwatchRow swatches={[
          { name: "border/default",  cssVar: "--color-border-default" },
          { name: "border/strong",   cssVar: "--color-border-strong" },
          { name: "border/subtle",   cssVar: "--color-border-subtle" },
          { name: "border/focus",    cssVar: "--color-border-focus" },
          { name: "border/disabled", cssVar: "--color-border-disabled" },
        ]} />
      </Section>

      <Section title="Brand — Blue">
        <SwatchRow swatches={[
          { name: "brand/blue",        cssVar: "--color-brand-blue" },
          { name: "brand/blue-hover",  cssVar: "--color-brand-blue-hover" },
          { name: "brand/blue-active", cssVar: "--color-brand-blue-active" },
          { name: "brand/blue-subtle", cssVar: "--color-brand-blue-subtle" },
          { name: "brand/blue-muted",  cssVar: "--color-brand-blue-muted" },
          { name: "brand/blue-text",   cssVar: "--color-brand-blue-text" },
        ]} />
      </Section>

      <Section title="Brand — Yellow">
        <SwatchRow swatches={[
          { name: "brand/yellow",        cssVar: "--color-brand-yellow" },
          { name: "brand/yellow-hover",  cssVar: "--color-brand-yellow-hover" },
          { name: "brand/yellow-active", cssVar: "--color-brand-yellow-active" },
          { name: "brand/yellow-subtle", cssVar: "--color-brand-yellow-subtle" },
          { name: "brand/yellow-muted",  cssVar: "--color-brand-yellow-muted" },
          { name: "brand/yellow-text",   cssVar: "--color-brand-yellow-text" },
        ]} />
      </Section>

      <Section title="Brand — Red">
        <SwatchRow swatches={[
          { name: "brand/red",        cssVar: "--color-brand-red" },
          { name: "brand/red-hover",  cssVar: "--color-brand-red-hover" },
          { name: "brand/red-active", cssVar: "--color-brand-red-active" },
          { name: "brand/red-subtle", cssVar: "--color-brand-red-subtle" },
          { name: "brand/red-muted",  cssVar: "--color-brand-red-muted" },
          { name: "brand/red-text",   cssVar: "--color-brand-red-text" },
        ]} />
      </Section>

      <Section title="Status — Success">
        <SwatchRow swatches={[
          { name: "success",        cssVar: "--color-status-success" },
          { name: "success-hover",  cssVar: "--color-status-success-hover" },
          { name: "success-bg",     cssVar: "--color-status-success-bg" },
          { name: "success-muted",  cssVar: "--color-status-success-muted" },
          { name: "success-border", cssVar: "--color-status-success-border" },
          { name: "success-text",   cssVar: "--color-status-success-text" },
        ]} />
      </Section>

      <Section title="Status — Warning">
        <SwatchRow swatches={[
          { name: "warning",        cssVar: "--color-status-warning" },
          { name: "warning-hover",  cssVar: "--color-status-warning-hover" },
          { name: "warning-bg",     cssVar: "--color-status-warning-bg" },
          { name: "warning-muted",  cssVar: "--color-status-warning-muted" },
          { name: "warning-border", cssVar: "--color-status-warning-border" },
          { name: "warning-text",   cssVar: "--color-status-warning-text" },
        ]} />
      </Section>

      <Section title="Status — Error">
        <SwatchRow swatches={[
          { name: "error",        cssVar: "--color-status-error" },
          { name: "error-hover",  cssVar: "--color-status-error-hover" },
          { name: "error-bg",     cssVar: "--color-status-error-bg" },
          { name: "error-muted",  cssVar: "--color-status-error-muted" },
          { name: "error-border", cssVar: "--color-status-error-border" },
          { name: "error-text",   cssVar: "--color-status-error-text" },
        ]} />
      </Section>

      <Section title="Status — Info">
        <SwatchRow swatches={[
          { name: "info",        cssVar: "--color-status-info" },
          { name: "info-hover",  cssVar: "--color-status-info-hover" },
          { name: "info-bg",     cssVar: "--color-status-info-bg" },
          { name: "info-muted",  cssVar: "--color-status-info-muted" },
          { name: "info-border", cssVar: "--color-status-info-border" },
          { name: "info-text",   cssVar: "--color-status-info-text" },
        ]} />
      </Section>
    </div>
  ),
}

export const BorderRadius: Story = {
  render: () => (
    <div className="p-6 bg-background-default">
      <div className="flex flex-wrap gap-10">
        <RadiusSwatch name="radius-sm" value="4px"    cls="rounded-sm" />
        <RadiusSwatch name="radius-md" value="6px"    cls="rounded-md" />
        <RadiusSwatch name="radius-lg" value="8px"    cls="rounded-lg" />
        <RadiusSwatch name="radius-xl" value="12px"   cls="rounded-xl" />
        <RadiusSwatch name="radius-full" value="9999px" cls="rounded-full" />
      </div>
    </div>
  ),
}

export const Shadows: Story = {
  render: () => (
    <div className="p-10 bg-background-subtle">
      <div className="flex flex-wrap gap-12">
        <ShadowSwatch name="shadow-sm" cls="shadow-sm" />
        <ShadowSwatch name="shadow-md" cls="shadow-md" />
        <ShadowSwatch name="shadow-lg" cls="shadow-lg" />
      </div>
    </div>
  ),
}

export const Spacing: Story = {
  render: () => (
    <div className="p-6 bg-background-default max-w-xl">
      <div className="flex items-center gap-4 py-2 mb-1">
        <span className="w-24 text-[11px] font-semibold text-text-secondary shrink-0">Token</span>
        <span className="w-16 text-[11px] font-semibold text-text-secondary shrink-0">Value</span>
        <span className="w-16 text-[11px] font-semibold text-text-secondary shrink-0">Tailwind</span>
        <span className="text-[11px] font-semibold text-text-secondary">Visual</span>
      </div>
      <SpacingRow token="spacing/1"  cssVar="--spacing-1"  tailwind="p-1 / gap-1"  />
      <SpacingRow token="spacing/2"  cssVar="--spacing-2"  tailwind="p-2 / gap-2"  />
      <SpacingRow token="spacing/3"  cssVar="--spacing-3"  tailwind="p-3 / gap-3"  />
      <SpacingRow token="spacing/4"  cssVar="--spacing-4"  tailwind="p-4 / gap-4"  />
      <SpacingRow token="spacing/5"  cssVar="--spacing-5"  tailwind="p-5 / gap-5"  />
      <SpacingRow token="spacing/6"  cssVar="--spacing-6"  tailwind="p-6 / gap-6"  />
      <SpacingRow token="spacing/8"  cssVar="--spacing-8"  tailwind="p-8 / gap-8"  />
      <SpacingRow token="spacing/10" cssVar="--spacing-10" tailwind="p-10 / gap-10" />
      <SpacingRow token="spacing/12" cssVar="--spacing-12" tailwind="p-12 / gap-12" />
      <SpacingRow token="spacing/16" cssVar="--spacing-16" tailwind="p-16 / gap-16" />
      <SpacingRow token="spacing/20" cssVar="--spacing-20" tailwind="p-20 / gap-20" />
      <SpacingRow token="spacing/24" cssVar="--spacing-24" tailwind="p-24 / gap-24" />
    </div>
  ),
}

export const FontFamilies: Story = {
  render: () => (
    <div className="p-6 bg-background-default space-y-6">
      <div>
        <p className="text-[11px] text-text-tertiary mb-2 font-mono">--font-sans · Noto Looped Thai, Noto Sans Thai</p>
        <p className="font-sans text-2xl text-text-primary">
          The quick brown fox jumps over the lazy dog
        </p>
        <p className="font-sans text-xl text-text-primary">
          ภาษาไทยสวยงาม อักษรกลมกลืน
        </p>
      </div>
      <div>
        <p className="text-[11px] text-text-tertiary mb-2 font-mono">--font-mono · JetBrains Mono, Fira Code</p>
        <p className="font-mono text-xl text-text-primary">
          const token = "color/brand/blue"
        </p>
      </div>
    </div>
  ),
}
