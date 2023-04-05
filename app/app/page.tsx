'use client';

import {
  startOfToday,
  format,
  endOfMonth,
  eachDayOfInterval,
  endOfWeek,
  startOfWeek,
  isToday,
  isSameMonth,
  isEqual,
  parse,
  add,
  parseISO,
} from 'date-fns';
import { useState, useEffect } from 'react';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { BsDot } from 'react-icons/bs';

import { auth } from '@/utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

interface CalendarProps {
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
  days: Date[];
  goNextMonth: any;
  goPrevMonth: any;
  firstDayCurrentMonth: Date;
}

interface TrackerProps {
  tracker: {
    id: number;
    date: string;
    userID: string;
    meals: [
      {
        name: string;
        id: string;
        amount: string;
        measure: string;
        cal: number;
        protein: number;
        carbs: number;
        fat: number;
      }
    ];
    water: [
      {
        name: string;
        amount: number;
        measure: string;
      }
    ];
    exercises: [
      {
        name: string;
        id: string;
        time: number;
        measure: string;
        cal: number;
      }
    ];
  };
}

const AppHome = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function goNextMonth(): void {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyy'));
  }

  function goPrevMonth(): void {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyy'));
  }

  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
    }
  }, [user]);

  return (
    <div className='container grid grid-cols-1 justify-center gap-10 py-10 px-10 md:py-16 lg:grid-cols-2'>
      <Calendar
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        days={days}
        goNextMonth={goNextMonth}
        goPrevMonth={goPrevMonth}
        firstDayCurrentMonth={firstDayCurrentMonth}
      />
      <Tracker
        tracker={data.find(
          (data) =>
            format(new Date(data.date), 'dd-MM-yyyy') ==
            format(selectedDay, 'dd-MM-yyyy')
        )}
      />
      <AddCalories />
    </div>
  );
};
export default AppHome;

