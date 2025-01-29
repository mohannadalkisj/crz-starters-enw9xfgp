"use client"

import * as React from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"

interface RouteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const routes = [
  {
    id: 1,
    title: "جدة - الجزيرة الخاصة - جدة",
    image: "/cvs.png",
  },
  {
    id: 2,
    title: "جدة - شرم الشيخ - جدة",
    image: "/cvs.png",
  },
  {
    id: 3,
    title: "جدة - العقبة - جدة",
    image: "/cvs.png",
  },
  {
    id: 4,
    title: "رحلة كروز عيد الفطر",
    image: "/cvs.png",
  },
  {
    id: 5,
    title: "رحلة كروز يوم التأسيس",
    image: "/cvs.png",
  },
]

export function RouteDialog({ open, onOpenChange }: RouteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-right text-xl">مسار الرحلة</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {routes.map((route) => (
            <Card key={route.id} className="overflow-hidden group cursor-pointer" onClick={()=>onOpenChange(false)}>
              <div className="relative h-32">
                <img
                  src={route.image || "/placeholder.png"}
                  alt={route.title}
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold text-center">{route.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
