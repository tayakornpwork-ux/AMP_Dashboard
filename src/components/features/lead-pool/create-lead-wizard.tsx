"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X, Bike, Car, Truck, Tractor, MapPin, Landmark, MousePointerClick } from "lucide-react"
import { Card } from "@/components/shared/card/card"
import { Header } from "@/components/shared/header/header"
import { Button } from "@/components/shared/button/button"
import { Input } from "@/components/shared/input/input"
import { Textarea } from "@/components/shared/textarea/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shared/select/select"
import { cn } from "@/lib/utils"

// ── Types ─────────────────────────────────────────────────────────────────────

type LoanType = "motorcycle" | "car" | "truck" | "agriculture" | "land-pawn" | "land-mortgage"

interface FormData {
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
  collateralType: string
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
  requestAmount: string
  installmentAmount: string
  previousFinancer: string
  closingAmount: string
  notes: string
  documents: File[]
}

// ── Address data (province → district → subDistrict → postalCode) ─────────────

const ADDRESS_DATA: Record<string, Record<string, Record<string, string>>> = {
  "กรุงเทพมหานคร": {
    "เขตพระนคร": { "แขวงพระบรมมหาราชวัง": "10200", "แขวงวังบูรพาภิรมย์": "10200", "แขวงวัดราชบพิธ": "10200", "แขวงสำราญราษฎร์": "10200" },
    "เขตดุสิต": { "แขวงดุสิต": "10300", "แขวงวชิรพยาบาล": "10300", "แขวงสวนจิตรลดา": "10300", "แขวงสี่แยกมหานาค": "10300" },
    "เขตบางรัก": { "แขวงบางรัก": "10500", "แขวงมหาพฤฒาราม": "10500", "แขวงสีลม": "10500", "แขวงสุริยวงศ์": "10500" },
    "เขตปทุมวัน": { "แขวงปทุมวัน": "10330", "แขวงลุมพินี": "10330", "แขวงรองเมือง": "10330", "แขวงวังใหม่": "10330" },
    "เขตจตุจักร": { "แขวงจตุจักร": "10900", "แขวงเสนานิคม": "10900", "แขวงลาดยาว": "10900", "แขวงจันทรเกษม": "10900" },
    "เขตลาดพร้าว": { "แขวงลาดพร้าว": "10230", "แขวงจระเข้บัว": "10230" },
    "เขตบึงกุ่ม": { "แขวงคลองกุ่ม": "10240", "แขวงนวมินทร์": "10240", "แขวงนวลจันทร์": "10240" },
    "เขตบางเขน": { "แขวงอนุสาวรีย์": "10220", "แขวงท่าแร้ง": "10220" },
    "เขตห้วยขวาง": { "แขวงห้วยขวาง": "10310", "แขวงสามเสนนอก": "10310", "แขวงบางกะปิ": "10310" },
    "เขตวังทองหลาง": { "แขวงวังทองหลาง": "10310", "แขวงสะพานสอง": "10310", "แขวงคลองเจ้าคุณสิงห์": "10310", "แขวงพลับพลา": "10310" },
    "เขตมีนบุรี": { "แขวงมีนบุรี": "10510", "แขวงแสนแสบ": "10510" },
    "เขตลาดกระบัง": { "แขวงลาดกระบัง": "10520", "แขวงคลองสอง": "10520", "แขวงคลองสาม": "10520" },
    "เขตสาทร": { "แขวงทุ่งมหาเมฆ": "10120", "แขวงทุ่งวัดดอน": "10120", "แขวงยานนาวา": "10120" },
    "เขตยานนาวา": { "แขวงช่องนนทรี": "10120", "แขวงบางโพงพาง": "10120" },
    "เขตคลองสาน": { "แขวงคลองสาน": "10600", "แขวงบางลำภูล่าง": "10600", "แขวงสมเด็จเจ้าพระยา": "10600" },
    "เขตธนบุรี": { "แขวงตลาดพลู": "10600", "แขวงดาวคะนอง": "10600", "แขวงสำเหร่": "10600" },
    "เขตบางแค": { "แขวงบางแค": "10160", "แขวงบางแคเหนือ": "10160", "แขวงบางไผ่": "10160" },
    "เขตภาษีเจริญ": { "แขวงบางหว้า": "10160", "แขวงบางด้วน": "10160", "แขวงปากคลองภาษีเจริญ": "10160" },
  },
  "นนทบุรี": {
    "อำเภอเมืองนนทบุรี": { "ตำบลสวนใหญ่": "11000", "ตำบลตลาดขวัญ": "11000", "ตำบลบางเขน": "11000", "ตำบลบางกระสอ": "11000" },
    "อำเภอปากเกร็ด": { "ตำบลปากเกร็ด": "11120", "ตำบลบางตลาด": "11120", "ตำบลบ้านใหม่": "11120", "ตำบลบางพูด": "11120" },
    "อำเภอบางบัวทอง": { "ตำบลโสนลอย": "11110", "ตำบลบางบัวทอง": "11110", "ตำบลบางรักพัฒนา": "11110" },
    "อำเภอบางใหญ่": { "ตำบลบางม่วง": "11140", "ตำบลบางแม่นาง": "11140", "ตำบลบางเลน": "11140" },
  },
  "ปทุมธานี": {
    "อำเภอเมืองปทุมธานี": { "ตำบลบางปรอก": "12000", "ตำบลบ้านใหม่": "12000", "ตำบลบางหลวง": "12000" },
    "อำเภอธัญบุรี": { "ตำบลประชาธิปัตย์": "12130", "ตำบลบึงยี่โถ": "12130", "ตำบลรังสิต": "12110" },
    "อำเภอลำลูกกา": { "ตำบลลำลูกกา": "12150", "ตำบลลาดสวาย": "12150", "ตำบลบึงคำพร้อย": "12150" },
    "อำเภอคลองหลวง": { "ตำบลคลองหนึ่ง": "12120", "ตำบลคลองสอง": "12120", "ตำบลคลองสาม": "12120" },
  },
  "สมุทรปราการ": {
    "อำเภอเมืองสมุทรปราการ": { "ตำบลปากน้ำ": "10270", "ตำบลสำโรงเหนือ": "10270", "ตำบลบางเมือง": "10270" },
    "อำเภอบางพลี": { "ตำบลบางพลีใหญ่": "10540", "ตำบลบางแก้ว": "10540", "ตำบลบางปลา": "10540" },
    "อำเภอบางบ่อ": { "ตำบลบางบ่อ": "10560", "ตำบลบ้านระกาศ": "10560" },
  },
  "เชียงใหม่": {
    "อำเภอเมืองเชียงใหม่": { "ตำบลศรีภูมิ": "50200", "ตำบลพระสิงห์": "50200", "ตำบลช้างม่อย": "50300", "ตำบลช้างคลาน": "50100" },
    "อำเภอหางดง": { "ตำบลหางดง": "50230", "ตำบลบ้านแหวน": "50230", "ตำบลสบแม่ข่า": "50230" },
    "อำเภอสันทราย": { "ตำบลสันทรายหลวง": "50210", "ตำบลสันทรายน้อย": "50210", "ตำบลสันพระเนตร": "50210" },
    "อำเภอสันกำแพง": { "ตำบลสันกำแพง": "50130", "ตำบลทรายมูล": "50130", "ตำบลแช่ช้าง": "50130" },
  },
  "ขอนแก่น": {
    "อำเภอเมืองขอนแก่น": { "ตำบลในเมือง": "40000", "ตำบลสาวะถี": "40000", "ตำบลบ้านทุ่ม": "40000", "ตำบลเมืองเก่า": "40000" },
    "อำเภอบ้านไผ่": { "ตำบลบ้านไผ่": "40110", "ตำบลในเมือง": "40110", "ตำบลเมืองเพีย": "40110" },
    "อำเภอพระยืน": { "ตำบลพระยืน": "40320", "ตำบลพระบุ": "40320" },
  },
  "นครราชสีมา": {
    "อำเภอเมืองนครราชสีมา": { "ตำบลในเมือง": "30000", "ตำบลโพธิ์กลาง": "30000", "ตำบลหนองจะบก": "30000" },
    "อำเภอปากช่อง": { "ตำบลปากช่อง": "30130", "ตำบลกลางดง": "30130", "ตำบลจันทึก": "30130" },
    "อำเภอสูงเนิน": { "ตำบลสูงเนิน": "30170", "ตำบลเสมา": "30170" },
  },
  "ชลบุรี": {
    "อำเภอเมืองชลบุรี": { "ตำบลบางปลาสร้อย": "20000", "ตำบลมะขามหย่ง": "20000", "ตำบลบ้านโขด": "20000" },
    "อำเภอบางละมุง": { "ตำบลบางละมุง": "20150", "ตำบลหนองปรือ": "20150", "ตำบลนาเกลือ": "20150" },
    "อำเภอศรีราชา": { "ตำบลศรีราชา": "20110", "ตำบลสุรศักดิ์": "20110", "ตำบลทุ่งสุขลา": "20230" },
  },
  "ภูเก็ต": {
    "อำเภอเมืองภูเก็ต": { "ตำบลตลาดใหญ่": "83000", "ตำบลตลาดเหนือ": "83000", "ตำบลรัษฎา": "83000" },
    "อำเภอกะทู้": { "ตำบลกะทู้": "83120", "ตำบลป่าตอง": "83150", "ตำบลกมลา": "83150" },
    "อำเภอถลาง": { "ตำบลเทพกษัตรี": "83110", "ตำบลศรีสุนทร": "83110", "ตำบลเชิงทะเล": "83110" },
  },
  "อุดรธานี": {
    "อำเภอเมืองอุดรธานี": { "ตำบลหมากแข้ง": "41000", "ตำบลนิคมสงเคราะห์": "41000", "ตำบลบ้านขาว": "41000" },
    "อำเภอกุมภวาปี": { "ตำบลตูมใต้": "41110", "ตำบลพันดอน": "41370" },
  },
  "สงขลา": {
    "อำเภอเมืองสงขลา": { "ตำบลบ่อยาง": "90000", "ตำบลเขารูปช้าง": "90000", "ตำบลพะวง": "90100" },
    "อำเภอหาดใหญ่": { "ตำบลหาดใหญ่": "90110", "ตำบลคอหงส์": "90110", "ตำบลบ้านพรุ": "90250" },
  },
  "ระยอง": {
    "อำเภอเมืองระยอง": { "ตำบลท่าประดู่": "21000", "ตำบลเชิงเนิน": "21000", "ตำบลน้ำคอก": "21000" },
    "อำเภอบ้านฉาง": { "ตำบลบ้านฉาง": "21130", "ตำบลพลา": "21130" },
  },
  "เชียงราย": {
    "อำเภอเมืองเชียงราย": { "ตำบลเวียง": "57000", "ตำบลรอบเวียง": "57000", "ตำบลบ้านดู่": "57100" },
    "อำเภอแม่สาย": { "ตำบลแม่สาย": "57130", "ตำบลเกาะช้าง": "57130" },
  },
}

