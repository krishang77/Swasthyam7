
import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ActionModalProps {
  title: string
  description?: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export function ActionModal({
  title,
  description,
  isOpen,
  onOpenChange,
  children,
}: ActionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
