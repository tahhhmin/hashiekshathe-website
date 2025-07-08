'use client';

import React from 'react';
import Sidebar from '@/ui/Sidebar';

const header = {
  logo: '/favicon.svg',
  title: 'Hashi Ekshathe',
  subtitle: 'Admin Panel'
};

const footer = {
  avatar: '/admin-avatar.png',
  name: 'Admin Name',
  email: 'admin@example.com',
  accessLevel: 'Super Admin'
};

const sections = [
  {
    title: 'Platform',
    items: [
      {
        label: 'Analytics',
        icon: 'ChartLine' as keyof typeof import('lucide-react'),
        dropdown: ['Reports', 'Graphs']
      },
      {
        label: 'Projects',
        icon: 'Boxes' as keyof typeof import('lucide-react'),
        dropdown: ['View List', 'Add New']
      }
    ]
  },
  {
    title: 'Manage',
    items: [
      {
        label: 'Volunteers',
        icon: 'Users' as keyof typeof import('lucide-react'),
        dropdown: ['List', 'Requests']
      },
      {
        label: 'Settings',
        icon: 'Settings2' as keyof typeof import('lucide-react'),
        dropdown: ['Profile', 'Security']
      }
    ]
  },
  {
    title: 'Manage',
    items: [
      {
        label: 'Volunteers',
        icon: 'Users' as keyof typeof import('lucide-react'),
        dropdown: ['List', 'Requests']
      },
      {
        label: 'Settings',
        icon: 'Settings2' as keyof typeof import('lucide-react'),
        dropdown: ['Profile', 'Security']
      }
    ]
  },
  {
    title: 'Manage',
    items: [
      {
        label: 'Volunteers',
        icon: 'Users' as keyof typeof import('lucide-react'),
        dropdown: ['List', 'Requests']
      },
      {
        label: 'Settings',
        icon: 'Settings2' as keyof typeof import('lucide-react'),
        dropdown: ['Profile', 'Security']
      }
    ]
  },
  {
    title: 'Manage',
    items: [
      {
        label: 'Volunteers',
        icon: 'Users' as keyof typeof import('lucide-react'),
        dropdown: ['List', 'Requests']
      },
      {
        label: 'Settings',
        icon: 'Settings2' as keyof typeof import('lucide-react'),
        dropdown: ['Profile', 'Security']
      }
    ]
  },
  {
    title: 'Manage',
    items: [
      {
        label: 'Volunteers',
        icon: 'Users' as keyof typeof import('lucide-react'),
        dropdown: ['List', 'Requests']
      },
      {
        label: 'Settings',
        icon: 'Settings2' as keyof typeof import('lucide-react'),
        dropdown: ['Profile', 'Security']
      }
    ]
  },
  {
    title: 'Manage',
    items: [
      {
        label: 'Volunteers',
        icon: 'Users' as keyof typeof import('lucide-react'),
        dropdown: ['List', 'Requests']
      },
      {
        label: 'Settings',
        icon: 'Settings2' as keyof typeof import('lucide-react'),
        dropdown: ['Profile', 'Security']
      }
    ]
  }
  
];

function Page() {
  const handleSubItemClick = (label: string) => {
    switch (label) {
      case 'Reports':
        console.log('Navigate to Reports');
        break;
      case 'Graphs':
        console.log('Open Graphs');
        break;
      case 'View List':
        console.log('Project list clicked');
        break;
      case 'Add New':
        console.log('Add project clicked');
        break;
      default:
        console.log('Clicked on:', label);
    }
  };

  return (
    <div>
      <Sidebar
        header={header}
        sections={sections}
        footer={footer}
        onSubItemClick={handleSubItemClick}
      />
    </div>
  );
}

export default Page;
