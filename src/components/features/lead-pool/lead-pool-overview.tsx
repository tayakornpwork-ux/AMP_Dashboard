"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, RotateCcw, SlidersHorizontal, Inbox, ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Card } from "@/components/shared/card/card"
import { Header } from "@/components/shared/header/header"
import { Badge } from "@/components/shared/badge/badge"
import { Button } from "@/components/shared/button/button"
import { Input } from "@/components/shared/input/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shared/select/select"
import { TableRow } from "@/components/shared/data-table/table-row"
import type { DataTableColumn } from "@/components/shared/data-table/data-table.types"
import { cn } from "@/lib/utils"

// ── Types ─────────────────────────────────────────────────────────────────────

type LeadStatus = "01" | "02" | "03" | "04"
type LeadSource = "online" | "branch" | "agent" | "affiliate" | "referral"

interface Lead {
  leadNo: string
  customerName: string
  requestAmount: number
  marketValue: number
  province: string
  leadSource: LeadSource
  leadStatus: LeadStatus
  createdDate: string
}

interface FilterState {
  leadNo: string
  createdDate: string
  leadStatus: string
}

// ── Static data ───────────────────────────────────────────────────────────────

const statusConfig: Record<LeadStatus, { label: string; variant: "warning" | "secondary" | "success" | "destructive" }> = {
  "01": { label: "รอรับงาน", variant: "warning" },
  "02": { label: "กำลังพิจารณา", variant: "secondary" },
  "03": { label: "อนุมัติแล้ว", variant: "success" },
  "04": { label: "ไม่อนุมัติ", variant: "destructive" },
}

const sourceConfig: Record<LeadSource, string> = {
  online: "ออนไลน์",
  branch: "สาขา",
  agent: "Agent",
  affiliate: "Affiliate",
  referral: "แนะนำเพื่อน",
}

