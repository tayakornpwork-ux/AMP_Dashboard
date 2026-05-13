"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft, CheckCircle2, FileText,
  Bike, Car, Truck, Tractor, MapPin, Landmark,
} from "lucide-react"
import { Card } from "@/components/shared/card/card"
import { Header } from "@/components/shared/header/header"
import { Button } from "@/components/shared/button/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/shared/dialog/dialog"

// ── Types ─────────────────────────────────────────────────────────────────────

type LoanType = "motorcycle" | "car" | "truck" | "agriculture" | "land-pawn" | "land-mortgage"

interface StoredDocument {
  name: string
  type: string
  dataUrl?: string
}

interface StoredFormData {
  leadChannel: string
  partner: string
  campaignCode: string
  idCard: string
  firstName: string
  lastName: string
  monthlyIncome: string
  phone: string
  address: string
  province: string
  district: string
  subDistrict: string
  postalCode: string
  loanType: LoanType | ""
  vehicleBrand: string
  vehicleModel: string
  vehicleYear: string
  licensePlate: string
  registrationProvince: string
  redbookMin: string
  redbookMax: string
  landDeedType: string
  landOffice: string
  landAppraisalPrice: string
  installmentAmount: string
  previousFinancer: string
  closingAmount: string
  notes: string
  documents: StoredDocument[]
}

// ── Label maps ────────────────────────────────────────────────────────────────

const PARTNER_LABELS: Record<string, string> = {
  "partner-001": "บริษัท ABC จำกัด",
  "partner-002": "บริษัท XYZ จำกัด",
  "partner-003": "ห้างหุ้นส่วน DEF",
  "partner-004": "บริษัท GHI จำกัด (มหาชน)",
  "partner-005": "ร้าน JKL",
}

const CAMPAIGN_LABELS: Record<string, string> = {
  "CAMP-2026-001": "CAMP-2026-001 — โปรโมชันต้นปี",
  "CAMP-2026-002": "CAMP-2026-002 — สงกรานต์สุขใจ",
  "CAMP-2026-003": "CAMP-2026-003 — ลดดอกเบี้ยพิเศษ",
  "CAMP-2026-004": "CAMP-2026-004 — ไตรมาส 2",
  "CAMP-2026-005": "CAMP-2026-005 — End of Year",
}

const LEAD_CHANNEL_LABELS: Record<string, string> = {
  "qr-code": "QR Code",
  "agent": "Agent",
  "local-agent": "Local Agent",
  "affiliate": "Affiliate",
  "branch": "Branch",
}

const LOAN_TYPE_INFO: Record<LoanType, { label: string; icon: React.ElementType }> = {
  "motorcycle": { label: "รถจักรยานยนต์", icon: Bike },
  "car": { label: "รถยนต์", icon: Car },
  "truck": { label: "รถบรรทุก", icon: Truck },
  "agriculture": { label: "รถเพื่อการเกษตร", icon: Tractor },
  "land-pawn": { label: "ที่ดิน (จำนำ)", icon: MapPin },
  "land-mortgage": { label: "ที่ดิน (จำนอง)", icon: Landmark },
}

const LAND_DEED_LABELS: Record<string, string> = {
  "ns4": "น.ส. 4",
  "ns3k": "น.ส. 3 ก.",
  "ns3": "น.ส. 3 / 3 ข.",
  "spk401": "ส.ป.ก. 4-01",
}

const isVehicle = (t: LoanType | "") => ["motorcycle", "car", "truck", "agriculture"].includes(t)
const isLand = (t: LoanType | "") => ["land-pawn", "land-mortgage"].includes(t)

// ── Sub-components ────────────────────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-text-tertiary">{label}</span>
      <span className="text-sm font-medium text-text-primary">{value || "—"}</span>
    </div>
  )
}

function SectionCard({ title, num, children }: { title: string; num: number; children: React.ReactNode }) {
  return (
    <Card className="overflow-hidden border-border-default shadow-sm">
      <div className="flex items-center gap-3 border-b border-border-default bg-brand-blue px-6 py-4">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-text-primary">
          {num}
        </div>
        <span className="text-sm font-semibold text-text-on-brand">{title}</span>
      </div>
      <div className="p-6">{children}</div>
    </Card>
  )
}

function SubSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3 border-t border-border-default pt-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">{label}</p>
      {children}
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export function LeadCreateSummary() {
  const router = useRouter()
  const [data, setData] = useState<StoredFormData | null>(null)
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem("lead-draft")
    if (!raw) {
      router.replace("/lead-pool/create")
      return
    }
    try {
      setData(JSON.parse(raw))
    } catch {
      router.replace("/lead-pool/create")
    }
  }, [router])

  function handleConfirm() {
    sessionStorage.removeItem("lead-draft")
    router.push("/lead-pool")
  }

  if (!data) return null

  const loanInfo = data.loanType ? LOAN_TYPE_INFO[data.loanType] : null
  const fmt = (n: string) => (n ? Number(n).toLocaleString("th-TH") + " บาท" : "—")

  return (
    <>
      <Header user={{ name: "อเล็กซ์ ริเวรา", role: "ผู้ดูแลระบบ", initials: "AR" }} />

      <div className="flex-1 overflow-auto bg-background-subtle p-4 lg:p-6">
        <div className="mx-auto max-w-3xl space-y-4">

          {/* Page title */}
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={() => router.push("/lead-pool/create")}
              className="flex items-center justify-center rounded-md p-2 text-text-secondary transition-colors hover:bg-background-muted hover:text-text-primary"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <p className="text-xs text-text-tertiary">คลังลีด / สร้าง Lead</p>
              <h1 className="text-xl font-semibold text-brand-blue">ตรวจสอบข้อมูล</h1>
            </div>
          </div>

          {/* ── Step 1 ───────────────────────────────────────────────────────── */}
          <SectionCard num={1} title="Lead Channel">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <InfoRow label="ช่องทางรับ Lead" value={LEAD_CHANNEL_LABELS[data.leadChannel] ?? data.leadChannel} />
              <InfoRow label="พาร์ทเนอร์" value={PARTNER_LABELS[data.partner] ?? data.partner} />
              <InfoRow label="Campaign Code" value={CAMPAIGN_LABELS[data.campaignCode] ?? data.campaignCode} />
            </div>
          </SectionCard>

          {/* ── Step 2 ───────────────────────────────────────────────────────── */}
          <SectionCard num={2} title="ข้อมูลลูกค้า">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="col-span-2 md:col-span-3">
                  <InfoRow label="เลขบัตรประชาชน" value={data.idCard} />
                </div>
                <InfoRow label="ชื่อ" value={data.firstName} />
                <InfoRow label="นามสกุล" value={data.lastName} />
                <InfoRow label="รายได้ต่อเดือน" value={fmt(data.monthlyIncome)} />
                <InfoRow label="เบอร์โทรศัพท์" value={data.phone} />
              </div>
              <SubSection label="ที่อยู่">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  <div className="col-span-2 md:col-span-3">
                    <InfoRow label="ที่อยู่" value={data.address} />
                  </div>
                  <InfoRow label="จังหวัด" value={data.province} />
                  <InfoRow label="เขต / อำเภอ" value={data.district} />
                  <InfoRow label="แขวง / ตำบล" value={data.subDistrict} />
                  <InfoRow label="รหัสไปรษณีย์" value={data.postalCode} />
                </div>
              </SubSection>
            </div>
          </SectionCard>

          {/* ── Step 3 ───────────────────────────────────────────────────────── */}
          <SectionCard num={3} title="หลักประกันสินเชื่อ">
            {loanInfo && (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-brand-blue bg-brand-blue-subtle text-brand-blue">
                  <loanInfo.icon className="h-5 w-5" />
                </div>
                <span className="text-base font-semibold text-text-primary">{loanInfo.label}</span>
              </div>
            )}
          </SectionCard>

          {/* ── Step 4 ───────────────────────────────────────────────────────── */}
          <SectionCard num={4} title="ข้อมูลสินเชื่อ">
            <div className="space-y-4">

              {isVehicle(data.loanType) && (
                <SubSection label="ข้อมูลยานพาหนะ">
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    <InfoRow label="ยี่ห้อรถ" value={data.vehicleBrand} />
                    <InfoRow label="รุ่นรถ" value={data.vehicleModel} />
                    <InfoRow label="ปีจดทะเบียนรถ" value={data.vehicleYear} />
                    <InfoRow label="ทะเบียนรถ" value={data.licensePlate} />
                    <InfoRow label="จังหวัดที่จดทะเบียนรถ" value={data.registrationProvince} />
                    <InfoRow
                      label="Range ราคา Redbook"
                      value={
                        data.redbookMin && data.redbookMax
                          ? `${Number(data.redbookMin).toLocaleString("th-TH")} — ${Number(data.redbookMax).toLocaleString("th-TH")} บาท`
                          : "—"
                      }
                    />
                  </div>
                </SubSection>
              )}

              {isLand(data.loanType) && (
                <SubSection label="ข้อมูลที่ดิน">
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    <InfoRow label="ประเภทโฉนดที่ดิน" value={LAND_DEED_LABELS[data.landDeedType] ?? data.landDeedType} />
                    <InfoRow label="สำนักงานเขตที่ดิน" value={data.landOffice} />
                    <InfoRow label="ราคาประเมินที่ดิน" value={fmt(data.landAppraisalPrice)} />
                  </div>
                </SubSection>
              )}

              <SubSection label="ข้อมูลสินเชื่อ">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  <InfoRow label="จำนวนเงินที่ต้องการผ่อน (ต่องวด)" value={fmt(data.installmentAmount)} />
                  <InfoRow label="สถาบันการเงินเดิม" value={data.previousFinancer} />
                  <InfoRow label="ยอดปิดบัญชีไฟแนนซ์เดิม" value={fmt(data.closingAmount)} />
                </div>
                {data.notes && (
                  <div className="mt-4 flex flex-col gap-1">
                    <span className="text-xs text-text-tertiary">หมายเหตุ</span>
                    <p className="whitespace-pre-wrap text-sm text-text-primary">{data.notes}</p>
                  </div>
                )}
              </SubSection>

              {data.documents.length > 0 && (
                <SubSection label={`เอกสารที่แนบ (${data.documents.length} ไฟล์)`}>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {data.documents.map((doc, i) => (
                      <div key={i} className="overflow-hidden rounded-lg border border-border-default">
                        {doc.dataUrl ? (
                          <div className="aspect-square overflow-hidden bg-background-muted">
                            <img src={doc.dataUrl} alt={doc.name} className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div className="flex aspect-square items-center justify-center bg-background-muted text-text-tertiary">
                            <FileText className="h-8 w-8" />
                          </div>
                        )}
                        <div className="border-t border-border-default px-2 py-2">
                          <p className="truncate text-xs text-text-secondary" title={doc.name}>{doc.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </SubSection>
              )}

            </div>
          </SectionCard>

          {/* ── Actions ──────────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between pb-6">
            <Button variant="outline" onClick={() => router.push("/lead-pool/create")}>
              แก้ไข
            </Button>
            <Button
              onClick={() => setShowDialog(true)}
              className="bg-brand-blue text-text-on-brand hover:bg-brand-blue-hover"
            >
              ยืนยัน
            </Button>
          </div>

        </div>
      </div>

      {/* ── Confirmation Dialog ───────────────────────────────────────────────── */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Dialog>
            <DialogContent className="flex flex-col items-center gap-4 pt-8 pb-2 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-status-success-text">
                <CheckCircle2 className="h-8 w-8 text-text-on-brand" />
              </div>
              <div className="space-y-1">
                <DialogTitle>บันทึก Lead สำเร็จ</DialogTitle>
                <DialogDescription>ข้อมูล Lead ถูกบันทึกเข้าระบบเรียบร้อยแล้ว</DialogDescription>
              </div>
            </DialogContent>
            <DialogFooter className="justify-center">
              <Button
                onClick={handleConfirm}
                className="bg-brand-blue text-text-on-brand hover:bg-brand-blue-hover px-8"
              >
                กลับไปคลังลีด
              </Button>
            </DialogFooter>
          </Dialog>
        </div>
      )}
    </>
  )
}
