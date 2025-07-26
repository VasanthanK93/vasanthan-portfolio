'use client';

import React, { useState } from 'react';
import { RevealTransition, StaggeredTransition } from '@/components/animations/PageTransition';
import ScrollAnimation from '@/components/animations/ScrollAnimation';
import CounterAnimation from '@/components/animations/CounterAnimation';
import Card, { SkillCard } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Skills data organized by categories
  const skillsData = {
    frontend: [
      {
        name: 'React.js',
        proficiency: 5,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89c-1.03 0-1.87-.84-1.87-1.89s.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26S20.07 10.37 17.97 9.74c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26"/>
          </svg>
        ),
        color: 'blue',
        yearsOfExperience: 7
      },
      {
        name: 'Next.js',
        proficiency: 5,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C19.756 4.824 16.566 2.92 12.458.762c-.706-.37-1.573-.774-2.297-.977C9.571-.025 9.171-.017 8.543.024c-.402.026-.797.074-1.174.118-.107.013-.4.064-.65.114-.18.036-.702.213-1.163.395C3.372 1.862 1.925 3.776 1.09 6.101-.027 9.535.266 13.057 2.295 16.17c.459.702 1.13 1.428 1.849 2.004.191.152.559.424.818.605l.472.33L5.496 19c.095.06.184.117.276.165a11.934 11.934 0 0 0 6.071.981c4.226-.043 8.072-2.128 10.292-5.576 1.224-1.895 1.839-4.094 1.839-6.565 0-4.226-2.128-8.072-5.576-10.292C16.399.881 14.2.27 11.728.27c-.176 0-.31.001-.358.007z"/>
          </svg>
        ),
        color: 'gray',
        yearsOfExperience: 4
      },
      {
        name: 'Vue.js',
        proficiency: 4,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M24,1.61H14.06L12,5.16,9.94,1.61H0L12,22.39ZM12,14.08,5.16,2.23H9.59L12,6.41l2.41-4.18h4.43Z"/>
          </svg>
        ),
        color: 'green',
        yearsOfExperience: 3
      },
      {
        name: 'TypeScript',
        proficiency: 4,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
          </svg>
        ),
        color: 'blue',
        yearsOfExperience: 5
      },
      {
        name: 'JavaScript',
        proficiency: 5,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
          </svg>
        ),
        color: 'yellow',
        yearsOfExperience: 9
      },
      {
        name: 'HTML5',
        proficiency: 5,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
          </svg>
        ),
        color: 'orange',
        yearsOfExperience: 9
      },
      {
        name: 'CSS3',
        proficiency: 5,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
          </svg>
        ),
        color: 'blue',
        yearsOfExperience: 9
      },
      {
        name: 'Tailwind CSS',
        proficiency: 5,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
          </svg>
        ),
        color: 'cyan',
        yearsOfExperience: 4
      }
    ],
    backend: [
      {
        name: 'Node.js',
        proficiency: 5,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
          </svg>
        ),
        color: 'green',
        yearsOfExperience: 7
      },
      {
        name: 'Express.js',
        proficiency: 5,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957c-6.454 3.078-14.3-2.847-8.085-6.617z"/>
          </svg>
        ),
        color: 'gray',
        yearsOfExperience: 6
      },
      {
        name: 'MongoDB',
        proficiency: 4,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
          </svg>
        ),
        color: 'green',
        yearsOfExperience: 5
      },
      {
        name: 'MySQL',
        proficiency: 4,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.274.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008L3.16 18.684H2.52l-1.31-4.32-.23 4.32H.15l.59-7.973h1.444l1.13 3.896 1.297-3.896h1.385l.54 7.973zm5.909.01c-.56 0-1.011-.074-1.522-.222L9.91 17.53c.463.204.963.287 1.38.287.754 0 1.26-.375 1.26-.84 0-.773-.84-.98-1.577-1.342-.737-.36-1.54-.84-1.54-1.98 0-1.26.996-1.998 2.294-1.998.492 0 .953.074 1.38.222l-.181.915c-.36-.129-.754-.222-1.26-.222-.663 0-1.001.375-1.001.795 0 .774.84.98 1.577 1.342.737.361 1.54.84 1.54 1.98-.001 1.335-1.08 2.056-2.294 2.056zm6.50.222c-.663 0-1.260-.287-1.577-.84l-.181.685h-.831v-6.429h1.26v3.532c0 .663.287 1.080.795 1.08.287 0 .663-.074.927-.222v-4.39h1.26v5.909c-.737.287-1.35.675-1.653.675zm7.233.015c-1.577 0-2.906-.84-2.906-2.906 0-2.021 1.329-2.906 2.906-2.906S24 14.814 24 16.835c0 2.066-1.329 2.906-2.588 2.906zm0-4.827c-.663 0-1.26.585-1.26 1.92 0 1.336.597 1.921 1.26 1.921.663 0 1.26-.585 1.26-1.92 0-1.336-.597-1.921-1.26-1.921z"/>
          </svg>
        ),
        color: 'blue',
        yearsOfExperience: 4
      },
      {
        name: 'GraphQL',
        proficiency: 3,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M5.8 3.6L16.2 3.6L16.2 20.4L5.8 20.4zM8.4 6.9c.4-.7 1-.7 1.4 0l2.1 3.6c.4.7.4 1.8 0 2.5l-2.1 3.6c-.4.7-1 .7-1.4 0l-2.1-3.6c-.4-.7-.4-1.8 0-2.5zm6.8 10.2L12 12l3.2-5.1zm-.7-12.2L11.3 12l-3.2-5.1zM20.4 5.8v12.4H3.6V5.8z"/>
          </svg>
        ),
        color: 'pink',
        yearsOfExperience: 2
      }
    ],
    tools: [
      {
        name: 'Git',
        proficiency: 5,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.721-.719-1.883 0-2.6.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.605-.406-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189L10.929 23.55c.603.604 1.582.604 2.188 0l10.43-10.43c.604-.603.604-1.582-.001-2.188z"/>
          </svg>
        ),
        color: 'orange',
        yearsOfExperience: 8
      },
      {
        name: 'Docker',
        proficiency: 4,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338 0-.676.033-1.01.098-.31-1.128-.995-2.057-2.05-2.765.2-.224.24-.694.065-1.186-.302-.084-.719-.015-.758.045-.28 1.06-.45 1.186-.472 1.238-.822-.519-1.808-.733-2.8-.733 0 0-.472.107-.472.197 0 .016.045.107.107.107.408 0 .834.022 1.25.076-.542.733-.811 1.543-.811 2.365 0 .405.056.810.168 1.193-.458.107-.89.272-1.274.482-.107.061-.413.142-.413.282 0 .045.016.107.107.107.015 0 .030-.015.045-.015.258 0 .524-.046.781-.122.30.45.719.84 1.186 1.128-.107.076-.199.168-.276.276-.015.030-.015.061-.015.091 0 .108.076.168.168.168.03 0 .061-.015.091-.030.153-.076.306-.168.459-.275.046-.030.091-.061.137-.091.030-.015.061-.015.091-.030.122.061.25.122.379.168.107-.076.168-.168.198-.258.030-.107.015-.214-.046-.32-.045-.076-.107-.153-.168-.214.030-.015.061-.030.091-.045.107.168.259.306.413.413.046.033.091.061.137.091.046.030.091.045.137.045.076 0 .137-.061.137-.168 0-.015 0-.030-.015-.045-.061-.107-.137-.214-.214-.32-.045-.061-.091-.122-.137-.183-.015-.015-.030-.045-.045-.061-.015-.015-.030-.030-.045-.045.061-.076.122-.153.168-.245.046-.092.076-.199.076-.307 0-.045-.015-.091-.045-.137-.030-.045-.076-.076-.122-.076-.091 0-.183.061-.275.122-.076.061-.153.122-.229.183-.046.045-.091.061-.137.091-.045.015-.091.030-.137.045-.153-.168-.321-.306-.504-.413-.045-.030-.091-.061-.137-.091-.061-.046-.122-.076-.183-.107-.015-.015-.030-.015-.045-.030 0-.015.015-.030.015-.045.061-.107.122-.214.153-.336.091-.61.107-1.268-.046-1.859-.122-.488-.351-.915-.688-1.274-.061-.076-.122-.137-.199-.198.061-.046.199-.107.214-.153.000-.046-.030-.076-.076-.076m-7.31 6.198c-.076-.061-.153-.122-.214-.199-.107-.153-.107-.351 0-.504.061-.076.153-.122.229-.168.076-.046.168-.076.26-.076.091 0 .168.030.229.076.107.076.199.199.199.32 0 .107-.046.214-.122.291-.076.092-.168.168-.259.214-.076.046-.168.076-.229.076-.091 0-.168-.015-.244-.061-.015-.015-.030-.015-.045-.030-.015-.015-.015-.030-.030-.045-.061-.046-.107-.107-.122-.168-.015-.061-.015-.122 0-.183.015-.061.045-.122.091-.168.046-.046.107-.076.168-.076.061 0 .122.030.168.076.045.046.076.107.076.168 0 .061-.030.122-.076.168-.045.046-.107.076-.168.076-.061 0-.122-.030-.168-.076-.046-.046-.076-.107-.076-.168 0-.061.030-.122.076-.168.046-.046.107-.076.168-.076.061 0 .122.030.168.076.046.046.076.107.076.168 0 .061-.030.122-.076.168-.046.046-.107.076-.168.076-.061 0-.122-.030-.168-.076-.046-.046-.076-.107-.076-.168 0-.061.030-.122.076-.168.046-.046.107-.076.168-.076.061 0 .122.030.168.076.045.046.076.107.076.168 0 .061-.030.122-.076.168-.046.046-.107.076-.168.076-.061 0-.122-.030-.168-.076-.046-.046-.076-.107-.076-.168 0-.061.030-.122.076-.168.046-.046.107-.076.168-.076.061 0 .122.030.168.076.046.046.076.107.076.168 0 .061-.030.122-.076.168-.046.046-.107.076-.168.076-.061 0-.122-.030-.168-.076-.046-.046-.076-.107-.076-.168"/>
          </svg>
        ),
        color: 'blue',
        yearsOfExperience: 3
      },
      {
        name: 'AWS',
        proficiency: 3,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.175 0 .048-.024.111-.08.175l-.528.344c-.08.056-.16.08-.239.08-.096 0-.192-.048-.288-.136a3.158 3.158 0 01-.352-.46 7.61 7.61 0 01-.304-.556c-.8.94-1.8 1.416-3.02 1.416-1.44 0-2.568-.818-2.568-2.402 0-.758.272-1.377.816-1.857.544-.48 1.27-.718 2.184-.718.302 0 .614.024.942.08.328.048.666.128 1.006.216v-.7c0-.718-.144-1.225-.424-1.529-.288-.295-.775-.447-1.465-.447-.31 0-.632.04-.965.111-.336.072-.67.168-.997.288-.144.056-.25.08-.318.08-.128 0-.192-.095-.192-.287v-.463c0-.144.016-.25.056-.32.04-.07.112-.144.207-.207.336-.176.735-.32 1.2-.408A6.493 6.493 0 014.24 4c1.697 0 2.953.383 3.745 1.145.8.762 1.201 1.916 1.201 3.464v1.427zM2.112 13.17c.286 0 .583-.056.894-.159.31-.111.584-.28.798-.51.128-.144.224-.304.279-.48.056-.175.088-.375.088-.615v-.295a6.36 6.36 0 00-.830-.175 6.833 6.833 0 00-.847-.048c-.615 0-1.063.12-1.368.367-.296.248-.447.606-.447 1.067 0 .431.112.75.328.967.207.208.518.32.926.32l.179-.439zm8.157 1.385c-.16 0-.27-.032-.327-.087-.064-.056-.12-.16-.168-.32l-1.879-6.17c-.047-.16-.08-.263-.08-.32 0-.128.064-.2.191-.2h.783c.168 0 .279.033.335.089.064.056.112.16.159.32l1.345 5.27 1.247-5.27c.04-.16.088-.264.151-.32.064-.056.184-.089.36-.089h.638c.176 0 .295.033.36.089.063.056.119.16.151.32l1.263 5.334 1.385-5.334c.047-.16.103-.264.159-.32.063-.056.175-.089.343-.089h.743c.127 0 .191.072.191.2 0 .04-.008.08-.016.128-.008.048-.024.112-.056.2l-1.927 6.17c-.048.16-.104.264-.168.32-.063.055-.175.087-.335.087h-.687c-.176 0-.295-.032-.36-.087-.063-.056-.119-.16-.151-.32L14.1 8.97l-1.23 4.942c-.032.16-.088.264-.151.32-.064.055-.184.087-.36.087h-.69zm13.108.175c-.83 0-1.487-.24-1.943-.718-.463-.479-.695-1.145-.695-2.007 0-.88.224-1.553.695-2.023.456-.471 1.082-.702 1.88-.702.783 0 1.377.224 1.794.686.415.455.63 1.09.63 1.914 0 .592-.048 1.06-.143 1.417-.096.35-.255.640-.479.847-.223.207-.51.358-.862.446-.351.087-.744.135-1.169.135l-.708.005zm.847-1.26c.4 0 .718-.08.95-.255.24-.176.36-.445.36-.83 0-.375-.12-.654-.36-.83-.232-.176-.55-.264-.95-.264-.415 0-.742.088-.982.264-.24.176-.36.455-.36.83 0 .385.12.654.36.83.24.175.567.255.982.255z"/>
          </svg>
        ),
        color: 'orange',
        yearsOfExperience: 3
      },
      {
        name: 'VS Code',
        proficiency: 5,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
          </svg>
        ),
        color: 'blue',
        yearsOfExperience: 7
      },
      {
        name: 'Webpack',
        proficiency: 4,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M12 0l12 6.928L12 24 0 6.928 12 0zm4.606 7.464l-4.606 2.656-4.606-2.656v5.312L12 15.432l4.606-2.656V7.464z"/>
          </svg>
        ),
        color: 'blue',
        yearsOfExperience: 5
      },
      {
        name: 'Figma',
        proficiency: 3,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117v-6.038H8.148zm7.704 0c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49-4.49-2.014-4.49-4.49 2.014-4.49 4.49-4.49zm0 7.51c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019-3.019 1.354-3.019 3.019 1.355 3.019 3.019 3.019zM8.148 24c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49-2.014 4.49-4.49 4.49zm0-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019 3.019-1.355 3.019-3.019-1.355-3.019-3.019-3.019z"/>
          </svg>
        ),
        color: 'purple',
        yearsOfExperience: 2
      }
    ],
    specialization: [
      {
        name: 'AEM (Adobe Experience Manager)',
        proficiency: 4,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624z"/>
          </svg>
        ),
        color: 'red',
        yearsOfExperience: 4
      },
      {
        name: 'CMS Development',
        proficiency: 4,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        ),
        color: 'green',
        yearsOfExperience: 5
      },
      {
        name: 'Full Stack Architecture',
        proficiency: 5,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ),
        color: 'indigo',
        yearsOfExperience: 6
      },
      {
        name: 'API Development',
        proficiency: 5,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M6.5 10.5h11v3h-11zm0-4h11v2h-11zm0 8h7v2h-7z"/>
          </svg>
        ),
        color: 'cyan',
        yearsOfExperience: 7
      }
    ]
  };

  // Flatten all skills for filtering
  const allSkills = Object.values(skillsData).flat();
  
  // Filter skills based on active category
  const filteredSkills = activeCategory === 'all' 
    ? allSkills 
    : skillsData[activeCategory as keyof typeof skillsData] || [];

  // Category buttons
  const categories = [
    { id: 'all', label: 'All Skills', icon: '🚀', count: allSkills.length },
    { id: 'frontend', label: 'Frontend', icon: '🎨', count: skillsData.frontend.length },
    { id: 'backend', label: 'Backend', icon: '⚙️', count: skillsData.backend.length },
    { id: 'tools', label: 'Tools & DevOps', icon: '🛠️', count: skillsData.tools.length },
    { id: 'specialization', label: 'Specialization', icon: '⭐', count: skillsData.specialization.length }
  ];

  // Stats data
  const stats = [
    { label: 'Technologies Mastered', value: 20, suffix: '+' },
    { label: 'Years of Experience', value: 9, suffix: '+' },
    { label: 'Projects Completed', value: 50, suffix: '+' },
    { label: 'Domains Worked', value: 3, suffix: '+' }
  ];

  return (
    <section id="skills" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <RevealTransition direction="up" className="text-center mb-16">
          <div className="space-y-4">
            <Badge variant="outline" size="lg" className="mb-4">
              <span className="mr-2">💻</span>
              Skills & Expertise
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                Technical Arsenal
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              A comprehensive toolkit of modern technologies and frameworks I use to build 
              scalable, performant applications.
            </p>
          </div>
        </RevealTransition>

        {/* Stats Section */}
        <RevealTransition direction="up" threshold={200} className="mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                variant="glass"
                hover
                className="text-center p-6"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <div className="space-y-2">
                  <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">
                    <CounterAnimation
                      to={stat.value}
                      duration={2}
                      delay={0.5 + index * 0.2}
                      suffix={stat.suffix}
                      scrollThreshold={0.7}
                    />
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </RevealTransition>

        {/* Category Filter */}
        <RevealTransition direction="up" threshold={300} className="flex justify-center mb-12">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-2 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300',
                    'hover:scale-105 active:scale-95',
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
                  )}
                >
                  <span>{category.icon}</span>
                  <span className="hidden sm:inline">{category.label}</span>
                  <Badge 
                    variant={activeCategory === category.id ? 'secondary' : 'outline'} 
                    size="xs"
                    className={cn(
                      'ml-1',
                      activeCategory === category.id 
                        ? 'bg-white/20 text-white border-white/30' 
                        : ''
                    )}
                  >
                    {category.count}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </RevealTransition>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredSkills.map((skill, index) => (
            <ScrollAnimation
              key={`${skill.name}-${activeCategory}`}
              animation="scaleUp"
              duration={0.6}
              delay={index * 0.1}
              threshold={0.1}
              className="h-full"
            >
              <Card
                variant="outlined"
                hover
                interactive
                glow
                className={cn(
                  'h-full p-6 text-center group cursor-pointer transition-all duration-300',
                  hoveredSkill === skill.name && 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900'
                )}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="space-y-4">
                  {/* Skill Icon */}
                  <div className={cn(
                    'mx-auto w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300',
                    `bg-${skill.color}-100 text-${skill.color}-600 dark:bg-${skill.color}-900/30 dark:text-${skill.color}-400`,
                    'group-hover:scale-110 group-hover:rotate-6'
                  )}>
                    {skill.icon}
                  </div>

                  {/* Skill Name */}
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {skill.name}
                  </h3>

                  {/* Proficiency Bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 overflow-hidden">
                      <div
                        className={cn(
                          'h-2 rounded-full transition-all duration-1000 ease-out',
                          `bg-${skill.color}-500 group-hover:bg-${skill.color}-600`
                        )}
                        style={{ 
                          width: `${(skill.proficiency / 5) * 100}%`,
                          transitionDelay: `${index * 100}ms`
                        }}
                      />
                    </div>
                    
                    {/* Proficiency Level */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">
                        {skill.yearsOfExperience}+ years
                      </span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              'w-1.5 h-1.5 rounded-full transition-all duration-300',
                              i < skill.proficiency
                                ? `bg-${skill.color}-500`
                                : 'bg-gray-300 dark:bg-gray-600'
                            )}
                            style={{ transitionDelay: `${(index * 100) + (i * 50)}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover overlay with additional info */}
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-t from-blue-600/90 to-purple-600/90 rounded-xl',
                  'flex items-center justify-center opacity-0 group-hover:opacity-100',
                  'transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'
                )}>
                  <div className="text-center text-white space-y-2">
                    <div className="text-sm font-medium">Proficiency Level</div>
                    <div className="text-2xl font-bold">
                      {skill.proficiency}/5
                    </div>
                    <div className="text-xs opacity-90">
                      {skill.proficiency === 5 && "Expert"}
                      {skill.proficiency === 4 && "Advanced"}
                      {skill.proficiency === 3 && "Intermediate"}
                      {skill.proficiency === 2 && "Beginner"}
                      {skill.proficiency === 1 && "Learning"}
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        {/* Skills Summary */}
        <RevealTransition direction="up" threshold={600} className="mt-16">
          <Card variant='glass' className="p-8 text-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Always Learning, Always Growing
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Technology evolves rapidly, and I stay current with the latest trends, best practices, 
                and emerging technologies to deliver cutting-edge solutions.
              </p>
              
              {/* Learning Path */}
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto text-2xl">
                    📚
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Continuous Learning</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Staying updated with latest technologies and industry best practices
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto text-2xl">
                    🛠️
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Hands-on Practice</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Building real-world projects to apply and strengthen skills
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto text-2xl">
                    🤝
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Knowledge Sharing</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Contributing to open source and mentoring fellow developers
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-6">
                <Button
                  variant="primary"
                  size="lg"
                  gradient
                  glowing
                  className="group"
                  onClick={() => {
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                      projectsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  rightIcon={
                    <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  }
                >
                  See My Work
                </Button>
              </div>
            </div>
          </Card>
        </RevealTransition>
      </div>
    </section>
  );
};

export default Skills;