const mockLeads: Lead[] = [
  // ── รอรับงาน (01) — บางกอก ──────────────────────────────────────────────────
  { leadNo: "LP260501001", customerName: "สมชาย ใจดี", requestAmount: 120000, marketValue: 135000, province: "กรุงเทพมหานคร", leadSource: "online", leadStatus: "01", createdDate: "2026-05-01" },
  { leadNo: "LP260501002", customerName: "วิภา รักเรียน", requestAmount: 250000, marketValue: 280000, province: "กรุงเทพมหานคร", leadSource: "agent", leadStatus: "03", createdDate: "2026-05-01" },
  { leadNo: "LP260501003", customerName: "ธนพล วงศ์ไทย", requestAmount: 85000, marketValue: 92000, province: "นนทบุรี", leadSource: "branch", leadStatus: "02", createdDate: "2026-05-01" },
  { leadNo: "LP260502001", customerName: "พิมพ์ใจ สุขศรี", requestAmount: 175000, marketValue: 190000, province: "ปทุมธานี", leadSource: "online", leadStatus: "01", createdDate: "2026-05-02" },
  { leadNo: "LP260502002", customerName: "กิตติ พงษ์พันธ์", requestAmount: 340000, marketValue: 370000, province: "กรุงเทพมหานคร", leadSource: "affiliate", leadStatus: "04", createdDate: "2026-05-02" },
  { leadNo: "LP260502003", customerName: "รัตนา เจริญสุข", requestAmount: 220000, marketValue: 245000, province: "สมุทรปราการ", leadSource: "referral", leadStatus: "02", createdDate: "2026-05-02" },
  { leadNo: "LP260503001", customerName: "ชัยณรงค์ บุญมา", requestAmount: 410000, marketValue: 440000, province: "กรุงเทพมหานคร", leadSource: "online", leadStatus: "03", createdDate: "2026-05-03" },
  { leadNo: "LP260503002", customerName: "สุดารัตน์ ทวีศักดิ์", requestAmount: 160000, marketValue: 178000, province: "นนทบุรี", leadSource: "branch", leadStatus: "01", createdDate: "2026-05-03" },
  { leadNo: "LP260503003", customerName: "อนุชา ประดิษฐ์", requestAmount: 290000, marketValue: 315000, province: "ปทุมธานี", leadSource: "agent", leadStatus: "02", createdDate: "2026-05-03" },
  { leadNo: "LP260504001", customerName: "ปิยะ มะลิวัลย์", requestAmount: 135000, marketValue: 150000, province: "กรุงเทพมหานคร", leadSource: "online", leadStatus: "03", createdDate: "2026-05-04" },
  { leadNo: "LP260504002", customerName: "ประสิทธิ์ มีสุข", requestAmount: 180000, marketValue: 195000, province: "เชียงใหม่", leadSource: "online", leadStatus: "01", createdDate: "2026-05-04" },
  { leadNo: "LP260504003", customerName: "เกียรติศักดิ์ โสภา", requestAmount: 520000, marketValue: 560000, province: "ขอนแก่น", leadSource: "agent", leadStatus: "04", createdDate: "2026-05-04" },
  { leadNo: "LP260505001", customerName: "ลลิตา หวังดี", requestAmount: 70000, marketValue: 80000, province: "อุดรธานี", leadSource: "branch", leadStatus: "02", createdDate: "2026-05-05" },
  { leadNo: "LP260505002", customerName: "สรวิชญ์ ดำรงค์", requestAmount: 380000, marketValue: 410000, province: "นครราชสีมา", leadSource: "referral", leadStatus: "01", createdDate: "2026-05-05" },
  { leadNo: "LP260505003", customerName: "นันทนา วัฒนพงศ์", requestAmount: 615000, marketValue: 650000, province: "ชลบุรี", leadSource: "online", leadStatus: "03", createdDate: "2026-05-05" },
  { leadNo: "LP260506001", customerName: "ธิดา ศรีสวัสดิ์", requestAmount: 240000, marketValue: 265000, province: "ภูเก็ต", leadSource: "affiliate", leadStatus: "02", createdDate: "2026-05-06" },
  { leadNo: "LP260506002", customerName: "วรวิทย์ แก้วใส", requestAmount: 490000, marketValue: 530000, province: "สงขลา", leadSource: "online", leadStatus: "01", createdDate: "2026-05-06" },
  { leadNo: "LP260507001", customerName: "อภิสรา ยิ้มแย้ม", requestAmount: 155000, marketValue: 170000, province: "เชียงราย", leadSource: "agent", leadStatus: "03", createdDate: "2026-05-07" },
  { leadNo: "LP260507002", customerName: "นพดล ศรีเมือง", requestAmount: 320000, marketValue: 350000, province: "ระยอง", leadSource: "branch", leadStatus: "04", createdDate: "2026-05-07" },
  { leadNo: "LP260508001", customerName: "ศิริพร นามสกุล", requestAmount: 195000, marketValue: 215000, province: "สุราษฎร์ธานี", leadSource: "online", leadStatus: "01", createdDate: "2026-05-08" },
  { leadNo: "LP260425001", customerName: "ธีรภัทร คงคา", requestAmount: 430000, marketValue: 460000, province: "กรุงเทพมหานคร", leadSource: "online", leadStatus: "02", createdDate: "2026-04-25" },
  { leadNo: "LP260426001", customerName: "นภัสสร ทองใบ", requestAmount: 275000, marketValue: 300000, province: "กรุงเทพมหานคร", leadSource: "agent", leadStatus: "01", createdDate: "2026-04-26" },
  { leadNo: "LP260427001", customerName: "วิชาญ รุ่งเรือง", requestAmount: 580000, marketValue: 620000, province: "นนทบุรี", leadSource: "branch", leadStatus: "03", createdDate: "2026-04-27" },
  { leadNo: "LP260428001", customerName: "ณัฐวุฒิ สุริยะ", requestAmount: 145000, marketValue: 160000, province: "ปทุมธานี", leadSource: "referral", leadStatus: "04", createdDate: "2026-04-28" },
  { leadNo: "LP260428002", customerName: "พรทิพย์ วิเศษ", requestAmount: 360000, marketValue: 390000, province: "สมุทรปราการ", leadSource: "online", leadStatus: "01", createdDate: "2026-04-28" },
  { leadNo: "LP260429001", customerName: "อรุณี พิมพ์ทอง", requestAmount: 480000, marketValue: 510000, province: "กรุงเทพมหานคร", leadSource: "affiliate", leadStatus: "02", createdDate: "2026-04-29" },
  { leadNo: "LP260430001", customerName: "จักรกฤษณ์ ดีมาก", requestAmount: 670000, marketValue: 710000, province: "กรุงเทพมหานคร", leadSource: "online", leadStatus: "03", createdDate: "2026-04-30" },
  { leadNo: "LP260430002", customerName: "จันทรา พรหมสุข", requestAmount: 95000, marketValue: 110000, province: "นนทบุรี", leadSource: "agent", leadStatus: "01", createdDate: "2026-04-30" },
  { leadNo: "LP260421001", customerName: "เพชรรัตน์ มังกร", requestAmount: 730000, marketValue: 780000, province: "เชียงใหม่", leadSource: "online", leadStatus: "02", createdDate: "2026-04-21" },
  { leadNo: "LP260422001", customerName: "ปรัชญา เกษตรกร", requestAmount: 265000, marketValue: 290000, province: "ขอนแก่น", leadSource: "branch", leadStatus: "04", createdDate: "2026-04-22" },
  { leadNo: "LP260422002", customerName: "สิริมา ชัยรัตน์", requestAmount: 390000, marketValue: 420000, province: "อุดรธานี", leadSource: "agent", leadStatus: "01", createdDate: "2026-04-22" },
  { leadNo: "LP260423001", customerName: "ประพันธ์ โชคดี", requestAmount: 830000, marketValue: 880000, province: "นครราชสีมา", leadSource: "referral", leadStatus: "03", createdDate: "2026-04-23" },
  { leadNo: "LP260423002", customerName: "วราภรณ์ สง่างาม", requestAmount: 155000, marketValue: 172000, province: "ชลบุรี", leadSource: "online", leadStatus: "02", createdDate: "2026-04-23" },
  { leadNo: "LP260424001", customerName: "ภาณุพงศ์ อ่อนละมัย", requestAmount: 920000, marketValue: 970000, province: "สงขลา", leadSource: "affiliate", leadStatus: "01", createdDate: "2026-04-24" },
  { leadNo: "LP260424002", customerName: "มานะ ทองดี", requestAmount: 210000, marketValue: 230000, province: "ภูเก็ต", leadSource: "online", leadStatus: "03", createdDate: "2026-04-24" },
  { leadNo: "LP260401001", customerName: "สุภาพ ดีงาม", requestAmount: 450000, marketValue: 480000, province: "กรุงเทพมหานคร", leadSource: "online", leadStatus: "04", createdDate: "2026-04-01" },
  { leadNo: "LP260402001", customerName: "เอกลักษณ์ ทรัพย์ดี", requestAmount: 310000, marketValue: 340000, province: "กรุงเทพมหานคร", leadSource: "agent", leadStatus: "01", createdDate: "2026-04-02" },
  { leadNo: "LP260403001", customerName: "พิชิต แสงทอง", requestAmount: 560000, marketValue: 595000, province: "นนทบุรี", leadSource: "branch", leadStatus: "02", createdDate: "2026-04-03" },
  { leadNo: "LP260404001", customerName: "จิราพร แจ่มใส", requestAmount: 195000, marketValue: 215000, province: "ปทุมธานี", leadSource: "online", leadStatus: "03", createdDate: "2026-04-04" },
  { leadNo: "LP260405001", customerName: "สมศักดิ์ บัวงาม", requestAmount: 720000, marketValue: 760000, province: "กรุงเทพมหานคร", leadSource: "affiliate", leadStatus: "01", createdDate: "2026-04-05" },
  { leadNo: "LP260406001", customerName: "มณฑา เหลืองอ่อน", requestAmount: 88000, marketValue: 97000, province: "สมุทรปราการ", leadSource: "referral", leadStatus: "04", createdDate: "2026-04-06" },
  { leadNo: "LP260407001", customerName: "ศักดา เพ็ชรพูล", requestAmount: 430000, marketValue: 460000, province: "กรุงเทพมหานคร", leadSource: "online", leadStatus: "02", createdDate: "2026-04-07" },
  { leadNo: "LP260408001", customerName: "นงลักษณ์ รุ่งโรจน์", requestAmount: 275000, marketValue: 300000, province: "นนทบุรี", leadSource: "agent", leadStatus: "01", createdDate: "2026-04-08" },
  { leadNo: "LP260320001", customerName: "กฤษณา อุดมสุข", requestAmount: 640000, marketValue: 680000, province: "เชียงใหม่", leadSource: "online", leadStatus: "03", createdDate: "2026-03-20" },
  { leadNo: "LP260321001", customerName: "ประยุทธ์ สมบูรณ์", requestAmount: 190000, marketValue: 210000, province: "ขอนแก่น", leadSource: "branch", leadStatus: "02", createdDate: "2026-03-21" },
  { leadNo: "LP260322001", customerName: "รุ่งนภา เกิดผล", requestAmount: 385000, marketValue: 415000, province: "อุดรธานี", leadSource: "agent", leadStatus: "04", createdDate: "2026-03-22" },
  { leadNo: "LP260323001", customerName: "อัศวิน คำหอม", requestAmount: 475000, marketValue: 505000, province: "นครราชสีมา", leadSource: "online", leadStatus: "01", createdDate: "2026-03-23" },
  { leadNo: "LP260324001", customerName: "สุนทร พลายงาม", requestAmount: 810000, marketValue: 860000, province: "ชลบุรี", leadSource: "referral", leadStatus: "03", createdDate: "2026-03-24" },
  { leadNo: "LP260325001", customerName: "พัชรินทร์ ขยัน", requestAmount: 340000, marketValue: 368000, province: "สงขลา", leadSource: "online", leadStatus: "02", createdDate: "2026-03-25" },
  { leadNo: "LP260301001", customerName: "กมลรัตน์ ก้าวหน้า", requestAmount: 580000, marketValue: 620000, province: "ระยอง", leadSource: "affiliate", leadStatus: "01", createdDate: "2026-03-01" },
  { leadNo: "LP260302001", customerName: "นิรันดร์ สดใส", requestAmount: 120000, marketValue: 133000, province: "สุราษฎร์ธานี", leadSource: "agent", leadStatus: "04", createdDate: "2026-03-02" },
  { leadNo: "LP260303001", customerName: "ปภาวิน ชื่นชอบ", requestAmount: 950000, marketValue: 995000, province: "กรุงเทพมหานคร", leadSource: "online", leadStatus: "02", createdDate: "2026-03-03" },
  { leadNo: "LP260304001", customerName: "วรรณวิสา ผลไม้", requestAmount: 285000, marketValue: 310000, province: "กรุงเทพมหานคร", leadSource: "agent", leadStatus: "03", createdDate: "2026-03-04" },
  { leadNo: "LP260305001", customerName: "ธงชัย สีขาว", requestAmount: 460000, marketValue: 490000, province: "นนทบุรี", leadSource: "branch", leadStatus: "01", createdDate: "2026-03-05" },
  { leadNo: "LP260306001", customerName: "สุมาลี ดาวดวง", requestAmount: 750000, marketValue: 800000, province: "เชียงใหม่", leadSource: "online", leadStatus: "02", createdDate: "2026-03-06" },
  { leadNo: "LP260307001", customerName: "บรรลือ ยิ่งยง", requestAmount: 325000, marketValue: 355000, province: "ขอนแก่น", leadSource: "referral", leadStatus: "04", createdDate: "2026-03-07" },
  { leadNo: "LP260308001", customerName: "เสาวนีย์ ใสใจ", requestAmount: 195000, marketValue: 215000, province: "นครราชสีมา", leadSource: "online", leadStatus: "01", createdDate: "2026-03-08" },
  { leadNo: "LP260309001", customerName: "พงษ์เทพ หยกแดง", requestAmount: 870000, marketValue: 920000, province: "ชลบุรี", leadSource: "agent", leadStatus: "03", createdDate: "2026-03-09" },
  { leadNo: "LP260310001", customerName: "อุไร ลมแล้ง", requestAmount: 155000, marketValue: 170000, province: "สงขลา", leadSource: "branch", leadStatus: "02", createdDate: "2026-03-10" },
  { leadNo: "LP260201001", customerName: "จเร บุญช่วย", requestAmount: 690000, marketValue: 730000, province: "กรุงเทพมหานคร", leadSource: "online", leadStatus: "01", createdDate: "2026-02-01" },
  { leadNo: "LP260202001", customerName: "มลิวัลย์ กล้าแกร่ง", requestAmount: 430000, marketValue: 460000, province: "กรุงเทพมหานคร", leadSource: "agent", leadStatus: "04", createdDate: "2026-02-02" },
  { leadNo: "LP260203001", customerName: "ศราวุธ เดินทาง", requestAmount: 285000, marketValue: 310000, province: "นนทบุรี", leadSource: "online", leadStatus: "02", createdDate: "2026-02-03" },
  { leadNo: "LP260204001", customerName: "ฐิตารีย์ ทะมัดมาก", requestAmount: 540000, marketValue: 575000, province: "ปทุมธานี", leadSource: "branch", leadStatus: "03", createdDate: "2026-02-04" },
  { leadNo: "LP260205001", customerName: "เจษฎาภรณ์ สายรุ้ง", requestAmount: 390000, marketValue: 420000, province: "เชียงใหม่", leadSource: "affiliate", leadStatus: "01", createdDate: "2026-02-05" },
  { leadNo: "LP260206001", customerName: "สมหมาย หมายดี", requestAmount: 625000, marketValue: 660000, province: "ขอนแก่น", leadSource: "online", leadStatus: "02", createdDate: "2026-02-06" },
  { leadNo: "LP260207001", customerName: "ปรียา งามพริ้ง", requestAmount: 480000, marketValue: 510000, province: "อุดรธานี", leadSource: "agent", leadStatus: "04", createdDate: "2026-02-07" },
  { leadNo: "LP260208001", customerName: "ธนาธร เหมาะดี", requestAmount: 760000, marketValue: 805000, province: "นครราชสีมา", leadSource: "online", leadStatus: "03", createdDate: "2026-02-08" },
  { leadNo: "LP260209001", customerName: "ลัดดา เบาบาง", requestAmount: 310000, marketValue: 338000, province: "ชลบุรี", leadSource: "referral", leadStatus: "01", createdDate: "2026-02-09" },
  { leadNo: "LP260210001", customerName: "สุพจน์ ดาวเด่น", requestAmount: 890000, marketValue: 940000, province: "สงขลา", leadSource: "online", leadStatus: "02", createdDate: "2026-02-10" },
  { leadNo: "LP260101001", customerName: "ชนะชัย เด่นดัง", requestAmount: 1200000, marketValue: 1260000, province: "กรุงเทพมหานคร", leadSource: "online", leadStatus: "03", createdDate: "2026-01-01" },
  { leadNo: "LP260102001", customerName: "กัลยา เงินทอง", requestAmount: 1500000, marketValue: 1580000, province: "กรุงเทพมหานคร", leadSource: "agent", leadStatus: "01", createdDate: "2026-01-02" },
  { leadNo: "LP260103001", customerName: "วิโรจน์ ใหญ่โต", requestAmount: 980000, marketValue: 1040000, province: "นนทบุรี", leadSource: "affiliate", leadStatus: "04", createdDate: "2026-01-03" },
  { leadNo: "LP260104001", customerName: "มาลินี เพาะปลูก", requestAmount: 1350000, marketValue: 1420000, province: "เชียงใหม่", leadSource: "online", leadStatus: "02", createdDate: "2026-01-04" },
  { leadNo: "LP260105001", customerName: "ณัฐพงษ์ มั่นคง", requestAmount: 2100000, marketValue: 2200000, province: "ขอนแก่น", leadSource: "branch", leadStatus: "03", createdDate: "2026-01-05" },
  { leadNo: "LP260106001", customerName: "กาญจนา เล็กน้อย", requestAmount: 45000, marketValue: 52000, province: "กรุงเทพมหานคร", leadSource: "online", leadStatus: "01", createdDate: "2026-01-06" },
  { leadNo: "LP260107001", customerName: "สุรศักดิ์ ริมทาง", requestAmount: 62000, marketValue: 71000, province: "สมุทรปราการ", leadSource: "agent", leadStatus: "02", createdDate: "2026-01-07" },
  { leadNo: "LP260108001", customerName: "อรวรรณ หนักแน่น", requestAmount: 38000, marketValue: 45000, province: "นนทบุรี", leadSource: "online", leadStatus: "04", createdDate: "2026-01-08" },
  { leadNo: "LP260109001", customerName: "ชำนาญ สมใจ", requestAmount: 55000, marketValue: 63000, province: "ปทุมธานี", leadSource: "branch", leadStatus: "03", createdDate: "2026-01-09" },
  { leadNo: "LP260110001", customerName: "ปัณณ์ ใจเย็น", requestAmount: 72000, marketValue: 82000, province: "กรุงเทพมหานคร", leadSource: "referral", leadStatus: "01", createdDate: "2026-01-10" },
  { leadNo: "LP260111001", customerName: "ไพบูลย์ เมืองเหนือ", requestAmount: 430000, marketValue: 460000, province: "เชียงราย", leadSource: "online", leadStatus: "02", createdDate: "2026-01-11" },
  { leadNo: "LP260112001", customerName: "ศิรินทร์ อีสาน", requestAmount: 285000, marketValue: 310000, province: "มหาสารคาม", leadSource: "agent", leadStatus: "03", createdDate: "2026-01-12" },
  { leadNo: "LP260113001", customerName: "ปรมินทร์ ใต้แดน", requestAmount: 660000, marketValue: 700000, province: "สงขลา", leadSource: "branch", leadStatus: "04", createdDate: "2026-01-13" },
  { leadNo: "LP260114001", customerName: "ชุติมา ตะวันออก", requestAmount: 520000, marketValue: 555000, province: "ระยอง", leadSource: "online", leadStatus: "01", createdDate: "2026-01-14" },
  { leadNo: "LP260115001", customerName: "ทรงวุฒิ แกร่งกล้า", requestAmount: 740000, marketValue: 785000, province: "จันทบุรี", leadSource: "affiliate", leadStatus: "02", createdDate: "2026-01-15" },
  { leadNo: "LP260116001", customerName: "อมรรัตน์ กระจ่าง", requestAmount: 390000, marketValue: 420000, province: "ตราด", leadSource: "online", leadStatus: "03", createdDate: "2026-01-16" },
  { leadNo: "LP260117001", customerName: "ศุภชัย เหล็กเพชร", requestAmount: 870000, marketValue: 920000, province: "สุราษฎร์ธานี", leadSource: "referral", leadStatus: "01", createdDate: "2026-01-17" },
  { leadNo: "LP260118001", customerName: "วิลาวัณย์ อ่อนหวาน", requestAmount: 310000, marketValue: 338000, province: "นครศรีธรรมราช", leadSource: "online", leadStatus: "04", createdDate: "2026-01-18" },
  { leadNo: "LP260119001", customerName: "สุขสันต์ มีความสุข", requestAmount: 480000, marketValue: 510000, province: "กระบี่", leadSource: "agent", leadStatus: "02", createdDate: "2026-01-19" },
  { leadNo: "LP260120001", customerName: "บุษยา ดอกบัว", requestAmount: 235000, marketValue: 258000, province: "ตรัง", leadSource: "online", leadStatus: "03", createdDate: "2026-01-20" },
  { leadNo: "LP260121001", customerName: "ดำรงค์ ยืนยง", requestAmount: 580000, marketValue: 615000, province: "พัทลุง", leadSource: "branch", leadStatus: "01", createdDate: "2026-01-21" },
  { leadNo: "LP260122001", customerName: "มยุรา ผีเสื้อ", requestAmount: 415000, marketValue: 445000, province: "สตูล", leadSource: "online", leadStatus: "02", createdDate: "2026-01-22" },
  { leadNo: "LP260123001", customerName: "ณัฐนนท์ เพียรพยาม", requestAmount: 650000, marketValue: 690000, province: "ปัตตานี", leadSource: "agent", leadStatus: "04", createdDate: "2026-01-23" },
  { leadNo: "LP260124001", customerName: "สำราญ สงบงาม", requestAmount: 295000, marketValue: 320000, province: "ยะลา", leadSource: "online", leadStatus: "01", createdDate: "2026-01-24" },
  { leadNo: "LP260125001", customerName: "ฉัตรชัย พิทักษ์", requestAmount: 920000, marketValue: 970000, province: "นราธิวาส", leadSource: "referral", leadStatus: "03", createdDate: "2026-01-25" },
  { leadNo: "LP260126001", customerName: "กัญญาวีร์ งดงาม", requestAmount: 740000, marketValue: 785000, province: "พิษณุโลก", leadSource: "online", leadStatus: "02", createdDate: "2026-01-26" },
  { leadNo: "LP260127001", customerName: "อธิพัชร์ ก้องโลก", requestAmount: 1100000, marketValue: 1160000, province: "กำแพงเพชร", leadSource: "agent", leadStatus: "01", createdDate: "2026-01-27" },
  { leadNo: "LP260128001", customerName: "สุกัญญา ร่มเย็น", requestAmount: 480000, marketValue: 510000, province: "สุโขทัย", leadSource: "branch", leadStatus: "04", createdDate: "2026-01-28" },
  { leadNo: "LP260129001", customerName: "โชคดี วาสนา", requestAmount: 350000, marketValue: 378000, province: "อุตรดิตถ์", leadSource: "online", leadStatus: "03", createdDate: "2026-01-29" },
  { leadNo: "LP260130001", customerName: "ยุพาพร สว่างใจ", requestAmount: 265000, marketValue: 290000, province: "แพร่", leadSource: "affiliate", leadStatus: "02", createdDate: "2026-01-30" },
]



