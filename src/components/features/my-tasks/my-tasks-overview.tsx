"use client"

import { useState } from "react"
import { Search, RotateCcw, SlidersHorizontal, Inbox, ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight } from "lucide-react"
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

type LeadStatus = "01" | "02" | "03"
type TaskType = "agent" | "sale" | "branch"

interface Task {
  leadNo: string
  customerName: string
  requestAmount: number
  marketValue: number
  // รหัสพนักงาน display rules (by taskType):
  //   agent  → "-" เมื่อยังไม่ส่งสาขา (status 01 | 02)
  //   sale   → "-" เมื่อยังไม่ส่งสาขา หรือ New Lead (status 01 | 02)
  //   branch → "-" เมื่อ lead สร้างโดยสาขาเอง (Local Agent / Affiliate)
  branchStaffId: string
  branchName: string
  branchCode: string
  taskType: TaskType
  leadStatus: LeadStatus
  createdDate: string
  updatedDate: string
  toBranchDate: string | null
}

interface FilterState {
  leadNo: string
  createdDate: string
  leadStatus: string
  branchCode: string
  toBranchDate: string
}

// ── Static data ───────────────────────────────────────────────────────────────

const statusConfig: Record<LeadStatus, { label: string; variant: "warning" | "secondary" | "success" }> = {
  "01": { label: "ลีดใหม่", variant: "warning" },
  "02": { label: "กำลังดำเนินการ", variant: "secondary" },
  "03": { label: "ส่งสาขาแล้ว", variant: "success" },
}