// ── Static data ───────────────────────────────────────────────────────────────

const PARTNERS = [
  { value: "partner-001", label: "บริษัท ABC จำกัด" },
  { value: "partner-002", label: "บริษัท XYZ จำกัด" },
  { value: "partner-003", label: "ห้างหุ้นส่วน DEF" },
  { value: "partner-004", label: "บริษัท GHI จำกัด (มหาชน)" },
  { value: "partner-005", label: "ร้าน JKL" },
]

const CAMPAIGN_CODES = [
  { value: "CAMP-2026-001", label: "CAMP-2026-001 — โปรโมชันต้นปี" },
  { value: "CAMP-2026-002", label: "CAMP-2026-002 — สงกรานต์สุขใจ" },
  { value: "CAMP-2026-003", label: "CAMP-2026-003 — ลดดอกเบี้ยพิเศษ" },
  { value: "CAMP-2026-004", label: "CAMP-2026-004 — ไตรมาส 2" },
  { value: "CAMP-2026-005", label: "CAMP-2026-005 — End of Year" },
]

const LEAD_CHANNELS = [
  { value: "qr-code", label: "QR Code" },
  { value: "agent", label: "Agent" },
  { value: "local-agent", label: "Local Agent" },
  { value: "affiliate", label: "Affiliate" },
  { value: "branch", label: "Branch" },
]