const EMPTY_FILTER: FilterState = {
  leadNo: "",
  createdDate: "",
  leadStatus: "",
}

// ── Column definition ─────────────────────────────────────────────────────────

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100, 200]

const SORTABLE_KEYS = new Set<string>(["leadNo", "customerName", "requestAmount", "marketValue", "leadStatus", "createdDate", "openDays"])

const columns: DataTableColumn<Lead>[] = [
  {
    key: "leadNo",
    label: "หมายเลข Lead",
    className: "w-[138px] shrink-0",
    render: (l) => <span className="text-xs text-text-primary">{l.leadNo}</span>,
  },
  {
    key: "customerName",
    label: "ชื่อลูกค้า",
    className: "flex-1 min-w-0",
    render: (l) => <span className="truncate text-sm font-medium text-text-primary">{l.customerName}</span>,
  },
  {
    key: "requestAmount",
    label: "วงเงินที่ลูกค้าต้องการ",
    className: "w-[150px] shrink-0 text-right",
    render: (l) => <span className="text-sm text-text-primary">฿{l.requestAmount.toLocaleString("th-TH")}</span>,
  },
  {
    key: "marketValue",
    label: "ราคากลาง",
    className: "w-[110px] shrink-0 text-right",
    render: (l) => <span className="text-sm text-text-secondary">฿{l.marketValue.toLocaleString("th-TH")}</span>,
  },
  {
    key: "leadStatus",
    label: "สถานะ Lead",
    className: "w-[130px] shrink-0",
    render: (l) => {
      const { label, variant } = statusConfig[l.leadStatus]
      return <Badge variant={variant}>{label}</Badge>
    },
  },
  {
    key: "createdDate",
    label: "วันที่สร้าง",
    className: "w-[100px] shrink-0",
    render: (l) => <span className="text-xs text-text-secondary">{formatDate(l.createdDate)}</span>,
  },
  {
    key: "openDays",
    label: "จำนวนวันที่เปิด Lead",
    className: "w-[148px] shrink-0 text-right",
    render: (l) => {
      const days = calcOpenDays(l.createdDate)
      return (
        <span className={cn("text-xs", days > 30 ? "text-status-error-text" : "text-text-primary")}>
          {days} วัน
        </span>
      )
    },
  },
  {
    key: "_claim",
    label: "Claim Task",
    className: "w-[108px] shrink-0",
    render: (l) => l.leadStatus === "01" ? (
      <Button size="sm" variant="outline" className="h-7">
        Claim
      </Button>
    ) : null,
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-")
  const bYear = parseInt(y) + 543
  return `${d}/${m}/${bYear}`
}

function sortData(leads: Lead[], key: string | null, dir: "asc" | "desc"): Lead[] {
  if (!key) return leads
  return [...leads].sort((a, b) => {
    const av = key === "openDays" ? calcOpenDays(a.createdDate) : (a[key as keyof Lead] ?? "")
    const bv = key === "openDays" ? calcOpenDays(b.createdDate) : (b[key as keyof Lead] ?? "")
    const cmp = av < bv ? -1 : av > bv ? 1 : 0
    return dir === "asc" ? cmp : -cmp
  })
}

function applyFilters(leads: Lead[], f: FilterState): Lead[] {
  return leads.filter((l) => {
    if (f.leadNo && !l.leadNo.toLowerCase().includes(f.leadNo.toLowerCase())) return false
    if (f.createdDate && l.createdDate !== f.createdDate) return false
    if (f.leadStatus && l.leadStatus !== f.leadStatus) return false
    return true
  })
}

function calcOpenDays(createdDate: string): number {
  const created = new Date(createdDate)
  const today = new Date("2026-05-12")
  return Math.floor((today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
}

function getMinDate(): string {
  const d = new Date("2026-05-12")
  d.setDate(d.getDate() - 30)
  return d.toISOString().split("T")[0]
}

// ── Component ─────────────────────────────────────────────────────────────────

export function LeadPoolOverview() {
  const router = useRouter()
  const [draft, setDraft] = useState<FilterState>(EMPTY_FILTER)
  const [applied, setApplied] = useState<FilterState>(EMPTY_FILTER)
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filteredData = applyFilters(mockLeads, applied)
  const sortedData = sortData(filteredData, sortKey, sortDir)
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize))
  const pagedData = sortedData.slice((page - 1) * pageSize, page * pageSize)
  const activeFilterCount = Object.values(applied).filter(Boolean).length

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
    setPage(1)
  }

  function handleSearch() {
    setApplied(draft)
    setPage(1)
  }

  function handleReset() {
    setDraft(EMPTY_FILTER)
    setApplied(EMPTY_FILTER)
    setPage(1)
  }

  return (
    <>
      <Header user={{ name: "อเล็กซ์ ริเวรา", role: "ผู้ดูแลระบบ", initials: "AR" }} />

      <div className="flex-1 space-y-6 overflow-auto p-4 lg:p-6">

        {/* Page title */}
        <div className="flex items-start justify-between gap-4">
          <div>
          <h1 className="text-2xl font-semibold text-text-primary">
            คลังลีด
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            รายการ Lead ทั้งหมดในระบบ — อัปเดตล่าสุด {formatDate("2026-05-12")}
          </p>
          </div>
          <Button onClick={() => router.push('/lead-pool/create')} className="shrink-0 gap-2 bg-brand-blue text-text-on-brand hover:bg-brand-blue-hover">
            <Plus className="h-4 w-4" />
            สร้าง Lead
          </Button>
        </div>

        {/* ── Filter section ─────────────────────────────────────────────────── */}
        <Card className="relative border-border-default p-5">
          <div className="absolute inset-y-0 left-0 w-1 rounded-l-lg bg-brand-yellow" />

          {/* Filter header */}
          <div className="mb-4 flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-text-secondary" />
            <span className="text-sm font-semibold text-text-primary">ตัวกรอง</span>
            {activeFilterCount > 0 && (
              <Badge className="bg-brand-yellow text-brand-yellow-text">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Lead No. */}
            <Input
              label="หมายเลข Lead"
              size="sm"
              placeholder="LP260501001"
              value={draft.leadNo}
              onChange={(e) => setDraft((p) => ({ ...p, leadNo: e.target.value }))}
            />

            {/* Created Date — จำกัดไม่เกิน 30 วันย้อนหลัง */}
            <Input
              label="วันที่สร้าง"
              size="sm"
              type="date"
              min={getMinDate()}
              max="2026-05-12"
              value={draft.createdDate}
              onChange={(e) => setDraft((p) => ({ ...p, createdDate: e.target.value }))}
            />

            {/* Lead Status */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-primary">สถานะ</label>
              <Select
                value={draft.leadStatus}
                onValueChange={(v) => setDraft((p) => ({ ...p, leadStatus: v === "all" ? "" : v }))}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="ทั้งหมด" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="01">รอรับงาน</SelectItem>
                  <SelectItem value="02">กำลังพิจารณา</SelectItem>
                  <SelectItem value="03">อนุมัติแล้ว</SelectItem>
                  <SelectItem value="04">ไม่อนุมัติ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={handleReset}>
              <RotateCcw className="h-3.5 w-3.5" />
              รีเซ็ต
            </Button>
            <Button size="sm" className="gap-2 bg-brand-blue text-text-on-brand hover:bg-brand-blue-hover" onClick={handleSearch}>
              <Search className="h-3.5 w-3.5" />
              ค้นหา
            </Button>
          </div>
        </Card>

        {/* ── Data table ─────────────────────────────────────────────────────── */}
        <div className="space-y-3">

          {/* Result count */}
          <p className="text-sm text-text-secondary">
            พบ{" "}
            <span className="font-semibold text-brand-blue">{filteredData.length}</span>
            {" "}จาก{" "}
            <span className="font-semibold text-text-primary">{mockLeads.length}</span>
            {" "}รายการ
          </p>

          {filteredData.length === 0 ? (
            <Card className="items-center justify-center gap-3 border-border-default py-16">
              <Inbox className="h-10 w-10 text-text-tertiary" />
              <div className="text-center">
                <p className="text-sm font-medium text-text-primary">ไม่พบรายการ</p>
                <p className="mt-1 text-xs text-text-tertiary">ลองปรับเงื่อนไขการค้นหาแล้วกด "ค้นหา" อีกครั้ง</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleReset}>ล้างตัวกรอง</Button>
            </Card>
          ) : (
            <>
              {/* Sortable table — header is inline element (candidate for shared/data-table) */}
              <div className="overflow-x-auto">
              <div className="min-w-max rounded-lg border border-border-default bg-background-default">

                {/* Sort header */}
                <div className="flex items-center gap-4 px-5 py-3">
                  {columns.map((col) => {
                    const sortable = SORTABLE_KEYS.has(col.key)
                    const isSorted = sortKey === col.key
                    const SortIcon = isSorted
                      ? sortDir === "asc" ? ChevronUp : ChevronDown
                      : ChevronsUpDown
                    return (
                      <button
                        key={col.key}
                        onClick={() => sortable && handleSort(col.key)}
                        className={cn(
                          "flex items-center gap-1 text-xs font-semibold uppercase tracking-wider",
                          col.className,
                          sortable ? "transition-colors" : "cursor-default",
                          isSorted ? "text-brand-blue" : "text-text-tertiary hover:text-text-secondary"
                        )}
                      >
                        {col.label}
                        {sortable && <SortIcon className="h-3 w-3 shrink-0" />}
                      </button>
                    )
                  })}
                </div>

                {/* Rows */}
                {pagedData.map((lead) => (
                  <TableRow
                    key={lead.leadNo}
                    cells={columns.map((col) => ({
                      key: col.key,
                      className: col.className,
                      content: col.render(lead),
                    }))}
                  />
                ))}
              </div>
              </div>

              {/* Pagination — inline element (candidate for shared/pagination) */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-tertiary">แสดง</span>
                  <Select
                    value={String(pageSize)}
                    onValueChange={(v) => { setPageSize(Number(v)); setPage(1) }}
                  >
                    <SelectTrigger className="h-8 w-20 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PAGE_SIZE_OPTIONS.map((n) => (
                        <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-xs text-text-tertiary">จาก {filteredData.length} รายการ</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Button
                      key={p}
                      variant="outline"
                      size="sm"
                      className={cn(
                        "h-8 w-8 p-0 text-xs",
                        p === page && "border-brand-blue bg-brand-blue text-text-on-brand hover:bg-brand-blue-hover"
                      )}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </>
  )
}
