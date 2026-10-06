import { Component, computed, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

export interface CardItem {
  id: number;
  title: string;
  description: string;
  link: string;
  category: 'Quick' | 'Development' | 'Learn' | 'Project';
}

@Component({
  selector: 'app-home',
  imports: [Header, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  isDarkMode = signal<boolean>(true);
  selectedCategory = signal<string>('All');

  categories = ['All', 'Quick', 'Development', 'Learn', 'Project'] as const;

  cards: CardItem[] = [
    // Quick
    {
      id: 1,
      title: 'Azure Portal',
      description: 'Quick access to Microsoft Azure cloud services & subscriptions.',
      link: 'https://portal.azure.com',
      category: 'Quick',
    },
    {
      id: 2,
      title: 'GitHub Repo',
      description: 'Direct repository link for version control & source code management.',
      link: 'https://github.com',
      category: 'Quick',
    },

    // Development
    {
      id: 3,
      title: 'Angular (Official)',
      description: 'The official home for Angular documentation, tutorials, signals, and CLI tools.',
      link: 'https://angular.dev',
      category: 'Development',
    },
    {
      id: 4,
      title: 'Java (dev.java)',
      description: 'Official Java developer portal, JDK specifications, tutorials, and ecosystem news.',
      link: 'https://dev.java',
      category: 'Development',
    },
    {
      id: 5,
      title: 'Spring Boot',
      description: 'Build enterprise-grade, production-ready stand-alone Java microservices and APIs.',
      link: 'https://spring.io/projects/spring-boot',
      category: 'Development',
    },
    {
      id: 6,
      title: 'PostgreSQL',
      description: 'Powerful, open-source object-relational database system for scalable applications.',
      link: 'https://www.postgresql.org',
      category: 'Development',
    },
    {
      id: 7,
      title: 'MongoDB',
      description: 'Document-based distributed NoSQL database platform built for modern cloud apps.',
      link: 'https://www.mongodb.com',
      category: 'Development',
    },
    {
      id: 8,
      title: 'Tailwind CSS',
      description: 'Streamlined utility-first styling with custom theme CSS variables.',
      link: 'https://tailwindcss.com',
      category: 'Development',
    },
    {
      id: 9,
      title: 'TypeScript',
      description: 'Typed JavaScript with robust static typing, interfaces, and compiler tooling.',
      link: 'https://www.typescriptlang.org',
      category: 'Development',
    },

    // Learn (Online Learning Platforms)
    {
      id: 10,
      title: 'Udemy',
      description: 'Extensive video courses covering web development, cloud computing, and coding.',
      link: 'https://www.udemy.com',
      category: 'Learn',
    },
    {
      id: 11,
      title: 'Coursera',
      description: 'Accredited degrees, specialized certificates, and courses from top global universities.',
      link: 'https://www.coursera.org',
      category: 'Learn',
    },
    {
      id: 12,
      title: 'Pluralsight',
      description: 'Technology skill assessments, video libraries, and guided cloud engineering paths.',
      link: 'https://www.pluralsight.com',
      category: 'Learn',
    },
    {
      id: 13,
      title: 'edX',
      description: 'University-level computer science, AI, and software engineering programs.',
      link: 'https://www.edx.org',
      category: 'Learn',
    },
    {
      id: 14,
      title: 'freeCodeCamp',
      description: 'Interactive self-paced coding curriculum with hands-on verified certifications.',
      link: 'https://www.freecodecamp.org',
      category: 'Learn',
    },
    {
      id: 15,
      title: 'Frontend Masters',
      description: 'In-depth expert courses on modern JavaScript, Angular, and frontend architectures.',
      link: 'https://frontendmasters.com',
      category: 'Learn',
    },
    {
      id: 16,
      title: 'Microsoft Learn',
      description: 'Official interactive training and certification pathways for Azure, AI, and .NET.',
      link: 'https://learn.microsoft.com',
      category: 'Learn',
    },
    {
      id: 17,
      title: 'Codecademy',
      description: 'Hands-on interactive coding lessons for web development and software engineering.',
      link: 'https://www.codecademy.com',
      category: 'Learn',
    },

    // Project
    {
      id: 18,
      title: 'Azure Cloud App',
      description: 'Production cloud web app deployed with continuous CI/CD pipelines.',
      link: 'https://azure.microsoft.com',
      category: 'Project',
    },
    {
      id: 19,
      title: 'REST & GraphQL API',
      description: 'Backend services project integrating high-speed API endpoints.',
      link: 'https://graphql.org',
      category: 'Project',
    },
  ];

  filteredCards = computed(() => {
    const active = this.selectedCategory();
    if (active === 'All') {
      return this.cards;
    }
    return this.cards.filter((card) => card.category === active);
  });

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  getCategoryCount(category: string): number {
    if (category === 'All') {
      return this.cards.length;
    }
    return this.cards.filter((c) => c.category === category).length;
  }

  toggleTheme(): void {
    this.isDarkMode.update((dark) => !dark);
  }
}