const EMPTY_FORM: FormData = {
  leadChannel: "", partner: "", campaignCode: "",
  idCard: "", firstName: "", lastName: "", monthlyIncome: "", phone: "",
  address: "", province: "", district: "", subDistrict: "", postalCode: "",
  loanType: "",
  collateralType: "", vehicleBrand: "", vehicleModel: "", vehicleYear: "",
  licensePlate: "", registrationProvince: "", redbookMin: "", redbookMax: "",
  landDeedType: "", landOffice: "", landAppraisalPrice: "",
  requestAmount: "", installmentAmount: "", previousFinancer: "",
  closingAmount: "", notes: "", documents: [],
}

const VEHICLE_BRANDS: Record<string, string[]> = {
  "Toyota": ["Camry", "Corolla Cross", "Fortuner", "Hilux Revo", "Yaris Ativ", "Vios", "CHR", "Alphard"],
  "Honda": ["Civic", "City", "HR-V", "CR-V", "Accord", "Jazz", "Brio", "WR-V"],
  "Isuzu": ["D-Max", "MU-X", "D-Max Hi-Lander", "D-Max Spark"],
}

const LOAN_TYPES: { id: LoanType; label: string; icon: React.ElementType }[] = [
  { id: "motorcycle", label: "รถจักรยานยนต์", icon: Bike },
  { id: "car", label: "รถยนต์", icon: Car },
  { id: "truck", label: "รถบรรทุก", icon: Truck },
  { id: "agriculture", label: "รถเพื่อการเกษตร", icon: Tractor },
  { id: "land-pawn", label: "ที่ดิน (จำนำ)", icon: MapPin },
  { id: "land-mortgage", label: "ที่ดิน (จำนอง)", icon: Landmark },
]

