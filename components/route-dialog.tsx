"use client"

import * as React from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"

interface Route {
  id: number
  title: string
  image: string
}

interface RouteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRouteSelect: (route: Route) => void
  selectedRouteId?: number
}

const routes = [
  {
    id: 1,
    title: "جدة - الجزيرة الخاصة - جدة",
    image:
      "/jeddah.png",
  },
  {
    id: 2,
    title: "جدة - شرم الشيخ - جدة",
    image:
      "/sharm.png",
  },
  {
    id: 3,
    title: "جدة - العقبة - جدة",
    image:
      "/petra.png",
  },
  {
    id: 4,
    title: "رحلة كروز عيد الفطر",
    image:
      "/aroya_ship.jpg",
  },
  {
    id: 5,
    title: "رحلة كروز يوم التأسيس",
    image:
      "/aroya_ship.jpg",
  },
]

export function RouteDialog({ open, onOpenChange, onRouteSelect, selectedRouteId }: RouteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-right text-xl">مسار الرحلة</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {routes.map((route) => (
            <Card
              key={route.id}
              className={`overflow-hidden group cursor-pointer transition-all ${
                selectedRouteId === route.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => {
                onRouteSelect(route)
                onOpenChange(false)
              }}
            >
              <div className="relative h-32">
                <img
                  src={route.image || "/placeholder.svg"}
                  alt={route.title}
                  className="object-cover w-full h-64 transition-transform group-hover:scale-105"
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