const Calendar: React.FC<CalendarProps> = ({
  selectedDay,
  setSelectedDay,
  days,
  goNextMonth,
  goPrevMonth,
  firstDayCurrentMonth,
}) => {
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <div>
      <div className='mb-10 flex items-center justify-between'>
        <p className='text-lg font-bold'>
          {format(firstDayCurrentMonth, 'MMMM yyyy')}
        </p>
        <div className='flex gap-6'>
          <button className='p-2' onClick={goPrevMonth}>
            <IoIosArrowBack className='h-8 w-8 rounded-full p-2 transition-all hover:bg-darkSkin hover:text-white' />
          </button>
          <button className='p-2' onClick={goNextMonth}>
            <IoIosArrowForward className='h-8 w-8 rounded-full p-2 transition-all hover:bg-darkSkin hover:text-white' />
          </button>
        </div>
      </div>
      <div className='grid grid-cols-7 gap-6 [&>*]:flex [&>*]:items-center [&>*]:justify-center'>
        {weekDays.map((weekDay, i) => (
          <p key={i} className='font-bold'>
            {weekDay}
          </p>
        ))}
        {days.map((day) => (
          <div key={day.toString()} className='aspect-square'>
            <button
              className={` relative h-full w-full rounded-full transition-all hover:bg-darkSkin hover:text-white
          ${isEqual(day, selectedDay) && 'bg-darkGreen text-white'}
          ${
            !isEqual(day, selectedDay) &&
            isToday(day) &&
            'font-bold text-darkGreen'
          }
          ${
            !isEqual(day, selectedDay) &&
            !isToday(day) &&
            isSameMonth(day, firstDayCurrentMonth) &&
            'text-darkText'
          }
          ${
            !isEqual(day, selectedDay) &&
            !isToday(day) &&
            !isSameMonth(day, firstDayCurrentMonth) &&
            'text-gray-300'
          }

          `}
              onClick={() => {
                setSelectedDay(day);
              }}
            >
              <time dateTime={format(day, 'dd-MM-yyyy')}>
                {format(day, 'd')}
              </time>
              {data.find(
                (data) =>
                  format(new Date(data.date), 'dd-MM-yyyy') ==
                  format(day, 'dd-MM-yyyy')
              ) && (
                <BsDot className='absolute bottom-0 w-full text-center text-darkGreen' />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Tracker: React.FC<TrackerProps> = ({ tracker }) => {
  if (tracker == undefined) {
    return (
      <h1 className='place-self-center text-xl font-bold text-darkText'>
        No information found for selected day.
      </h1>
    );
  }
  return (
    <div className='my-4 flex flex-col gap-2 rounded bg-lightSkin p-4'>
      <h1 className='text-lg font-bold text-darkGreen'>
        {format(parseISO(tracker.date), 'dd MMMM yyyy')}
      </h1>
      <ul className='flex flex-col gap-2'>
        <h2>Meals</h2>
        {tracker.meals.map((meal) => (
          <li
            key={meal.id}
            className='flex justify-between rounded-md bg-lightSkinLighter px-4 py-2'
          >
            <p>
              {meal.name}{' '}
              <span className='text-sm'>
                ({meal.amount + ' ' + meal.measure})
              </span>
            </p>
            <p>{meal.cal} cal</p>
          </li>
        ))}
        <h2>Water</h2>
        <li className='flex justify-between rounded-md bg-lightSkinLighter px-4 py-2'>
          <p>Water</p>
          <span className=''>
            {tracker.water.reduce((a, b) => (a = a + Number(b.amount)), 0)} ml
          </span>
        </li>
        <h2>Exercises</h2>
        {tracker.exercises.map((exercise) => (
          <li
            key={exercise.id}
            className='flex justify-between rounded-md bg-lightSkinLighter px-4 py-2'
          >
            <p>
              {exercise.name}{' '}
              <span className='text-sm'>
                ({exercise.time + ' ' + exercise.measure})
              </span>
            </p>
            <p>{exercise.cal} cal</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AddCalories = () => {
  return (
    <section className='w-full lg:col-span-2'>
      <div className='grid grid-cols-1 items-center justify-center bg-yellow-600 text-center md:grid-cols-3 [&>]:w-full'>
        <form>
          <h1>Add Calories</h1>
          {/* yiyecek arama, miktar seçme*/}
        </form>
        <form>
          <h1>Add Water</h1>
        </form>
        <form>
          <h1>Add Exercises</h1>
        </form>
      </div>
    </section>
  );
};

const data = [
  {
    id: 711,
    date: '2023-03-21',
    userID: '',
    meals: [
      {
        name: 'Yulaf',
        id: 'm14',
        amount: '80',
        measure: 'gr',
        cal: 180,
        protein: 14,
        carbs: 54,
        fat: 12,
      },
      {
        name: 'Muz',
        id: 'm15',
        amount: '1',
        measure: 'piece',
        cal: 90,
        protein: 10,
        carbs: 70,
        fat: 10,
      },
    ],
    water: [
      { name: 'Water', amount: 350, measure: 'ml' },
      { name: 'Water', amount: 450, measure: 'ml' },
    ],
    exercises: [
      { name: 'Running', id: 'e12', time: 30, measure: 'minutes', cal: -140 },
      {
        name: 'Jumping Jacks',
        id: 'e11',
        time: 20,
        measure: 'times',
        cal: -20,
      },
    ],
  },
  {
    id: 712,
    date: '2023-03-24',
    userID: '',
    meals: [
      {
        name: 'Yulaf',
        id: 'm14-2',
        amount: '80',
        measure: 'gr',
        cal: 180,
        protein: 14,
        carbs: 54,
        fat: 12,
      },
    ],
    water: [{ name: 'Water', amount: '450', measure: 'ml' }],
    exercises: [
      { name: 'Running', id: 'e12-2', time: 30, measure: 'minutes', cal: -140 },
    ],
  },
];