const mockTasks: Task[] = [
  // ── agent — ยังไม่ส่งสาขา (01/02) ─────────────────────────────────────────
  { leadNo: "AMP260501001", customerName: "สมชาย ใจดี", requestAmount: 120000, marketValue: 135000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "01", createdDate: "2026-05-01", updatedDate: "2026-05-01", toBranchDate: null },
  { leadNo: "AMP260501002", customerName: "วิภา รักเรียน", requestAmount: 250000, marketValue: 280000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "02", createdDate: "2026-05-01", updatedDate: "2026-05-02", toBranchDate: null },
  { leadNo: "AMP260502001", customerName: "ธนพล วงศ์ไทย", requestAmount: 85000, marketValue: 92000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "01", createdDate: "2026-05-02", updatedDate: "2026-05-02", toBranchDate: null },
  { leadNo: "AMP260502002", customerName: "พิมพ์ใจ สุขศรี", requestAmount: 175000, marketValue: 190000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "02", createdDate: "2026-05-02", updatedDate: "2026-05-03", toBranchDate: null },
  { leadNo: "AMP260503001", customerName: "กิตติ พงษ์พันธ์", requestAmount: 340000, marketValue: 370000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "01", createdDate: "2026-05-03", updatedDate: "2026-05-03", toBranchDate: null },
  { leadNo: "AMP260503002", customerName: "รัตนา เจริญสุข", requestAmount: 220000, marketValue: 245000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "02", createdDate: "2026-05-03", updatedDate: "2026-05-04", toBranchDate: null },
  { leadNo: "AMP260504001", customerName: "ชัยณรงค์ บุญมา", requestAmount: 410000, marketValue: 440000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "01", createdDate: "2026-05-04", updatedDate: "2026-05-04", toBranchDate: null },
  { leadNo: "AMP260504002", customerName: "สุดารัตน์ ทวีศักดิ์", requestAmount: 160000, marketValue: 178000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "02", createdDate: "2026-05-04", updatedDate: "2026-05-05", toBranchDate: null },
  { leadNo: "AMP260505001", customerName: "อนุชา ประดิษฐ์", requestAmount: 290000, marketValue: 315000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "01", createdDate: "2026-05-05", updatedDate: "2026-05-05", toBranchDate: null },
  { leadNo: "AMP260505002", customerName: "ปิยะ มะลิวัลย์", requestAmount: 135000, marketValue: 150000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "02", createdDate: "2026-05-05", updatedDate: "2026-05-06", toBranchDate: null },
  // ── agent — ส่งสาขาแล้ว (03) ────────────────────────────────────────────────
  { leadNo: "AMP260428001", customerName: "ประสิทธิ์ มีสุข", requestAmount: 180000, marketValue: 195000, branchStaffId: "EMP0042", branchName: "สาขาสีลม", branchCode: "BKK001", taskType: "agent", leadStatus: "03", createdDate: "2026-04-28", updatedDate: "2026-04-30", toBranchDate: "2026-04-30" },
  { leadNo: "AMP260420001", customerName: "เกียรติศักดิ์ โสภา", requestAmount: 520000, marketValue: 560000, branchStaffId: "EMP0055", branchName: "สาขาพระราม 9", branchCode: "BKK004", taskType: "agent", leadStatus: "03", createdDate: "2026-04-20", updatedDate: "2026-04-23", toBranchDate: "2026-04-23" },
  { leadNo: "AMP260421001", customerName: "ลลิตา หวังดี", requestAmount: 70000, marketValue: 80000, branchStaffId: "EMP0061", branchName: "สาขาลาดพร้าว", branchCode: "BKK005", taskType: "agent", leadStatus: "03", createdDate: "2026-04-21", updatedDate: "2026-04-24", toBranchDate: "2026-04-24" },
  { leadNo: "AMP260422001", customerName: "สรวิชญ์ ดำรงค์", requestAmount: 380000, marketValue: 410000, branchStaffId: "EMP0033", branchName: "สาขาอ่อนนุช", branchCode: "BKK006", taskType: "agent", leadStatus: "03", createdDate: "2026-04-22", updatedDate: "2026-04-25", toBranchDate: "2026-04-25" },
  { leadNo: "AMP260423001", customerName: "นันทนา วัฒนพงศ์", requestAmount: 615000, marketValue: 650000, branchStaffId: "EMP0077", branchName: "สาขาบางแค", branchCode: "BKK007", taskType: "agent", leadStatus: "03", createdDate: "2026-04-23", updatedDate: "2026-04-26", toBranchDate: "2026-04-26" },
  { leadNo: "AMP260424001", customerName: "ธิดา ศรีสวัสดิ์", requestAmount: 240000, marketValue: 265000, branchStaffId: "EMP0089", branchName: "สาขาพัฒนาการ", branchCode: "BKK008", taskType: "agent", leadStatus: "03", createdDate: "2026-04-24", updatedDate: "2026-04-27", toBranchDate: "2026-04-27" },
  { leadNo: "AMP260415001", customerName: "วรวิทย์ แก้วใส", requestAmount: 490000, marketValue: 530000, branchStaffId: "EMP0012", branchName: "สาขาพระโขนง", branchCode: "BKK009", taskType: "agent", leadStatus: "03", createdDate: "2026-04-15", updatedDate: "2026-04-18", toBranchDate: "2026-04-18" },
  { leadNo: "AMP260416001", customerName: "อภิสรา ยิ้มแย้ม", requestAmount: 155000, marketValue: 170000, branchStaffId: "EMP0025", branchName: "สาขาบางรัก", branchCode: "BKK010", taskType: "agent", leadStatus: "03", createdDate: "2026-04-16", updatedDate: "2026-04-19", toBranchDate: "2026-04-19" },
  // ── sale — New Lead / กำลังดำเนินการ (01/02) ────────────────────────────────
  { leadNo: "AMP260430001", customerName: "นพดล ศรีเมือง", requestAmount: 320000, marketValue: 350000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "01", createdDate: "2026-04-30", updatedDate: "2026-05-01", toBranchDate: null },
  { leadNo: "AMP260501003", customerName: "ศิริพร นามสกุล", requestAmount: 195000, marketValue: 215000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "01", createdDate: "2026-05-01", updatedDate: "2026-05-01", toBranchDate: null },
  { leadNo: "AMP260502003", customerName: "ธีรภัทร คงคา", requestAmount: 430000, marketValue: 460000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "02", createdDate: "2026-05-02", updatedDate: "2026-05-03", toBranchDate: null },
  { leadNo: "AMP260503003", customerName: "นภัสสร ทองใบ", requestAmount: 275000, marketValue: 300000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "01", createdDate: "2026-05-03", updatedDate: "2026-05-03", toBranchDate: null },
  { leadNo: "AMP260504003", customerName: "วิชาญ รุ่งเรือง", requestAmount: 580000, marketValue: 620000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "02", createdDate: "2026-05-04", updatedDate: "2026-05-05", toBranchDate: null },
  { leadNo: "AMP260505003", customerName: "ณัฐวุฒิ สุริยะ", requestAmount: 145000, marketValue: 160000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "01", createdDate: "2026-05-05", updatedDate: "2026-05-05", toBranchDate: null },
  { leadNo: "AMP260506001", customerName: "พรทิพย์ วิเศษ", requestAmount: 360000, marketValue: 390000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "02", createdDate: "2026-05-06", updatedDate: "2026-05-07", toBranchDate: null },
  { leadNo: "AMP260507001", customerName: "อรุณี พิมพ์ทอง", requestAmount: 480000, marketValue: 510000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "01", createdDate: "2026-05-07", updatedDate: "2026-05-07", toBranchDate: null },
  { leadNo: "AMP260508001", customerName: "จักรกฤษณ์ ดีมาก", requestAmount: 670000, marketValue: 710000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "02", createdDate: "2026-05-08", updatedDate: "2026-05-09", toBranchDate: null },
  // ── sale — ส่งสาขาแล้ว (03) ──────────────────────────────────────────────────
  { leadNo: "AMP260425001", customerName: "จันทรา พรหมสุข", requestAmount: 95000, marketValue: 110000, branchStaffId: "EMP0018", branchName: "สาขาอโศก", branchCode: "BKK002", taskType: "sale", leadStatus: "03", createdDate: "2026-04-25", updatedDate: "2026-04-28", toBranchDate: "2026-04-28" },
  { leadNo: "AMP260410001", customerName: "เพชรรัตน์ มังกร", requestAmount: 730000, marketValue: 780000, branchStaffId: "EMP0091", branchName: "สาขาศรีนครินทร์", branchCode: "SMK001", taskType: "sale", leadStatus: "03", createdDate: "2026-04-10", updatedDate: "2026-04-14", toBranchDate: "2026-04-14" },
  { leadNo: "AMP260411001", customerName: "ปรัชญา เกษตรกร", requestAmount: 265000, marketValue: 290000, branchStaffId: "EMP0048", branchName: "สาขาเมืองทอง", branchCode: "NTB001", taskType: "sale", leadStatus: "03", createdDate: "2026-04-11", updatedDate: "2026-04-15", toBranchDate: "2026-04-15" },
  { leadNo: "AMP260412001", customerName: "สิริมา ชัยรัตน์", requestAmount: 390000, marketValue: 420000, branchStaffId: "EMP0063", branchName: "สาขาปากเกร็ด", branchCode: "NTB002", taskType: "sale", leadStatus: "03", createdDate: "2026-04-12", updatedDate: "2026-04-16", toBranchDate: "2026-04-16" },
  { leadNo: "AMP260413001", customerName: "ประพันธ์ โชคดี", requestAmount: 830000, marketValue: 880000, branchStaffId: "EMP0037", branchName: "สาขาพระปิ่น", branchCode: "AYT001", taskType: "sale", leadStatus: "03", createdDate: "2026-04-13", updatedDate: "2026-04-17", toBranchDate: "2026-04-17" },
  { leadNo: "AMP260414001", customerName: "วราภรณ์ สง่างาม", requestAmount: 155000, marketValue: 172000, branchStaffId: "EMP0022", branchName: "สาขาสมุทรสาคร", branchCode: "SKN001", taskType: "sale", leadStatus: "03", createdDate: "2026-04-14", updatedDate: "2026-04-18", toBranchDate: "2026-04-18" },
  { leadNo: "AMP260401001", customerName: "ภาณุพงศ์ อ่อนละมัย", requestAmount: 920000, marketValue: 970000, branchStaffId: "EMP0079", branchName: "สาขาชลบุรี", branchCode: "CBI001", taskType: "sale", leadStatus: "03", createdDate: "2026-04-01", updatedDate: "2026-04-05", toBranchDate: "2026-04-05" },
  // ── branch — Local Agent (branchStaffId: "-") ────────────────────────────────
  { leadNo: "AMP260429001", customerName: "มานะ ทองดี", requestAmount: 210000, marketValue: 230000, branchStaffId: "-", branchName: "สาขารังสิต", branchCode: "PTM001", taskType: "branch", leadStatus: "01", createdDate: "2026-04-29", updatedDate: "2026-04-29", toBranchDate: null },
  { leadNo: "AMP260430002", customerName: "สุภาพ ดีงาม", requestAmount: 450000, marketValue: 480000, branchStaffId: "-", branchName: "สาขาบางนา", branchCode: "BKK003", taskType: "branch", leadStatus: "02", createdDate: "2026-04-30", updatedDate: "2026-04-30", toBranchDate: null },
  { leadNo: "AMP260501004", customerName: "เอกลักษณ์ ทรัพย์ดี", requestAmount: 310000, marketValue: 340000, branchStaffId: "-", branchName: "สาขาบางใหญ่", branchCode: "NTB003", taskType: "branch", leadStatus: "01", createdDate: "2026-05-01", updatedDate: "2026-05-01", toBranchDate: null },
  { leadNo: "AMP260502004", customerName: "พิชิต แสงทอง", requestAmount: 560000, marketValue: 595000, branchStaffId: "-", branchName: "สาขาสมุทรปราการ", branchCode: "SPK001", taskType: "branch", leadStatus: "02", createdDate: "2026-05-02", updatedDate: "2026-05-03", toBranchDate: null },
  { leadNo: "AMP260503004", customerName: "จิราพร แจ่มใส", requestAmount: 195000, marketValue: 215000, branchStaffId: "-", branchName: "สาขาพัทยา", branchCode: "CBI002", taskType: "branch", leadStatus: "01", createdDate: "2026-05-03", updatedDate: "2026-05-03", toBranchDate: null },
  { leadNo: "AMP260504004", customerName: "สมศักดิ์ บัวงาม", requestAmount: 720000, marketValue: 760000, branchStaffId: "-", branchName: "สาขาขอนแก่น", branchCode: "KKN001", taskType: "branch", leadStatus: "02", createdDate: "2026-05-04", updatedDate: "2026-05-05", toBranchDate: null },
  { leadNo: "AMP260505004", customerName: "มณฑา เหลืองอ่อน", requestAmount: 88000, marketValue: 97000, branchStaffId: "-", branchName: "สาขาอุดรธานี", branchCode: "UDN001", taskType: "branch", leadStatus: "01", createdDate: "2026-05-05", updatedDate: "2026-05-05", toBranchDate: null },
  { leadNo: "AMP260506002", customerName: "ศักดา เพ็ชรพูล", requestAmount: 430000, marketValue: 460000, branchStaffId: "-", branchName: "สาขาเชียงใหม่", branchCode: "CNX001", taskType: "branch", leadStatus: "02", createdDate: "2026-05-06", updatedDate: "2026-05-07", toBranchDate: null },
  { leadNo: "AMP260507002", customerName: "นงลักษณ์ รุ่งโรจน์", requestAmount: 275000, marketValue: 300000, branchStaffId: "-", branchName: "สาขาเชียงราย", branchCode: "CRY001", taskType: "branch", leadStatus: "01", createdDate: "2026-05-07", updatedDate: "2026-05-07", toBranchDate: null },
  { leadNo: "AMP260508002", customerName: "กฤษณา อุดมสุข", requestAmount: 640000, marketValue: 680000, branchStaffId: "-", branchName: "สาขาหาดใหญ่", branchCode: "SKA001", taskType: "branch", leadStatus: "02", createdDate: "2026-05-08", updatedDate: "2026-05-09", toBranchDate: null },
  { leadNo: "AMP260509001", customerName: "ประยุทธ์ สมบูรณ์", requestAmount: 190000, marketValue: 210000, branchStaffId: "-", branchName: "สาขาภูเก็ต", branchCode: "HKT001", taskType: "branch", leadStatus: "01", createdDate: "2026-05-09", updatedDate: "2026-05-09", toBranchDate: null },
  { leadNo: "AMP260510001", customerName: "รุ่งนภา เกิดผล", requestAmount: 385000, marketValue: 415000, branchStaffId: "-", branchName: "สาขาสุราษฎร์ธานี", branchCode: "SNI001", taskType: "branch", leadStatus: "02", createdDate: "2026-05-10", updatedDate: "2026-05-11", toBranchDate: null },
  // ── branch — Affiliate ส่งสาขาแล้ว (03) ─────────────────────────────────────
  { leadNo: "AMP260418001", customerName: "อัศวิน คำหอม", requestAmount: 475000, marketValue: 505000, branchStaffId: "EMP0099", branchName: "สาขาสระบุรี", branchCode: "SBR001", taskType: "branch", leadStatus: "03", createdDate: "2026-04-18", updatedDate: "2026-04-21", toBranchDate: "2026-04-21" },
  { leadNo: "AMP260419001", customerName: "สุนทร พลายงาม", requestAmount: 810000, marketValue: 860000, branchStaffId: "EMP0115", branchName: "สาขานครราชสีมา", branchCode: "KRT001", taskType: "branch", leadStatus: "03", createdDate: "2026-04-19", updatedDate: "2026-04-22", toBranchDate: "2026-04-22" },
  { leadNo: "AMP260405001", customerName: "พัชรินทร์ ขยัน", requestAmount: 340000, marketValue: 368000, branchStaffId: "EMP0028", branchName: "สาขาลพบุรี", branchCode: "LBR001", taskType: "branch", leadStatus: "03", createdDate: "2026-04-05", updatedDate: "2026-04-08", toBranchDate: "2026-04-08" },
  { leadNo: "AMP260406001", customerName: "กมลรัตน์ ก้าวหน้า", requestAmount: 580000, marketValue: 620000, branchStaffId: "EMP0044", branchName: "สาขาอยุธยา", branchCode: "AYT002", taskType: "branch", leadStatus: "03", createdDate: "2026-04-06", updatedDate: "2026-04-09", toBranchDate: "2026-04-09" },
  { leadNo: "AMP260407001", customerName: "นิรันดร์ สดใส", requestAmount: 120000, marketValue: 133000, branchStaffId: "EMP0067", branchName: "สาขากาญจนบุรี", branchCode: "KAN001", taskType: "branch", leadStatus: "03", createdDate: "2026-04-07", updatedDate: "2026-04-10", toBranchDate: "2026-04-10" },
  { leadNo: "AMP260408001", customerName: "ปภาวิน ชื่นชอบ", requestAmount: 950000, marketValue: 995000, branchStaffId: "EMP0082", branchName: "สาขาราชบุรี", branchCode: "RBR001", taskType: "branch", leadStatus: "03", createdDate: "2026-04-08", updatedDate: "2026-04-11", toBranchDate: "2026-04-11" },
  // ── mixed batch 2 — agent ────────────────────────────────────────────────────
  { leadNo: "AMP260401002", customerName: "วรรณวิสา ผลไม้", requestAmount: 285000, marketValue: 310000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "01", createdDate: "2026-04-01", updatedDate: "2026-04-01", toBranchDate: null },
  { leadNo: "AMP260402001", customerName: "ธงชัย สีขาว", requestAmount: 460000, marketValue: 490000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "02", createdDate: "2026-04-02", updatedDate: "2026-04-03", toBranchDate: null },
  { leadNo: "AMP260403001", customerName: "สุมาลี ดาวดวง", requestAmount: 750000, marketValue: 800000, branchStaffId: "EMP0130", branchName: "สาขาตลิ่งชัน", branchCode: "BKK011", taskType: "agent", leadStatus: "03", createdDate: "2026-04-03", updatedDate: "2026-04-06", toBranchDate: "2026-04-06" },
  { leadNo: "AMP260404001", customerName: "บรรลือ ยิ่งยง", requestAmount: 325000, marketValue: 355000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "01", createdDate: "2026-04-04", updatedDate: "2026-04-04", toBranchDate: null },
  { leadNo: "AMP260404002", customerName: "เสาวนีย์ ใสใจ", requestAmount: 195000, marketValue: 215000, branchStaffId: "EMP0144", branchName: "สาขาราษฎร์บูรณะ", branchCode: "BKK012", taskType: "agent", leadStatus: "03", createdDate: "2026-04-04", updatedDate: "2026-04-07", toBranchDate: "2026-04-07" },
  // ── mixed batch 3 — sale ─────────────────────────────────────────────────────
  { leadNo: "AMP260326001", customerName: "พงษ์เทพ หยกแดง", requestAmount: 870000, marketValue: 920000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "01", createdDate: "2026-03-26", updatedDate: "2026-03-26", toBranchDate: null },
  { leadNo: "AMP260327001", customerName: "อุไร ลมแล้ง", requestAmount: 155000, marketValue: 170000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "02", createdDate: "2026-03-27", updatedDate: "2026-03-28", toBranchDate: null },
  { leadNo: "AMP260328001", customerName: "จเร บุญช่วย", requestAmount: 690000, marketValue: 730000, branchStaffId: "EMP0158", branchName: "สาขาดอนเมือง", branchCode: "BKK013", taskType: "sale", leadStatus: "03", createdDate: "2026-03-28", updatedDate: "2026-04-01", toBranchDate: "2026-04-01" },
  { leadNo: "AMP260329001", customerName: "มลิวัลย์ กล้าแกร่ง", requestAmount: 430000, marketValue: 460000, branchStaffId: "EMP0162", branchName: "สาขาบางเขน", branchCode: "BKK014", taskType: "sale", leadStatus: "03", createdDate: "2026-03-29", updatedDate: "2026-04-02", toBranchDate: "2026-04-02" },
  { leadNo: "AMP260330001", customerName: "ศราวุธ เดินทาง", requestAmount: 285000, marketValue: 310000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "02", createdDate: "2026-03-30", updatedDate: "2026-03-31", toBranchDate: null },
  { leadNo: "AMP260331001", customerName: "ฐิตารีย์ ทะมัดมาก", requestAmount: 540000, marketValue: 575000, branchStaffId: "EMP0175", branchName: "สาขามีนบุรี", branchCode: "BKK015", taskType: "sale", leadStatus: "03", createdDate: "2026-03-31", updatedDate: "2026-04-03", toBranchDate: "2026-04-03" },
  // ── mixed batch 4 — branch variety ──────────────────────────────────────────
  { leadNo: "AMP260315001", customerName: "เจษฎาภรณ์ สายรุ้ง", requestAmount: 390000, marketValue: 420000, branchStaffId: "-", branchName: "สาขานนทบุรี", branchCode: "NTB004", taskType: "branch", leadStatus: "01", createdDate: "2026-03-15", updatedDate: "2026-03-15", toBranchDate: null },
  { leadNo: "AMP260316001", customerName: "สมหมาย หมายดี", requestAmount: 625000, marketValue: 660000, branchStaffId: "-", branchName: "สาขาปทุมธานี", branchCode: "PTN001", taskType: "branch", leadStatus: "02", createdDate: "2026-03-16", updatedDate: "2026-03-17", toBranchDate: null },
  { leadNo: "AMP260317001", customerName: "ปรียา งามพริ้ง", requestAmount: 480000, marketValue: 510000, branchStaffId: "EMP0189", branchName: "สาขาสุพรรณบุรี", branchCode: "SPB001", taskType: "branch", leadStatus: "03", createdDate: "2026-03-17", updatedDate: "2026-03-20", toBranchDate: "2026-03-20" },
  { leadNo: "AMP260318001", customerName: "ธนาธร เหมาะดี", requestAmount: 760000, marketValue: 805000, branchStaffId: "EMP0193", branchName: "สาขาสิงห์บุรี", branchCode: "SNB001", taskType: "branch", leadStatus: "03", createdDate: "2026-03-18", updatedDate: "2026-03-21", toBranchDate: "2026-03-21" },
  { leadNo: "AMP260319001", customerName: "ลัดดา เบาบาง", requestAmount: 310000, marketValue: 338000, branchStaffId: "-", branchName: "สาขาอ่างทอง", branchCode: "ATG001", taskType: "branch", leadStatus: "01", createdDate: "2026-03-19", updatedDate: "2026-03-19", toBranchDate: null },
  { leadNo: "AMP260320001", customerName: "สุพจน์ ดาวเด่น", requestAmount: 890000, marketValue: 940000, branchStaffId: "EMP0207", branchName: "สาขานครสวรรค์", branchCode: "NSW001", taskType: "branch", leadStatus: "03", createdDate: "2026-03-20", updatedDate: "2026-03-23", toBranchDate: "2026-03-23" },
  // ── batch 5 — high-value leads ───────────────────────────────────────────────
  { leadNo: "AMP260301001", customerName: "ชนะชัย เด่นดัง", requestAmount: 1200000, marketValue: 1260000, branchStaffId: "EMP0211", branchName: "สาขาสาทร", branchCode: "BKK016", taskType: "sale", leadStatus: "03", createdDate: "2026-03-01", updatedDate: "2026-03-05", toBranchDate: "2026-03-05" },
  { leadNo: "AMP260302001", customerName: "กัลยา เงินทอง", requestAmount: 1500000, marketValue: 1580000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "02", createdDate: "2026-03-02", updatedDate: "2026-03-03", toBranchDate: null },
  { leadNo: "AMP260303001", customerName: "วิโรจน์ ใหญ่โต", requestAmount: 980000, marketValue: 1040000, branchStaffId: "EMP0225", branchName: "สาขาสุขุมวิท", branchCode: "BKK017", taskType: "agent", leadStatus: "03", createdDate: "2026-03-03", updatedDate: "2026-03-07", toBranchDate: "2026-03-07" },
  { leadNo: "AMP260304001", customerName: "มาลินี เพาะปลูก", requestAmount: 1350000, marketValue: 1420000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "01", createdDate: "2026-03-04", updatedDate: "2026-03-04", toBranchDate: null },
  { leadNo: "AMP260305001", customerName: "ณัฐพงษ์ มั่นคง", requestAmount: 2100000, marketValue: 2200000, branchStaffId: "EMP0238", branchName: "สาขาวิภาวดี", branchCode: "BKK018", taskType: "branch", leadStatus: "03", createdDate: "2026-03-05", updatedDate: "2026-03-09", toBranchDate: "2026-03-09" },
  // ── batch 6 — small / micro loans ────────────────────────────────────────────
  { leadNo: "AMP260511001", customerName: "กาญจนา เล็กน้อย", requestAmount: 45000, marketValue: 52000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "01", createdDate: "2026-05-11", updatedDate: "2026-05-11", toBranchDate: null },
  { leadNo: "AMP260511002", customerName: "สุรศักดิ์ ริมทาง", requestAmount: 62000, marketValue: 71000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "01", createdDate: "2026-05-11", updatedDate: "2026-05-11", toBranchDate: null },
  { leadNo: "AMP260511003", customerName: "อรวรรณ หนักแน่น", requestAmount: 38000, marketValue: 45000, branchStaffId: "-", branchName: "สาขาบึงกุ่ม", branchCode: "BKK019", taskType: "branch", leadStatus: "02", createdDate: "2026-05-11", updatedDate: "2026-05-12", toBranchDate: null },
  { leadNo: "AMP260512001", customerName: "ชำนาญ สมใจ", requestAmount: 55000, marketValue: 63000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "01", createdDate: "2026-05-12", updatedDate: "2026-05-12", toBranchDate: null },
  { leadNo: "AMP260512002", customerName: "ปัณณ์ ใจเย็น", requestAmount: 72000, marketValue: 82000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "02", createdDate: "2026-05-12", updatedDate: "2026-05-12", toBranchDate: null },
  // ── batch 7 — multi-region ────────────────────────────────────────────────────
  { leadNo: "AMP260201001", customerName: "ไพบูลย์ เมืองเหนือ", requestAmount: 430000, marketValue: 460000, branchStaffId: "EMP0251", branchName: "สาขาลำปาง", branchCode: "LPG001", taskType: "sale", leadStatus: "03", createdDate: "2026-02-01", updatedDate: "2026-02-05", toBranchDate: "2026-02-05" },
  { leadNo: "AMP260202001", customerName: "ศิรินทร์ อีสาน", requestAmount: 285000, marketValue: 310000, branchStaffId: "EMP0264", branchName: "สาขามหาสารคาม", branchCode: "MKM001", taskType: "branch", leadStatus: "03", createdDate: "2026-02-02", updatedDate: "2026-02-06", toBranchDate: "2026-02-06" },
  { leadNo: "AMP260203001", customerName: "ปรมินทร์ ใต้แดน", requestAmount: 660000, marketValue: 700000, branchStaffId: "EMP0278", branchName: "สาขาสงขลา", branchCode: "SKA002", taskType: "agent", leadStatus: "03", createdDate: "2026-02-03", updatedDate: "2026-02-07", toBranchDate: "2026-02-07" },
  { leadNo: "AMP260204001", customerName: "ชุติมา ตะวันออก", requestAmount: 520000, marketValue: 555000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "02", createdDate: "2026-02-04", updatedDate: "2026-02-05", toBranchDate: null },
  { leadNo: "AMP260205001", customerName: "ทรงวุฒิ แกร่งกล้า", requestAmount: 740000, marketValue: 785000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "01", createdDate: "2026-02-05", updatedDate: "2026-02-05", toBranchDate: null },
  { leadNo: "AMP260206001", customerName: "อมรรัตน์ กระจ่าง", requestAmount: 390000, marketValue: 420000, branchStaffId: "-", branchName: "สาขาระยอง", branchCode: "RYG001", taskType: "branch", leadStatus: "01", createdDate: "2026-02-06", updatedDate: "2026-02-06", toBranchDate: null },
  { leadNo: "AMP260207001", customerName: "ศุภชัย เหล็กเพชร", requestAmount: 870000, marketValue: 920000, branchStaffId: "EMP0292", branchName: "สาขาจันทบุรี", branchCode: "CTB001", taskType: "branch", leadStatus: "03", createdDate: "2026-02-07", updatedDate: "2026-02-11", toBranchDate: "2026-02-11" },
  { leadNo: "AMP260208001", customerName: "วิลาวัณย์ อ่อนหวาน", requestAmount: 310000, marketValue: 338000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "01", createdDate: "2026-02-08", updatedDate: "2026-02-08", toBranchDate: null },
  { leadNo: "AMP260209001", customerName: "สุขสันต์ มีความสุข", requestAmount: 480000, marketValue: 510000, branchStaffId: "EMP0305", branchName: "สาขาตราด", branchCode: "TRT001", taskType: "agent", leadStatus: "03", createdDate: "2026-02-09", updatedDate: "2026-02-13", toBranchDate: "2026-02-13" },
  { leadNo: "AMP260210001", customerName: "บุษยา ดอกบัว", requestAmount: 235000, marketValue: 258000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "02", createdDate: "2026-02-10", updatedDate: "2026-02-11", toBranchDate: null },
  { leadNo: "AMP260101001", customerName: "ดำรงค์ ยืนยง", requestAmount: 580000, marketValue: 615000, branchStaffId: "EMP0319", branchName: "สาขาน่าน", branchCode: "NAN001", taskType: "sale", leadStatus: "03", createdDate: "2026-01-01", updatedDate: "2026-01-05", toBranchDate: "2026-01-05" },
  { leadNo: "AMP260102001", customerName: "มยุรา ผีเสื้อ", requestAmount: 415000, marketValue: 445000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "01", createdDate: "2026-01-02", updatedDate: "2026-01-02", toBranchDate: null },
  { leadNo: "AMP260103001", customerName: "ณัฐนนท์ เพียรพยาม", requestAmount: 650000, marketValue: 690000, branchStaffId: "EMP0332", branchName: "สาขาแพร่", branchCode: "PRE001", taskType: "branch", leadStatus: "03", createdDate: "2026-01-03", updatedDate: "2026-01-07", toBranchDate: "2026-01-07" },
  { leadNo: "AMP260104001", customerName: "สำราญ สงบงาม", requestAmount: 295000, marketValue: 320000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "sale", leadStatus: "02", createdDate: "2026-01-04", updatedDate: "2026-01-05", toBranchDate: null },
  { leadNo: "AMP260105001", customerName: "ฉัตรชัย พิทักษ์", requestAmount: 920000, marketValue: 970000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "01", createdDate: "2026-01-05", updatedDate: "2026-01-05", toBranchDate: null },
  { leadNo: "AMP260106001", customerName: "กัญญาวีร์ งดงาม", requestAmount: 740000, marketValue: 785000, branchStaffId: "EMP0346", branchName: "สาขาอุตรดิตถ์", branchCode: "UTD001", taskType: "branch", leadStatus: "03", createdDate: "2026-01-06", updatedDate: "2026-01-10", toBranchDate: "2026-01-10" },
  { leadNo: "AMP260107001", customerName: "อธิพัชร์ ก้องโลก", requestAmount: 1100000, marketValue: 1160000, branchStaffId: "EMP0359", branchName: "สาขาพิษณุโลก", branchCode: "PLK001", taskType: "sale", leadStatus: "03", createdDate: "2026-01-07", updatedDate: "2026-01-11", toBranchDate: "2026-01-11" },
  { leadNo: "AMP260108001", customerName: "สุกัญญา ร่มเย็น", requestAmount: 480000, marketValue: 510000, branchStaffId: "-", branchName: "-", branchCode: "-", taskType: "agent", leadStatus: "02", createdDate: "2026-01-08", updatedDate: "2026-01-09", toBranchDate: null },
  { leadNo: "AMP260109001", customerName: "โชคดี วาสนา", requestAmount: 350000, marketValue: 378000, branchStaffId: "-", branchName: "สาขาเพชรบูรณ์", branchCode: "PBN001", taskType: "branch", leadStatus: "01", createdDate: "2026-01-09", updatedDate: "2026-01-09", toBranchDate: null },
  { leadNo: "AMP260110001", customerName: "ยุพาพร สว่างใจ", requestAmount: 265000, marketValue: 290000, branchStaffId: "EMP0372", branchName: "สาขาเพชรบุรี", branchCode: "PBI001", taskType: "sale", leadStatus: "03", createdDate: "2026-01-10", updatedDate: "2026-01-14", toBranchDate: "2026-01-14" },
]

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100, 200]