const PROVINCES = [
  "กรุงเทพมหานคร", "กระบี่", "กาญจนบุรี", "กาฬสินธุ์", "กำแพงเพชร",
  "ขอนแก่น", "จันทบุรี", "ฉะเชิงเทรา", "ชลบุรี", "ชัยนาท", "ชัยภูมิ",
  "ชุมพร", "เชียงราย", "เชียงใหม่", "ตรัง", "ตราด", "ตาก", "นครนายก",
  "นครปฐม", "นครพนม", "นครราชสีมา", "นครศรีธรรมราช", "นครสวรรค์",
  "นนทบุรี", "นราธิวาส", "น่าน", "บึงกาฬ", "บุรีรัมย์", "ปทุมธานี",
  "ประจวบคีรีขันธ์", "ปราจีนบุรี", "ปัตตานี", "พระนครศรีอยุธยา",
  "พะเยา", "พังงา", "พัทลุง", "พิจิตร", "พิษณุโลก", "เพชรบุรี",
  "เพชรบูรณ์", "แพร่", "ภูเก็ต", "มหาสารคาม", "มุกดาหาร", "แม่ฮ่องสอน",
  "ยโสธร", "ยะลา", "ร้อยเอ็ด", "ระนอง", "ระยอง", "ราชบุรี",
  "ลพบุรี", "ลำปาง", "ลำพูน", "เลย", "ศรีสะเกษ", "สกลนคร",
  "สงขลา", "สตูล", "สมุทรปราการ", "สมุทรสงคราม", "สมุทรสาคร",
  "สระแก้ว", "สระบุรี", "สิงห์บุรี", "สุโขทัย", "สุพรรณบุรี",
  "สุราษฎร์ธานี", "สุรินทร์", "หนองคาย", "หนองบัวลำภู", "อ่างทอง",
  "อำนาจเจริญ", "อุดรธานี", "อุตรดิตถ์", "อุทัยธานี", "อุบลราชธานี",
]

// ── Helpers ───────────────────────────────────────────────────────────────────

const isVehicle = (t: LoanType | "") => ["motorcycle", "car", "truck", "agriculture"].includes(t)
const isLand = (t: LoanType | "") => ["land-pawn", "land-mortgage"].includes(t)

// ── Sub-components ────────────────────────────────────────────────────────────

