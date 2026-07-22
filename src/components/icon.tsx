import {
  Compass, Sparkles, ArrowRight, ArrowLeft, ArrowUp, Stamp, Landmark, House, Check,
  CheckCircle2, Circle, CircleDot, MapPin, Plane, CalendarClock, CalendarDays, Calendar,
  CalendarRange, ShieldCheck, Clock, UploadCloud, FolderLock, FolderOpen, Map,
  GanttChartSquare, RotateCcw, Network, Paperclip, Lock, Loader, FileText, FileSearch,
  BadgeCheck, Globe, Zap, GraduationCap, Laptop, Users, Palmtree, Quote, type LucideProps,
} from "lucide-react";

/** Curated Lucide registry — only the icons the Waypoint UI uses. */
const REGISTRY = {
  Compass, Sparkles, ArrowRight, ArrowLeft, ArrowUp, Stamp, Landmark, House, Check,
  CheckCircle2, Circle, CircleDot, MapPin, Plane, CalendarClock, CalendarDays, Calendar,
  CalendarRange, ShieldCheck, Clock, UploadCloud, FolderLock, FolderOpen, Map,
  GanttChartSquare, RotateCcw, Network, Paperclip, Lock, Loader, FileText, FileSearch,
  BadgeCheck, Globe, Zap, GraduationCap, Laptop, Users, Palmtree, Quote,
} as const;

export type IconName = keyof typeof REGISTRY;

export interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
}

export function Icon({ name, size = 20, strokeWidth = 2, ...props }: IconProps) {
  const Cmp = REGISTRY[name];
  if (!Cmp) return null;
  return <Cmp className="lucide" size={size} strokeWidth={strokeWidth} {...props} />;
}
