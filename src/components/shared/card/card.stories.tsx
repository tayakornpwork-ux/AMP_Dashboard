import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "@/components/shared/button/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardDivider,
  CardContent,
  CardFooter,
} from "./card"

const meta: Meta<typeof Card> = {
  title: "Shared/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Card>

// ── Default ───────────────────────────────────────────────────────────────────
export const Default: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardDivider />
      <CardContent>
        <p className="text-sm leading-5 text-text-secondary">Your content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  ),
}

// ── Header Only ───────────────────────────────────────────────────────────────
export const HeaderOnly: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
    </Card>
  ),
}

// ── No Footer ─────────────────────────────────────────────────────────────────
export const NoFooter: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
        <CardDescription>An overview of your account activity.</CardDescription>
      </CardHeader>
      <CardDivider />
      <CardContent>
        <p className="text-sm leading-5 text-text-secondary">
          Total campaigns: 12 · Active: 4 · Paused: 8
        </p>
      </CardContent>
    </Card>
  ),
}

// ── With Cancel (showCancel=true) ─────────────────────────────────────────────
export const WithCancel: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardDivider />
      <CardContent>
        <p className="text-sm leading-5 text-text-secondary">Your content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  ),
}

// ── No Divider ────────────────────────────────────────────────────────────────
export const NoDivider: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
        <CardDescription>Last 30 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-5 text-text-secondary">Impressions: 1,240,000</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">View report</Button>
      </CardFooter>
    </Card>
  ),
}

// ── Full Width ────────────────────────────────────────────────────────────────
export const FullWidth: Story = {
  render: () => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Campaign Details</CardTitle>
        <CardDescription>Review your campaign settings before publishing.</CardDescription>
      </CardHeader>
      <CardDivider />
      <CardContent>
        <p className="text-sm leading-5 text-text-secondary">
          Budget: ฿50,000 · Duration: 30 days · Target: Bangkok
        </p>
      </CardContent>
      <CardFooter className="gap-2 justify-end">
        <Button variant="outline">Cancel</Button>
        <Button>Publish</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    layout: "padded",
  },
}
