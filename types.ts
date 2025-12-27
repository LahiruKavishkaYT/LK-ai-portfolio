import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface CaseStudyProps {
  category: string;
  subCategory: string;
  title: string;
  description: string;
  image: string;
  linkText: string;
  linkHref: string;
  tags?: string[];
  isReversed?: boolean;
}

export interface VoiceDemoProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  quote: string;
  audioUrl: string;
  waveColor?: string;
}