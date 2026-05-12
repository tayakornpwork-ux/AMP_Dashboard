import type { Meta, StoryObj } from "@storybook/react"
import { Dialog, DialogHeader, DialogTitleGroup, DialogTitle, DialogDescription, DialogClose, DialogDivider, DialogContent, DialogFooter } from "./dialog"
import { Button } from "@/components/shared/button/button"

const meta: Meta<typeof Dialog> = {
  title: "Shared/Dialog",
  component: Dialog,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Dialog>

// ── Default ────────────────────────────────────────────────────────────────────
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogHeader>
        <DialogTitleGroup>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog description goes here. Provide additional context about this action.</DialogDescription>
        </DialogTitleGroup>
        <DialogClose />
      </DialogHeader>
      <DialogDivider />
      <DialogContent>
        <p className="text-sm leading-5 text-text-secondary">Your content goes here.</p>
      </DialogContent>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </DialogFooter>
    </Dialog>
  ),
}

// ── Destructive ────────────────────────────────────────────────────────────────
export const Destructive: Story = {
  render: () => (
    <Dialog>
      <DialogHeader>
        <DialogTitleGroup>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog description goes here. Provide additional context about this action.</DialogDescription>
        </DialogTitleGroup>
        <DialogClose />
      </DialogHeader>
      <DialogDivider />
      <DialogContent>
        <p className="text-sm leading-5 text-text-secondary">Your content goes here.</p>
      </DialogContent>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </DialogFooter>
    </Dialog>
  ),
}

// ── All variants ────────────────────────────────────────────────────────────────
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Dialog>
        <DialogHeader>
          <DialogTitleGroup>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog description goes here. Provide additional context about this action.</DialogDescription>
          </DialogTitleGroup>
          <DialogClose />
        </DialogHeader>
        <DialogDivider />
        <DialogContent>
          <p className="text-sm leading-5 text-text-secondary">Your content goes here.</p>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </Dialog>

      <Dialog>
        <DialogHeader>
          <DialogTitleGroup>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog description goes here. Provide additional context about this action.</DialogDescription>
          </DialogTitleGroup>
          <DialogClose />
        </DialogHeader>
        <DialogDivider />
        <DialogContent>
          <p className="text-sm leading-5 text-text-secondary">Your content goes here.</p>
        </DialogContent>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </Dialog>
    </div>
  ),
}