function StepHeader({ num, label, required }: { num: number; label: string; required?: boolean }) {
  return (
    <div className="-mx-6 -mt-6 mb-5 flex items-center gap-3 rounded-t-lg bg-brand-blue px-6 py-4 border-b border-border-default">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-xs font-bold text-text-primary">
        {num}
      </div>
      <span className="text-sm font-semibold text-text-on-brand">
        {label}{required && <span className="ml-1 text-brand-yellow">*</span>}
      </span>
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 border-b border-border-default pb-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">{children}</span>
    </div>
  )
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="text-sm font-medium text-text-primary">
      {children}{required && <span className="ml-1 text-status-error-text">*</span>}
    </label>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CreateLeadWizard() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>({ ...EMPTY_FORM })
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  function set<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function setErr(field: keyof FormData, msg: string) {
    setFieldErrors((prev) => ({ ...prev, [field]: msg }))
  }

  function clearErr(field: keyof FormData) {
    setFieldErrors((prev) => { const n = { ...prev }; delete n[field]; return n })
  }

  // ── Field validators ───────────────────────────────────────────────────────

  function handleIdCard(val: string) {
    if (!/^\d*$/.test(val)) { setErr("idCard", "กรอกได้เฉพาะตัวเลขเท่านั้น"); return }
    clearErr("idCard")
    set("idCard", val.slice(0, 13))
  }

  function handleName(field: "firstName" | "lastName", val: string) {
    if (/\d/.test(val)) { setErr(field, "กรอกได้เฉพาะตัวอักษรเท่านั้น"); return }
    clearErr(field)
    set(field, val)
  }

  function handleIncome(val: string) {
    if (!/^\d*$/.test(val)) { setErr("monthlyIncome", "กรอกได้เฉพาะตัวเลขเท่านั้น"); return }
    clearErr("monthlyIncome")
    set("monthlyIncome", val)
  }

  function handlePhone(val: string) {
    if (!/^\d*$/.test(val)) { setErr("phone", "กรอกได้เฉพาะตัวเลขเท่านั้น"); return }
    clearErr("phone")
    set("phone", val.slice(0, 10))
  }

  function handleVehicleYear(val: string) {
    if (!/^\d*$/.test(val)) { setErr("vehicleYear", "กรอกได้เฉพาะตัวเลขเท่านั้น"); return }
    clearErr("vehicleYear")
    set("vehicleYear", val.slice(0, 4))
  }

  // ── Address cascade ────────────────────────────────────────────────────────

  function handleProvinceChange(province: string) {
    setForm((prev) => ({ ...prev, province, district: "", subDistrict: "", postalCode: "" }))
  }

  function handleDistrictChange(district: string) {
    setForm((prev) => ({ ...prev, district, subDistrict: "", postalCode: "" }))
  }

  function handleVehicleBrandChange(brand: string) {
    setForm((prev) => ({ ...prev, vehicleBrand: brand, vehicleModel: "" }))
  }

  function handleSubDistrictChange(subDistrict: string) {
    const postalCode = ADDRESS_DATA[form.province]?.[form.district]?.[subDistrict] ?? ""
    setForm((prev) => ({ ...prev, subDistrict, postalCode }))
  }

  const districts = Object.keys(ADDRESS_DATA[form.province] ?? {})
  const subDistricts = Object.keys(ADDRESS_DATA[form.province]?.[form.district] ?? {})

  // ── Form validity ──────────────────────────────────────────────────────────

  const REQUIRED_FIELDS: (keyof FormData)[] = [
    "leadChannel", "partner",
    "idCard", "firstName", "lastName", "monthlyIncome", "phone",
    "address", "province", "district", "subDistrict", "postalCode",
    ...(isVehicle(form.loanType) ? [
      "vehicleBrand", "vehicleModel", "vehicleYear",
      "licensePlate", "registrationProvince", "redbookMin", "redbookMax",
    ] as (keyof FormData)[] : []),
    ...(isLand(form.loanType) ? [
      "landDeedType", "landOffice", "landAppraisalPrice",
    ] as (keyof FormData)[] : []),
  ]
  const isFormValid =
    REQUIRED_FIELDS.every((k) => String(form[k]).trim() !== "") &&
    !!form.loanType &&
    Object.keys(fieldErrors).length === 0

  async function handleSubmit() {
    if (!isFormValid) return
    const serializedDocs = await Promise.all(
      form.documents.map(async (file) => {
        if (file.type.startsWith("image/")) {
          return new Promise<{ name: string; type: string; dataUrl: string }>((resolve) => {
            const reader = new FileReader()
            reader.onload = (e) => resolve({ name: file.name, type: file.type, dataUrl: e.target?.result as string })
            reader.readAsDataURL(file)
          })
        }
        return { name: file.name, type: file.type }
      })
    )
    sessionStorage.setItem("lead-draft", JSON.stringify({ ...form, documents: serializedDocs }))
    router.push("/lead-pool/create/success")
  }

  function handleFiles(files: FileList | null) {
    if (!files) return
    set("documents", [...form.documents, ...Array.from(files)])
  }

  function removeFile(index: number) {
    set("documents", form.documents.filter((_, i) => i !== index))
  }

  return (
    <>
      <Header user={{ name: "อเล็กซ์ ริเวรา", role: "ผู้ดูแลระบบ", initials: "AR" }} />

      <div className="flex-1 overflow-auto bg-background-subtle p-4 lg:p-6">

        {/* Page title */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => router.push("/lead-pool")}
            className="flex items-center justify-center rounded-md p-2 text-text-secondary transition-colors hover:bg-background-muted hover:text-text-primary"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <p className="text-xs text-text-tertiary">คลังลีด</p>
            <h1 className="text-xl font-semibold text-brand-blue">สร้าง Lead</h1>
          </div>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">

          {/* ── Step 1: Lead Channel ─────────────────────────────────────────── */}
          <Card className="overflow-hidden border-border-default bg-background-default p-6 shadow-sm">
            <StepHeader num={1} label="Lead Channel" />
            <div className="space-y-5">
              <div className="flex flex-col gap-3">
                <FieldLabel required>ช่องทางรับ Lead</FieldLabel>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {LEAD_CHANNELS.map(({ value, label }) => (
                    <label key={value} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        name="leadChannel"
                        value={value}
                        checked={form.leadChannel === value}
                        onChange={() => set("leadChannel", value)}
                        className="h-4 w-4 accent-brand-blue cursor-pointer"
                      />
                      <span className="text-sm text-text-primary">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <FieldLabel required>พาร์ทเนอร์</FieldLabel>
                  <Select value={form.partner} onValueChange={(v) => set("partner", v)}>
                    <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="เลือกพาร์ทเนอร์" /></SelectTrigger>
                    <SelectContent>
                      {PARTNERS.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel>Campaign Code</FieldLabel>
                  <Select value={form.campaignCode} onValueChange={(v) => set("campaignCode", v)}>
                    <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="เลือก Campaign" /></SelectTrigger>
                    <SelectContent>
                      {CAMPAIGN_CODES.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          {/* ── Step 2: Customer profile ─────────────────────────────────────── */}
          <Card className="overflow-hidden border-border-default bg-background-default p-6 shadow-sm">
            <StepHeader num={2} label="ข้อมูลลูกค้า" />
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Input
                    label="เลขบัตรประชาชน" required
                    placeholder="1-XXXX-XXXXX-XX-X"
                    maxLength={13}
                    value={form.idCard}
                    error={!!fieldErrors.idCard}
                    helperText={fieldErrors.idCard}
                    onChange={(e) => handleIdCard(e.target.value)}
                  />
                </div>
                <Input
                  label="ชื่อ" required placeholder="ชื่อ"
                  value={form.firstName}
                  error={!!fieldErrors.firstName}
                  helperText={fieldErrors.firstName}
                  onChange={(e) => handleName("firstName", e.target.value)}
                />
                <Input
                  label="นามสกุล" required placeholder="นามสกุล"
                  value={form.lastName}
                  error={!!fieldErrors.lastName}
                  helperText={fieldErrors.lastName}
                  onChange={(e) => handleName("lastName", e.target.value)}
                />
                <Input
                  label="รายได้ต่อเดือน" required placeholder="0"
                  value={form.monthlyIncome}
                  error={!!fieldErrors.monthlyIncome}
                  helperText={fieldErrors.monthlyIncome}
                  onChange={(e) => handleIncome(e.target.value)}
                />
                <Input
                  label="เบอร์โทรศัพท์" required placeholder="08X-XXX-XXXX"
                  maxLength={10}
                  value={form.phone}
                  error={!!fieldErrors.phone}
                  helperText={fieldErrors.phone}
                  onChange={(e) => handlePhone(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Input label="ที่อยู่" required placeholder="บ้านเลขที่ หมู่ ซอย ถนน" value={form.address} onChange={(e) => set("address", e.target.value)} />
                </div>

                {/* จังหวัด (first) */}
                <div className="flex flex-col gap-2">
                  <FieldLabel required>จังหวัด</FieldLabel>
                  <Select value={form.province} onValueChange={handleProvinceChange}>
                    <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="เลือกจังหวัด" /></SelectTrigger>
                    <SelectContent>
                      {PROVINCES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {/* เขต/อำเภอ */}
                <div className="flex flex-col gap-2">
                  <FieldLabel required>เขต / อำเภอ</FieldLabel>
                  <Select value={form.district} onValueChange={handleDistrictChange} disabled={!form.province}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder={form.province ? "เลือกเขต/อำเภอ" : "เลือกจังหวัดก่อน"} />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.length > 0
                        ? districts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)
                        : <SelectItem value="-" disabled>ไม่มีข้อมูล</SelectItem>
                      }
                    </SelectContent>
                  </Select>
                </div>

                {/* แขวง/ตำบล */}
                <div className="flex flex-col gap-2">
                  <FieldLabel required>แขวง / ตำบล</FieldLabel>
                  <Select value={form.subDistrict} onValueChange={handleSubDistrictChange} disabled={!form.district}>
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder={form.district ? "เลือกแขวง/ตำบล" : "เลือกเขต/อำเภอก่อน"} />
                    </SelectTrigger>
                    <SelectContent>
                      {subDistricts.length > 0
                        ? subDistricts.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)
                        : <SelectItem value="-" disabled>ไม่มีข้อมูล</SelectItem>
                      }
                    </SelectContent>
                  </Select>
                </div>

                {/* รหัสไปรษณีย์ (auto-fill) */}
                <Input
                  label="รหัสไปรษณีย์" required
                  placeholder="—"
                  value={form.postalCode}
                  readOnly
                  className="bg-background-muted"
                />
              </div>
            </div>
          </Card>

          {/* ── Step 3: Loan type ────────────────────────────────────────────── */}
          <Card className="overflow-hidden border-border-default bg-background-default p-6 shadow-sm">
            <StepHeader num={3} label="เลือกหลักประกันสินเชื่อ" required />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {LOAN_TYPES.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => set("loanType", id)}
                  className={cn(
                    "flex flex-col items-center gap-3 rounded-lg border-2 px-4 py-5 text-sm font-medium transition-colors",
                    form.loanType === id
                      ? "border-brand-blue bg-brand-blue-subtle text-brand-blue"
                      : "border-border-default bg-background-default text-text-secondary hover:border-brand-blue hover:bg-brand-blue-subtle hover:text-brand-blue"
                  )}
                >
                  <Icon className="h-6 w-6" />
                  {label}
                </button>
              ))}
            </div>
          </Card>

          {/* ── Step 4: Loan details ─────────────────────────────────────────── */}
          <Card className="overflow-hidden border-border-default bg-background-default p-6 shadow-sm">
            <StepHeader num={4} label="ข้อมูลสินเชื่อ" />

            {!form.loanType ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background-muted text-text-tertiary">
                  <MousePointerClick className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-text-secondary">กรุณาเลือกประเภทหลักประกันสินเชื่อในขั้นตอนที่ 3 ก่อน</p>
                <p className="text-xs text-text-tertiary">ฟิลด์กรอกข้อมูลจะแสดงหลังจากเลือกประเภทหลักประกัน</p>
              </div>
            ) : (
              <div className="space-y-8">

                {isVehicle(form.loanType) && (
                  <div className="space-y-4">
                    <SectionHeading>ข้อมูลยานพาหนะ</SectionHeading>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <FieldLabel required>ยี่ห้อรถ</FieldLabel>
                        <Select value={form.vehicleBrand} onValueChange={handleVehicleBrandChange}>
                          <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="เลือกยี่ห้อรถ" /></SelectTrigger>
                          <SelectContent>
                            {Object.keys(VEHICLE_BRANDS).map((b) => (
                              <SelectItem key={b} value={b}>{b}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <FieldLabel required>รุ่นรถ</FieldLabel>
                        <Select value={form.vehicleModel} onValueChange={(v) => set("vehicleModel", v)} disabled={!form.vehicleBrand}>
                          <SelectTrigger className="h-9 text-sm">
                            <SelectValue placeholder={form.vehicleBrand ? "เลือกรุ่นรถ" : "เลือกยี่ห้อก่อน"} />
                          </SelectTrigger>
                          <SelectContent>
                            {(VEHICLE_BRANDS[form.vehicleBrand] ?? []).map((m) => (
                              <SelectItem key={m} value={m}>{m}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Input
                        label="ปีจดทะเบียนรถ" required placeholder="2567"
                        maxLength={4}
                        value={form.vehicleYear}
                        error={!!fieldErrors.vehicleYear}
                        helperText={fieldErrors.vehicleYear}
                        onChange={(e) => handleVehicleYear(e.target.value)}
                      />
                      <Input label="ทะเบียนรถ" required placeholder="กก 1234" value={form.licensePlate} onChange={(e) => set("licensePlate", e.target.value)} />
                      <div className="flex flex-col gap-2">
                        <FieldLabel required>จังหวัดที่จดทะเบียนรถ</FieldLabel>
                        <Select value={form.registrationProvince} onValueChange={(v) => set("registrationProvince", v)}>
                          <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="เลือกจังหวัด" /></SelectTrigger>
                          <SelectContent>
                            {PROVINCES.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2 flex flex-col gap-2">
                        <FieldLabel required>Range ราคา Redbook</FieldLabel>
                        <div className="flex items-center gap-2">
                          <Input required placeholder="ราคาต่ำสุด" type="number" value={form.redbookMin} onChange={(e) => set("redbookMin", e.target.value)} />
                          <span className="shrink-0 text-sm text-text-tertiary">—</span>
                          <Input required placeholder="ราคาสูงสุด" type="number" value={form.redbookMax} onChange={(e) => set("redbookMax", e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {isLand(form.loanType) && (
                  <div className="space-y-4">
                    <SectionHeading>ข้อมูลที่ดิน</SectionHeading>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <FieldLabel required>ประเภทโฉนดที่ดิน</FieldLabel>
                        <Select value={form.landDeedType} onValueChange={(v) => set("landDeedType", v)}>
                          <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="เลือกประเภทโฉนด" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ns4">น.ส. 4</SelectItem>
                            <SelectItem value="ns3k">น.ส. 3 ก.</SelectItem>
                            <SelectItem value="ns3">น.ส. 3 / 3 ข.</SelectItem>
                            <SelectItem value="spk401">ส.ป.ก. 4-01</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Input label="สำนักงานเขตที่ดิน" required placeholder="สำนักงานที่ดิน..." value={form.landOffice} onChange={(e) => set("landOffice", e.target.value)} />
                      <div className="md:col-span-2">
                        <Input label="ราคาประเมินที่ดิน" required placeholder="0" type="number" value={form.landAppraisalPrice} onChange={(e) => set("landAppraisalPrice", e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <SectionHeading>ข้อมูลสินเชื่อ</SectionHeading>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input label="จำนวนเงินที่ต้องการผ่อน (ต่องวด)" placeholder="0" type="number" value={form.installmentAmount} onChange={(e) => set("installmentAmount", e.target.value)} />
                    <Input label="สถาบันการเงินเดิม" placeholder="ธนาคาร / ไฟแนนซ์" value={form.previousFinancer} onChange={(e) => set("previousFinancer", e.target.value)} />
                    <Input label="ยอดปิดบัญชีไฟแนนซ์เดิม" placeholder="0" type="number" value={form.closingAmount} onChange={(e) => set("closingAmount", e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-primary">หมายเหตุ</label>
                    <Textarea placeholder="หมายเหตุเพิ่มเติม..." resize="vertical" value={form.notes} onChange={(e) => set("notes", e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-primary">อัปโหลดเอกสาร</label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border-default bg-background-subtle p-6 transition-colors hover:border-brand-blue hover:bg-brand-blue-subtle"
                    >
                      <Upload className="h-6 w-6 text-text-tertiary" />
                      <p className="text-sm text-text-secondary">คลิกเพื่อเลือกไฟล์</p>
                      <p className="text-xs text-text-tertiary">PDF, JPG, PNG ขนาดไม่เกิน 10MB</p>
                    </div>
                    <input ref={fileInputRef} type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
                    {form.documents.length > 0 && (
                      <ul className="mt-1 space-y-2">
                        {form.documents.map((file, i) => (
                          <li key={i} className="flex items-center justify-between rounded-md bg-background-subtle px-3 py-2">
                            <span className="truncate text-xs text-text-primary">{file.name}</span>
                            <button onClick={() => removeFile(i)} className="ml-2 shrink-0 text-text-tertiary transition-colors hover:text-status-error-text">
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

              </div>
            )}
          </Card>

          <div className="flex items-center justify-between pb-6">
            <Button variant="outline" onClick={() => router.push("/lead-pool")}>ยกเลิก</Button>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="bg-brand-blue text-text-on-brand hover:bg-brand-blue-hover disabled:opacity-40 disabled:cursor-not-allowed"
            >
              บันทึก Lead
            </Button>
          </div>

        </div>
      </div>
    </>
  )
}
