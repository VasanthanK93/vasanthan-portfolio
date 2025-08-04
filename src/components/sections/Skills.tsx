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
        proficiency: 4,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.89-1.87 1.89c-1.03 0-1.87-.84-1.87-1.89s.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26S20.07 10.37 17.97 9.74c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26"/>
          </svg>
        ),
        color: 'blue',
        yearsOfExperience: 4
      },
      {
        name: 'Next.js',
        proficiency: 4,
        icon: (
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"><g transform="translate(.722 .64) scale(6.375)"><circle cx="40" cy="40" r="40"/><path d="M66.448 70.009L30.73 24H24v31.987h5.384v-25.15l32.838 42.427a40.116 40.116 0 004.226-3.255z" fill="url(#prefix___Linear1)" fillRule="nonzero"/><path fill="url(#prefix___Linear2)" d="M51.111 24h5.333v32h-5.333z"/></g><defs><linearGradient id="prefix___Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="rotate(51.103 -29.93 76.555) scale(25.1269)"><stop offset="0" stopColor="#fff"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient><linearGradient id="prefix___Linear2" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90.218 14.934 38.787) scale(23.50017)"><stop offset="0" stopColor="#fff"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient></defs></svg>
        ),
        color: 'blue',
        yearsOfExperience: 1
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
        name: 'Svelte',
        proficiency: 4,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M 110.43093,16.935847 C 98.552474,-0.076153 75.089104,-5.118154 58.130818,5.695846 l -29.793,19.000001 c -4.030441,2.529 -7.488786,5.871 -10.15468,9.814 -2.665895,3.943 -4.479469,8.399 -5.325138,13.083 a 25.478172,30.64 0 0 0 -0.572094,6.396 c 0.0183,5.831 1.446866,11.571 4.163485,16.729995 -2.546986,3.87201 -4.285721,8.22 -5.110602,12.78201 a 25.347621,30.483 0 0 0 0.345086,14.41199 c 1.072679,4.732998 3.078336,9.203998 5.900559,13.151998 11.877618,17.011 35.393374,22.053 52.299272,11.24 l 29.762238,-19.001 c 4.027946,-2.532 7.482126,-5.877998 10.141386,-9.824998 2.65841,-3.947 4.46282,-8.40699 5.29686,-13.093 0.3825,-2.107 0.57458,-4.244 0.5721,-6.386 -0.007,-5.81999 -1.41778,-11.550995 -4.11194,-16.708995 2.54616,-3.869 4.28489,-8.213 5.11143,-12.771 0.36921,-2.109 0.55713,-4.245 0.56212,-6.386 0.002,-7.595 -2.37152,-15 -6.78697,-21.178 z" fill="#ff3e00" /><path d="m 55.218941,112.66204 a 28.463375,34.23 0 0 1 -5.953776,0.76 c -3.820895,0.001 -7.585244,-0.925 -10.970416,-2.7 -3.384341,-1.774 -6.288887,-4.343 -8.464177,-7.487 -2.655917,-3.716 -4.082827,-8.171 -4.080332,-12.74 a 15.657767,18.83 0 0 1 0.332613,-3.833 15.424937,18.55 0 0 1 0.719276,-2.782 l 0.562116,-1.708 1.51921,1.156 c 3.528195,2.591 7.470493,4.564 11.658097,5.834 l 1.104275,0.333 -0.103941,1.104 v 0.573 c -0.0025,1.381 0.427408,2.73 1.228174,3.854 0.646933,0.958 1.51838,1.744 2.537839,2.288 a 8.2621121,9.936 0 0 0 3.311997,0.837 8.2513022,9.923 0 0 0 1.79029,-0.229 7.2717563,8.745 0 0 0 1.832699,-0.802 l 29.760566,-19.094 c 0.892236,-0.566 1.627311,-1.349 2.135377,-2.276 0.507236,-0.927 0.771662,-1.968 0.768337,-3.026 -0.0084,-1.381 -0.449027,-2.725 -1.259773,-3.844 -0.656912,-0.946 -1.533347,-1.718 -2.553637,-2.252 a 8.3128357,9.997 0 0 0 -3.307008,-0.81 8.246313,9.917 0 0 0 -1.79029,0.23 6.9383115,8.344 0 0 0 -1.821058,0.801 l -11.346268,7.25 a 24.375558,29.314 0 0 1 -6.04774,2.656 c -1.945787,0.502 -3.945624,0.758 -5.954608,0.76 -3.820063,0 -7.582749,-0.926 -10.967089,-2.698 -3.384341,-1.772 -6.289718,-4.338 -8.467502,-7.478 -2.652591,-3.718 -4.079502,-8.172 -4.080334,-12.74 0.0016,-1.285 0.113089,-2.567 0.332615,-3.833 0.509728,-2.816 1.597374,-5.495 3.196411,-7.867 1.598207,-2.373 3.67205,-4.387 6.089317,-5.914 l 29.792168,-18.99 c 1.869286,-1.19 3.908205,-2.09 6.04774,-2.667 1.945787,-0.499 3.945625,-0.75 5.953776,-0.75 3.82921,-0.01 7.603538,0.91 10.999519,2.681 3.395981,1.77 6.311338,4.34 8.497439,7.486 2.636787,3.727 4.045417,8.184 4.028777,12.75 a 15.748404,18.939 0 0 1 -0.33344,3.844 15.407475,18.529 0 0 1 -0.71845,2.781 l -0.56211,1.708 -1.519216,-1.114 c -3.525699,-2.595 -7.468833,-4.568 -11.658096,-5.834 l -1.104275,-0.343 0.103941,-1.105 v -0.572 c 0,-1.385 -0.429072,-2.735 -1.228174,-3.865 -0.65608,-0.945 -1.530022,-1.716 -2.549481,-2.25 a 8.3086779,9.992 0 0 0 -3.301186,-0.813 8.2213671,9.887 0 0 0 -1.768671,0.271 6.8185708,8.2 0 0 0 -1.831867,0.802 l -29.792165,18.99 a 5.8797701,7.071 0 0 0 -1.836857,1.79 4.7505482,5.713 0 0 0 -0.962914,2.377 5.0365955,6.057 0 0 0 -0.135541,1.104 c -8.31e-4,1.378 0.42824,2.722 1.228174,3.844 0.655248,0.945 1.530021,1.717 2.548649,2.25 a 8.2986996,9.98 0 0 0 3.301186,0.812 8.2471446,9.918 0 0 0 1.79029,-0.23 6.9433007,8.35 0 0 0 1.832699,-0.801 l 11.367057,-7.292 a 24.218399,29.125 0 0 1 6.04774,-2.656 28.52574,34.305 0 0 1 5.953776,-0.76 c 3.821727,0 7.586076,0.925 10.972078,2.697 3.386003,1.772 6.293877,4.339 8.473325,7.48 2.652591,3.717 4.079498,8.171 4.080338,12.74 0.003,1.299 -0.11226,2.596 -0.34343,3.874 -0.506403,2.817 -1.594046,5.497 -3.192254,7.87 -1.599037,2.372 -3.673715,4.385 -6.093476,5.911 l -29.739779,18.99 a 24.308205,29.233 0 0 1 -6.057719,2.667 z" fill="#ffffff" /></svg>
        ),
        color: 'red',
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
        yearsOfExperience: 3
      },
      {
        name: 'JavaScript',
        proficiency: 4,
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
        proficiency: 4,
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
        proficiency: 3,
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
        proficiency: 4,
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
        proficiency: 4,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
          </svg>
        ),
        color: 'green',
        yearsOfExperience: 9
      },
      {
        name: 'Express.js',
        proficiency: 4,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
              <linearGradient id="Ptgyoqd6DQJu9ZUJIh3sLa_2ZOaTclOqD4q_gr1" x1="30.982" x2="30.982" y1="21.203" y2="43.514" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#6dc7ff"></stop><stop offset="1" stopColor="#e6abff"></stop></linearGradient><path fill="url(#Ptgyoqd6DQJu9ZUJIh3sLa_2ZOaTclOqD4q_gr1)" d="M45.758,32.346L56.964,47h-0.85c-1.051,0-2.041-0.49-2.68-1.324L44.5,33.992l-8.935,11.684	C34.927,46.51,33.937,47,32.886,47h-0.85l11.206-14.654L32.271,18h0.85c1.051,0,2.041,0.49,2.68,1.324l8.7,11.377l8.7-11.377	C53.838,18.49,54.829,18,55.879,18h0.85L45.758,32.346z M28.527,40h0.638c0,0,0,0,0,0c-2.348,6.085-9.292,9.631-15.896,7.256	C8.215,45.437,5,40.444,5,35.073L5,29.5c0-7.29,6.273-13.143,13.705-12.443C25.182,17.667,30,23.361,30,29.866L30,34H19v0H7l0,1.109	c0,4.501,2.671,8.705,6.9,10.248c4.807,1.754,9.835-0.235,12.389-4.116C26.789,40.481,27.616,40,28.527,40z M7,32h21v-2.5	C28,23.71,23.29,19,17.5,19S7,23.71,7,29.5V32z"></path><linearGradient id="Ptgyoqd6DQJu9ZUJIh3sLb_2ZOaTclOqD4q_gr2" x1="44.5" x2="44.5" y1="16" y2="49" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1a6dff"></stop><stop offset="1" stopColor="#c822ff"></stop></linearGradient><path fill="url(#Ptgyoqd6DQJu9ZUJIh3sLb_2ZOaTclOqD4q_gr2)" d="M56.729,18L45.758,32.347L56.964,47h-0.85	c-1.051,0-2.041-0.49-2.68-1.324L44.5,33.992l-8.935,11.684C34.927,46.51,33.937,47,32.886,47h-0.85l11.206-14.653L32.271,18h0.85	c1.051,0,2.041,0.49,2.68,1.324l8.7,11.377l8.7-11.377C53.838,18.49,54.829,18,55.879,18H56.729 M60.776,16h-4.047h-0.85	c-1.663,0-3.258,0.788-4.268,2.109L44.5,27.408l-7.111-9.299C36.379,16.788,34.783,16,33.121,16h-0.85h-4.047l2.458,3.215	l10.042,13.132L30.447,45.785L27.989,49h4.047h0.85c1.663,0,3.258-0.789,4.268-2.109l7.346-9.606l7.346,9.606	C52.856,48.211,54.451,49,56.114,49h0.85h4.047l-2.458-3.215L48.276,32.346l10.042-13.132L60.776,16L60.776,16z"></path><linearGradient id="Ptgyoqd6DQJu9ZUJIh3sLc_2ZOaTclOqD4q_gr3" x1="17.54" x2="17.54" y1="15" y2="50" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#1a6dff"></stop><stop offset="1" stopColor="#c822ff"></stop></linearGradient><path fill="url(#Ptgyoqd6DQJu9ZUJIh3sLc_2ZOaTclOqD4q_gr3)" d="M17.5,17c0.397,0,0.8,0.019,1.205,0.057	C25.182,17.667,30,23.361,30,29.866V34H19v0H7v1.109c0,4.501,2.671,8.705,6.9,10.248C15.1,45.796,16.314,46,17.5,46	c3.563,0,6.872-1.847,8.789-4.758C26.789,40.481,27.616,40,28.527,40h0.638c0,0,0,0,0,0c-1.847,4.785-6.535,8-11.665,8	c-1.394,0-2.82-0.237-4.231-0.745C8.215,45.437,5,40.444,5,35.073V29.5C5,22.607,10.607,17,17.5,17 M7,32h21v-2.5	C28,23.71,23.29,19,17.5,19S7,23.71,7,29.5V32 M17.5,15L17.5,15c-3.868,0-7.508,1.509-10.249,4.251C4.51,21.992,3,25.632,3,29.5	v5.573c0,6.348,3.855,12,9.592,14.065C14.184,49.71,15.835,50,17.5,50c5.951,0,11.389-3.729,13.531-9.28l1.05-2.72l-2.915,0	l-0.638,0c-1.565,0-3.026,0.801-3.91,2.142C23.052,42.522,20.324,44,17.5,44c-0.986,0-1.967-0.175-2.915-0.521	C11.509,42.356,9.362,39.416,9.042,36H19l11,0l2,0v-2v-4.134c0-7.607-5.758-14.109-13.108-14.8C18.43,15.022,17.962,15,17.5,15	L17.5,15z M9,30v-0.5c0-4.687,3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5V30H9L9,30z"></path>
          </svg>
        ),
        color: 'yellow',
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
        yearsOfExperience: 4
      },
      {
        name: 'MySQL',
        proficiency: 3,
        icon: (
          <svg id="a96792b7-ce28-4ca3-9767-4e065ef4820f" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><defs><linearGradient id="ef16bf9d-a8b6-4181-b6cd-66fc5203f956" x1="2.59" y1="10.16" x2="15.41" y2="10.16" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#005ba1"/><stop offset="0.07" stopColor="#0060a9"/><stop offset="0.36" stopColor="#0071c8"/><stop offset="0.52" stopColor="#0078d4"/><stop offset="0.64" stopColor="#0074cd"/><stop offset="0.82" stopColor="#006abb"/><stop offset="1" stopColor="#005ba1"/></linearGradient><radialGradient id="bf3846c3-4d74-4743-ab9a-f334c248bd92" cx="9.36" cy="10.57" r="7.07" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#f2f2f2"/><stop offset="0.58" stopColor="#eee"/><stop offset="1" stopColor="#e6e6e6"/></radialGradient></defs><title>Icon-databases-130</title><path d="M9,5.14c-3.54,0-6.41-1-6.41-2.32V15.18c0,1.27,2.82,2.3,6.32,2.32H9c3.54,0,6.41-1,6.41-2.32V2.82C15.41,4.11,12.54,5.14,9,5.14Z" fill="url(#ef16bf9d-a8b6-4181-b6cd-66fc5203f956)"/><path d="M15.41,2.82c0,1.29-2.87,2.32-6.41,2.32s-6.41-1-6.41-2.32S5.46.5,9,.5s6.41,1,6.41,2.32" fill="#e8e8e8"/><path d="M13.92,2.63c0,.82-2.21,1.48-4.92,1.48S4.08,3.45,4.08,2.63,6.29,1.16,9,1.16s4.92.66,4.92,1.47" fill="#50e6ff"/><path d="M9,3a11.55,11.55,0,0,0-3.89.57A11.42,11.42,0,0,0,9,4.11a11.15,11.15,0,0,0,3.89-.58A11.84,11.84,0,0,0,9,3Z" fill="#198ab3"/><path d="M12.9,11.4V8H12v4.13h2.46V11.4ZM5.76,9.73a1.83,1.83,0,0,1-.51-.31.44.44,0,0,1-.12-.32.34.34,0,0,1,.15-.3.68.68,0,0,1,.42-.12,1.62,1.62,0,0,1,1,.29V8.11a2.58,2.58,0,0,0-1-.16,1.64,1.64,0,0,0-1.09.34,1.08,1.08,0,0,0-.42.89c0,.51.32.91,1,1.21a2.88,2.88,0,0,1,.62.36.42.42,0,0,1,.15.32.38.38,0,0,1-.16.31.81.81,0,0,1-.45.11,1.66,1.66,0,0,1-1.09-.42V12a2.17,2.17,0,0,0,1.07.24,1.88,1.88,0,0,0,1.18-.33A1.08,1.08,0,0,0,6.84,11a1.05,1.05,0,0,0-.25-.7A2.42,2.42,0,0,0,5.76,9.73ZM11,11.32a2.34,2.34,0,0,0,.33-1.26A2.32,2.32,0,0,0,11,9a1.81,1.81,0,0,0-.7-.75,2,2,0,0,0-1-.26,2.11,2.11,0,0,0-1.08.27A1.86,1.86,0,0,0,7.49,9a2.46,2.46,0,0,0-.26,1.14,2.26,2.26,0,0,0,.24,1,1.76,1.76,0,0,0,.69.74,2.06,2.06,0,0,0,1,.3l.86,1h1.21L10,12.08A1.79,1.79,0,0,0,11,11.32ZM10,11.07a.94.94,0,0,1-.76.35.92.92,0,0,1-.76-.36,1.52,1.52,0,0,1-.29-1,1.53,1.53,0,0,1,.29-1,1,1,0,0,1,.78-.37.87.87,0,0,1,.75.37,1.62,1.62,0,0,1,.27,1A1.46,1.46,0,0,1,10,11.07Z" fill="url(#bf3846c3-4d74-4743-ab9a-f334c248bd92)"/></svg>
        ),
        color: 'blue',
        yearsOfExperience: 3
      },
      {
        name: 'GraphQL',
        proficiency: 4,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                <path fill="#ff4081" d="M24.5,45.161L7,34.82V14.18L24.5,3.839L42,14.18V34.82L24.5,45.161z M9,33.68l15.5,9.159L40,33.68 V15.32L24.5,6.161L9,15.32V33.68z"></path><circle cx="24.5" cy="5.5" r="3.5" fill="#ff4081"></circle><circle cx="24.5" cy="43.5" r="3.5" fill="#ff4081"></circle><circle cx="8.5" cy="33.5" r="3.5" fill="#ff4081"></circle><circle cx="40.5" cy="33.5" r="3.5" fill="#ff4081"></circle><circle cx="8.5" cy="15.5" r="3.5" fill="#ff4081"></circle><circle cx="40.5" cy="15.5" r="3.5" fill="#ff4081"></circle><path fill="#ff4081" d="M42.72,35H6.28L24.5,2.978L42.72,35z M9.72,33H39.28L24.5,7.022L9.72,33z"></path>
          </svg>
        ),
        color: 'red',
        yearsOfExperience: 3
      }
    ],
    tools: [
      {
        name: 'Git',
        proficiency: 4,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.721-.719-1.883 0-2.6.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.605-.406-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189L10.929 23.55c.603.604 1.582.604 2.188 0l10.43-10.43c.604-.603.604-1.582-.001-2.188z"/>
          </svg>
        ),
        color: 'orange',
        yearsOfExperience: 9
      },
      {
        name: 'Docker',
        proficiency: 3,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338 0-.676.033-1.01.098-.31-1.128-.995-2.057-2.05-2.765.2-.224.24-.694.065-1.186-.302-.084-.719-.015-.758.045-.28 1.06-.45 1.186-.472 1.238-.822-.519-1.808-.733-2.8-.733 0 0-.472.107-.472.197 0 .016.045.107.107.107.408 0 .834.022 1.25.076-.542.733-.811 1.543-.811 2.365 0 .405.056.810.168 1.193-.458.107-.89.272-1.274.482-.107.061-.413.142-.413.282 0 .045.016.107.107.107.015 0 .030-.015.045-.015.258 0 .524-.046.781-.122.30.45.719.84 1.186 1.128-.107.076-.199.168-.276.276-.015.030-.015.061-.015.091 0 .108.076.168.168.168.03 0 .061-.015.091-.030.153-.076.306-.168.459-.275.046-.030.091-.061.137-.091.030-.015.061-.015.091-.030.122.061.25.122.379.168.107-.076.168-.168.198-.258.030-.107.015-.214-.046-.32-.045-.076-.107-.153-.168-.214.030-.015.061-.030.091-.045.107.168.259.306.413.413.046.033.091.061.137.091.046.030.091.045.137.045.076 0 .137-.061.137-.168 0-.015 0-.030-.015-.045-.061-.107-.137-.214-.214-.32-.045-.061-.091-.122-.137-.183-.015-.015-.030-.045-.045-.061-.015-.015-.030-.030-.045-.045.061-.076.122-.153.168-.245.046-.092.076-.199.076-.307 0-.045-.015-.091-.045-.137-.030-.045-.076-.076-.122-.076-.091 0-.183.061-.275.122-.076.061-.153.122-.229.183-.046.045-.091.061-.137.091-.045.015-.091.030-.137.045-.153-.168-.321-.306-.504-.413-.045-.030-.091-.061-.137-.091-.061-.046-.122-.076-.183-.107-.015-.015-.030-.015-.045-.030 0-.015.015-.030.015-.045.061-.107.122-.214.153-.336.091-.61.107-1.268-.046-1.859-.122-.488-.351-.915-.688-1.274-.061-.076-.122-.137-.199-.198.061-.046.199-.107.214-.153.000-.046-.030-.076-.076-.076m-7.31 6.198c-.076-.061-.153-.122-.214-.199-.107-.153-.107-.351 0-.504.061-.076.153-.122.229-.168.076-.046.168-.076.26-.076.091 0 .168.030.229.076.107.076.199.199.199.32 0 .107-.046.214-.122.291-.076.092-.168.168-.259.214-.076.046-.168.076-.229.076-.091 0-.168-.015-.244-.061-.015-.015-.030-.015-.045-.030-.015-.015-.015-.030-.030-.045-.061-.046-.107-.107-.122-.168-.015-.061-.015-.122 0-.183.015-.061.045-.122.091-.168.046-.046.107-.076.168-.076.061 0 .122.030.168.076.045.046.076.107.076.168 0 .061-.030.122-.076.168-.045.046-.107.076-.168.076-.061 0-.122-.030-.168-.076-.046-.046-.076-.107-.076-.168 0-.061.030-.122.076-.168.046-.046.107-.076.168-.076.061 0 .122.030.168.076.046.046.076.107.076.168 0 .061-.030.122-.076.168-.046.046-.107.076-.168.076-.061 0-.122-.030-.168-.076-.046-.046-.076-.107-.076-.168 0-.061.030-.122.076-.168.046-.046.107-.076.168-.076.061 0 .122.030.168.076.045.046.076.107.076.168 0 .061-.030.122-.076.168-.046.046-.107.076-.168.076-.061 0-.122-.030-.168-.076-.046-.046-.076-.107-.076-.168 0-.061.030-.122.076-.168.046-.046.107-.076.168-.076.061 0 .122.030.168.076.046.046.076.107.076.168 0 .061-.030.122-.076.168-.046.046-.107.076-.168.076-.061 0-.122-.030-.168-.076-.046-.046-.076-.107-.076-.168"/>
          </svg>
        ),
        color: 'blue',
        yearsOfExperience: 3
      },
      {
        name: 'Azure',
        proficiency: 3,
        icon: (
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2"><g fillRule="nonzero"><path d="M52.091 10.225h40.684L50.541 135.361a6.5 6.5 0 01-6.146 4.412H12.732c-3.553 0-6.477-2.923-6.477-6.476 0-.704.115-1.403.34-2.07L45.944 14.638a6.501 6.501 0 016.147-4.415v.002z" fill="url(#prefix___Linear1)" transform="translate(2.076 1.626) scale(3.37462)"/><path d="M377.371 319.374H159.644c-5.527 0-10.076 4.549-10.076 10.077 0 2.794 1.164 5.466 3.206 7.37l139.901 130.577a21.986 21.986 0 0015.004 5.91H430.96l-53.589-153.934z" fill="#0078d4"/><path d="M52.091 10.225a6.447 6.447 0 00-6.161 4.498L6.644 131.12a6.457 6.457 0 00-.38 2.185c0 3.548 2.92 6.468 6.469 6.468H45.23a6.95 6.95 0 005.328-4.531l7.834-23.089 27.985 26.102a6.622 6.622 0 004.165 1.518h36.395l-15.962-45.615-46.533.011 28.48-83.944H52.091z" fill="url(#prefix___Linear2)" transform="translate(2.076 1.626) scale(3.37462)"/><path d="M104.055 14.631a6.492 6.492 0 00-6.138-4.406H52.575a6.493 6.493 0 016.138 4.406l39.35 116.594c.225.668.34 1.367.34 2.072 0 3.554-2.924 6.478-6.478 6.478h45.344c3.553-.001 6.476-2.925 6.476-6.478 0-.705-.115-1.404-.34-2.072l-39.35-116.594z" fill="url(#prefix___Linear3)" transform="translate(2.076 1.626) scale(3.37462)"/></g><defs><linearGradient id="prefix___Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="rotate(108.701 26.35 33.911) scale(131.7791)"><stop offset="0" stopColor="#114a8b"/><stop offset="1" stopColor="#0669bc"/></linearGradient><linearGradient id="prefix___Linear2" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="rotate(161.318 33.644 45.587) scale(10.31703)"><stop offset="0" stopOpacity=".3"/><stop offset=".07" stopOpacity=".2"/><stop offset=".32" stopOpacity=".1"/><stop offset=".62" stopOpacity=".05"/><stop offset="1" stopOpacity="0"/></linearGradient><linearGradient id="prefix___Linear3" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="rotate(69.426 25.69 62.036) scale(131.9816)"><stop offset="0" stopColor="#3ccbf4"/><stop offset="1" stopColor="#2892df"/></linearGradient></defs></svg>
        ),
        color: 'blue',
        yearsOfExperience: 3
      }
    ],
    specialization: [
      {
        name: 'AEM (Adobe Experience Manager)',
        proficiency: 3,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624z"/>
          </svg>
        ),
        color: 'red',
        yearsOfExperience: 3
      },
      {
        name: 'Full Stack Architecture',
        proficiency: 4,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ),
        color: 'red',
        yearsOfExperience: 9
      },
      {
        name: 'API Development',
        proficiency: 4,
        icon: (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M6.5 10.5h11v3h-11zm0-4h11v2h-11zm0 8h7v2h-7z"/>
          </svg>
        ),
        color: 'cyan',
        yearsOfExperience: 9
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
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
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