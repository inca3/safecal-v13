import { NextResponse } from 'next/server';

export async function GET() {
  const exerciseOptions = [
    {
      value: 'Running',
      label: 'Running (min)',
      amount: 10,
      measure: 'min',
      cal: -80,
      base: 10,
      selection: {
        amount: 10,
        cal: -80,
      },
    },
    {
      value: 'Walking',
      label: 'Walking (min)',
      amount: 10,
      measure: 'min',
      cal: -50,
      base: 10,
      selection: {
        amount: 10,
        cal: -50,
      },
    },
    {
      value: 'Cycling',
      label: 'Cycling (min)',
      amount: 10,
      measure: 'min',
      cal: -75,
      base: 10,
      selection: {
        amount: 10,
        cal: -75,
      },
    },
    {
      value: 'Swimming',
      label: 'Swimming (min)',
      amount: 10,
      measure: 'min',
      cal: -90,
      base: 10,
      selection: {
        amount: 10,
        cal: -90,
      },
    },
    {
      value: 'Jumping jacks',
      label: 'Jumping jacks (min)',
      amount: 10,
      measure: 'min',
      cal: -100,
      base: 10,
      selection: {
        amount: 10,
        cal: -100,
      },
    },
    {
      value: 'Push-ups',
      label: 'Push-ups',
      amount: 10,
      measure: 'count',
      cal: -100,
      base: 10,
      selection: {
        amount: 10,
        cal: -100,
      },
    },
    {
      value: 'Sit-ups',
      label: 'Sit-ups',
      amount: 10,
      measure: 'count',
      cal: -50,
      base: 10,
      selection: {
        amount: 10,
        cal: -50,
      },
    },
    {
      value: 'Squats',
      label: 'Squats',
      amount: 10,
      measure: 'count',
      cal: -60,
      base: 10,
      selection: {
        amount: 10,
        cal: -60,
      },
    },
    {
      value: 'Burpees',
      label: 'Burpees',
      amount: 10,
      measure: 'count',
      cal: -80,
      base: 10,
      selection: {
        amount: 10,
        cal: -80,
      },
    },
    {
      value: 'Yoga',
      label: 'Yoga (min)',
      amount: 10,
      measure: 'min',
      cal: -50,
      base: 10,
      selection: {
        amount: 10,
        cal: -50,
      },
    },
  ];

  return NextResponse.json({ exerciseOptions });
}