const EMPTY_FILTER: FilterState = {
  leadNo: "",
  createdDate: "",
  leadStatus: "",
  branchCode: "",
  toBranchDate: "",
}

// ── Column definition ─────────────────────────────────────────────────────────

const columns: DataTableColumn<Task>[] = [
  {
    key: "leadNo",
    label: "หมายเลข Lead",
    className: "w-[138px] shrink-0",
    render: (t) => <span className="text-xs text-text-primary">{t.leadNo}</span>,
  },
  {
    key: "customerName",
    label: "ชื่อลูกค้า",
    className: "flex-1 min-w-0",
    render: (t) => <span className="truncate text-sm font-medium text-text-primary">{t.customerName}</span>,
  },
  {
    key: "requestAmount",
    label: "วงเงินที่ลูกค้าต้องการ",
    className: "w-[140px] shrink-0 text-right",
    render: (t) => <span className="text-sm text-text-primary">฿{t.requestAmount.toLocaleString("th-TH")}</span>,
  },
  {
    key: "marketValue",
    label: "ราคากลาง",
    className: "w-[110px] shrink-0 text-right",
    render: (t) => <span className="text-sm text-text-secondary">฿{t.marketValue.toLocaleString("th-TH")}</span>,
  },
  {
    key: "branchStaffId",
    label: "รหัสพนักงาน",
    className: "w-[108px] shrink-0",
    render: (t) => (
      <span className={cn("text-xs", t.branchStaffId === "-" ? "text-text-tertiary" : "text-text-primary")}>
        {t.branchStaffId}
      </span>
    ),
  },
  {
    key: "branchName",
    label: "สาขา",
    className: "w-[120px] shrink-0",
    render: (t) => (
      <span className={cn("text-sm", t.branchName === "-" ? "text-text-tertiary" : "text-text-primary")}>
        {t.branchName}
      </span>
    ),
  },
  {
    key: "leadStatus",
    label: "สถานะ Lead",
    className: "w-[130px] shrink-0",
    render: (t) => {
      const { label, variant } = statusConfig[t.leadStatus]
      return <Badge variant={variant}>{label}</Badge>
    },
  },
  {
    key: "createdDate",
    label: "วันที่สร้าง",
    className: "w-[100px] shrink-0",
    render: (t) => <span className="text-xs text-text-secondary">{formatDate(t.createdDate)}</span>,
  },
  {
    key: "updatedDate",
    label: "วันที่แก้ไขล่าสุด",
    className: "w-[120px] shrink-0",
    render: (t) => <span className="text-xs text-text-secondary">{formatDate(t.updatedDate)}</span>,
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-")
  const bYear = parseInt(y) + 543
  return `${d}/${m}/${bYear}`
}

function sortData(tasks: Task[], key: keyof Task | null, dir: "asc" | "desc"): Task[] {
  if (!key) return tasks
  return [...tasks].sort((a, b) => {
    const av = a[key] ?? ""
    const bv = b[key] ?? ""
    const cmp = av < bv ? -1 : av > bv ? 1 : 0
    return dir === "asc" ? cmp : -cmp
  })
}

function applyFilters(tasks: Task[], f: FilterState): Task[] {
  return tasks.filter((t) => {
    if (f.leadNo && !t.leadNo.toLowerCase().includes(f.leadNo.toLowerCase())) return false
    if (f.createdDate && t.createdDate !== f.createdDate) return false
    if (f.leadStatus && t.leadStatus !== f.leadStatus) return false
    if (f.branchCode && !t.branchCode.toLowerCase().includes(f.branchCode.toLowerCase())) return false
    if (f.toBranchDate && t.toBranchDate !== f.toBranchDate) return false
    return true
  })
}

// ── Component ─────────────────────────────────────────────────────────────────

export function MyTasksOverview() {
  const [draft, setDraft] = useState<FilterState>(EMPTY_FILTER)
  const [applied, setApplied] = useState<FilterState>(EMPTY_FILTER)
  const [sortKey, setSortKey] = useState<keyof Task | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const filteredData = applyFilters(mockTasks, applied)
  const sortedData = sortData(filteredData, sortKey, sortDir)
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize))
  const pagedData = sortedData.slice((page - 1) * pageSize, page * pageSize)
  const activeFilterCount = Object.values(applied).filter(Boolean).length

  function handleSort(key: keyof Task) {
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
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">
            งานของฉัน
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            รายการ Lead ที่ได้รับมอบหมาย — อัปเดตล่าสุด {formatDate("2026-05-01")}
          </p>
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
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {/* Lead No. */}
            <Input
              label="หมายเลข Lead"
              size="sm"
              placeholder="AMP261201001"
              value={draft.leadNo}
              onChange={(e) => setDraft((p) => ({ ...p, leadNo: e.target.value }))}
            />

            {/* Created Date */}
            <Input
              label="วันที่สร้าง"
              size="sm"
              type="date"
              value={draft.createdDate}
              onChange={(e) => setDraft((p) => ({ ...p, createdDate: e.target.value }))}
            />

            {/* Lead Status */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-primary">สถานะ Lead</label>
              <Select
                value={draft.leadStatus}
                onValueChange={(v) => setDraft((p) => ({ ...p, leadStatus: v === "all" ? "" : v }))}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="ทั้งหมด" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  <SelectItem value="01">ลีดใหม่</SelectItem>
                  <SelectItem value="02">กำลังดำเนินการ</SelectItem>
                  <SelectItem value="03">ส่งสาขาแล้ว</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* BranchCode */}
            <Input
              label="รหัสสาขา"
              size="sm"
              placeholder="BKK001"
              value={draft.branchCode}
              onChange={(e) => setDraft((p) => ({ ...p, branchCode: e.target.value }))}
            />

            {/* ToBranch_Date */}
            <Input
              label="วันที่ส่งสาขา"
              size="sm"
              type="date"
              value={draft.toBranchDate}
              onChange={(e) => setDraft((p) => ({ ...p, toBranchDate: e.target.value }))}
            />
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
            <span className="font-semibold text-text-primary">{mockTasks.length}</span>
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
                    const isSorted = sortKey === col.key
                    const SortIcon = isSorted
                      ? sortDir === "asc" ? ChevronUp : ChevronDown
                      : ChevronsUpDown
                    return (
                      <button
                        key={col.key}
                        onClick={() => handleSort(col.key as keyof Task)}
                        className={cn(
                          "flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors",
                          col.className,
                          isSorted ? "text-brand-blue" : "text-text-tertiary hover:text-text-secondary"
                        )}
                      >
                        {col.label}
                        <SortIcon className="h-3 w-3 shrink-0" />
                      </button>
                    )
                  })}
                </div>

                {/* Rows */}
                {pagedData.map((task) => (
                  <TableRow
                    key={task.leadNo}
                    cells={columns.map((col) => ({
                      key: col.key,
                      className: col.className,
                      content: col.render(task),
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
