import React from 'react';
import {
  Bot,
  Box,
  Brain,
  Building2,
  CheckCircle2,
  Code2,
  Cog,
  Compass,
  Cpu,
  Database,
  Factory,
  FlaskConical,
  Globe,
  GraduationCap,
  Handshake,
  Landmark,
  Layers,
  Lightbulb,
  LineChart,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Terminal,
  Workflow,
} from 'lucide-react';
import { IconName } from '../../types';

const iconMap: Record<IconName, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Cpu,
  Bot,
  Box,
  Brain,
  Rocket,
  Handshake,
  Globe,
  Sparkles,
  Layers,
  Database,
  Cog,
  Code2,
  LineChart,
  ShieldCheck,
  Lightbulb,
  Workflow,
  Stethoscope,
  Landmark,
  Factory,
  GraduationCap,
  ShoppingBag,
  Building2,
  FlaskConical,
  Compass,
  Terminal,
  CheckCircle2,
};

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className = 'h-5 w-5', strokeWidth = 1.75 }) => {
  const Component = iconMap[name] ?? Cpu;
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
};
