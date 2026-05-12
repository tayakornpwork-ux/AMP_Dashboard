import { Users, Zap, BarChart2, DollarSign } from "lucide-react"
import { Button } from "@/components/shared/button/button"
import { Header } from "@/components/shared/header/header"
import { StatCard } from "@/components/shared/stat-card/stat-card"

// ── Static data ───────────────────────────────────────────────────────────────

const kpiStats = [
  { label: "ลีดทั้งหมด",      value: "12,482", change: "+12%",  positive: true,  icon: Users      },
  { label: "อัตราการแปลง",    value: "24.8%",  change: "+4.2%", positive: true,  icon: Zap        },
  { label: "ROI ค่าโฆษณา",   value: "4.2x",   change: "-0.0%", positive: true,  icon: BarChart2  },
  { label: "ต้นทุนต่อลีด",    value: "฿680",   change: "↓2.1%", positive: false, icon: DollarSign },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function DashboardOverview() {
  return (
    <>
      {/* ── Top Header ─────────────────────────────────────────────────────── */}
      <Header user={{ name: "อเล็กซ์ ริเวรา", role: "ผู้ดูแลระบบ", initials: "AR" }} />

      {/* ── Main Content ────────────────────────────────────────────────────── */}
      <div className="flex-1 space-y-6 overflow-auto p-6">

        {/* Page title + actions */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-text-primary">ภาพรวมแดชบอร์ด</h1>
            <p className="mt-1 text-sm text-text-secondary">
              ข้อมูลเชิงลึกแบบเรียลไทม์สำหรับไปป์ไลน์ลีดของคุณ
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Cancel</Button>
            <Button size="sm" className="bg-brand-blue text-text-on-brand hover:bg-brand-blue-hover">Continue</Button>
          </div>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-4 gap-4">
          {kpiStats.map(({ label, value, change, positive, icon: Icon }) => (
            <StatCard
              key={label}
              label={label}
              value={value}
              change={change}
              trend={positive ? "positive" : "negative"}
              icon={<Icon className="h-5 w-5" />}
            />
          ))}
        </div>

      </div>
    </>
  )
}
