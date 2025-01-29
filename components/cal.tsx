"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ar } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CalendarDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CalendarDialog({ open, onOpenChange }: CalendarDialogProps) {
  const [date, setDate] = React.useState<Date>()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right">اختر تاريخ الرحلة</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Calendar mode="single" selected={date} onSelect={setDate} locale={ar} className="rounded-md border" />
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {date ? format(date, "PPP", { locale: ar }) : "لم يتم اختيار تاريخ"}
            </div>
            <Button onClick={() => onOpenChange(false)}>تم</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

