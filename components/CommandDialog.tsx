'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import {
  CommandDialog as CmdDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  User,
  Briefcase,
  FolderOpen,
  Mail,
  Sun,
  Moon,
  Monitor,
  Github,
  Linkedin,
  FileText,
  Terminal,
  ExternalLink,
} from 'lucide-react'

interface CommandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandDialog({ open, onOpenChange }: CommandDialogProps) {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      onOpenChange(false)
    }
  }

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    onOpenChange(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <CmdDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => scrollToSection('about')}>
            <User className="mr-2 h-4 w-4" />
            <span>About</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollToSection('experience')}>
            <Briefcase className="mr-2 h-4 w-4" />
            <span>Experience</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollToSection('projects')}>
            <FolderOpen className="mr-2 h-4 w-4" />
            <span>Projects</span>
          </CommandItem>
          <CommandItem onSelect={() => scrollToSection('contact')}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Contact</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* <CommandGroup heading="Theme">
          <CommandItem onSelect={() => setTheme('light')}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
            {theme === 'light' && <span className="ml-auto text-xs">•</span>}
          </CommandItem>
          <CommandItem onSelect={() => setTheme('dark')}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
            {theme === 'dark' && <span className="ml-auto text-xs">•</span>}
          </CommandItem>
          <CommandItem onSelect={() => setTheme('system')}>
            <Monitor className="mr-2 h-4 w-4" />
            <span>System</span>
            {theme === 'system' && <span className="ml-auto text-xs">•</span>}
          </CommandItem>
        </CommandGroup> */}

        <CommandSeparator />

        <CommandGroup heading="Links">
          <CommandItem onSelect={() => openLink('https://github.com/spencer-rafada')}>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
            <ExternalLink className="ml-auto h-3 w-3" />
          </CommandItem>
          <CommandItem onSelect={() => openLink('https://linkedin.com/in/spencer-rafada')}>
            <Linkedin className="mr-2 h-4 w-4" />
            <span>LinkedIn</span>
            <ExternalLink className="ml-auto h-3 w-3" />
          </CommandItem>
          <CommandItem onSelect={() => window.location.href = 'mailto:neilspencerrafada@gmail.com'}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Email</span>
            <ExternalLink className="ml-auto h-3 w-3" />
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => {
            navigator.clipboard.writeText('neilspencerrafada@gmail.com')
            onOpenChange(false)
          }}>
            <Terminal className="mr-2 h-4 w-4" />
            <span>Copy Email</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CmdDialog>
  )
}