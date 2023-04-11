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

import { auth, db } from '@/utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

import Select from 'react-select';
import {
  DocumentData,
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { User } from 'firebase/auth';

interface CalendarProps {
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
  days: Date[];
  goNextMonth: any;
  goPrevMonth: any;
  firstDayCurrentMonth: Date;
}

interface TrackerProps {
  selectedDay: Date;
  tracker: [
    {
      id: string;
      cal: number;
      amount: number;
      measure: string;
      carbs?: number;
      fat?: number;
      protein?: number;
      type: string;
      name: string;
      userRef: string;
      time?: number;
    }
  ];
}

const AppHome = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const [dailyData, setDailyData] = useState<QuerySnapshot<DocumentData>[]>([]);

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
  }, [user, loading]);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, 'datas', user.uid);
      const collectionRef = collection(
        docRef,
        format(selectedDay, 'dd-MM-yyyy')
      );
      const q = query(collectionRef);
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setDailyData(snapshot.docs.map((doc) => doc.data()));
        console.log(dailyData);
      });
      return unsubscribe;
    };
    if (user) {
      getData();
    }
  }, [selectedDay]);

  if (loading) return;

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
      <Tracker tracker={dailyData} selectedDay={selectedDay} />
      <AddCalories user={user} selectedDay={selectedDay} />
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
      <div className='grid grid-cols-7 gap-4 lg:gap-6 [&>*]:flex [&>*]:items-center [&>*]:justify-center'>
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
            'font-bold text-darkGreen underline'
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
              {/* {data.find(
                (data) =>
                  format(new Date(data.date), 'dd-MM-yyyy') ==
                  format(day, 'dd-MM-yyyy')
              ) && (
                <BsDot className='absolute bottom-0 w-full text-center text-darkGreen' />
              )} */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Tracker: React.FC<TrackerProps> = ({ tracker, selectedDay }) => {
  if (tracker.length < 1) {
    return (
      <h1 className='place-self-center text-xl font-bold text-darkText'>
        No information found for selected day.
      </h1>
    );
  }
  return (
    <div className='my-4 flex flex-col gap-2 rounded bg-lightSkin p-4'>
      <h1 className='text-lg font-bold text-darkGreen'>
        {format(selectedDay, 'dd MMMM yyyy')}
      </h1>
      <ul className='flex flex-col gap-2'>
        <h2>Meals</h2>
        {tracker
          ?.filter((item: { type: string }) => item.type == 'meal')
          .map((meal) => (
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
            {tracker
              ?.filter((item: { type: string }) => item.type == 'water')
              .reduce((a, b) => (a = a + Number(b.amount)), 0)}{' '}
            ml
          </span>
        </li>
        <h2>Exercises</h2>
        {tracker
          ?.filter((item: { type: string }) => item.type == 'exercise')
          .map((exercise) => (
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

interface CalorieProps {
  user: User;
  selectedDay: Date;
}

const AddCalories: React.FC<CalorieProps> = ({ user, selectedDay }) => {
  const initialMeal = {
    value: '',
    label: '',
    amount: 1,
    measure: '',
    cal: 1,
    protein: 1,
    carbs: 1,
    fat: 1,
    base: 1,
    selection: {
      amount: 1,
      protein: 1,
      carbs: 1,
      fat: 1,
      cal: 1,
    },
  };
  const [msg, setMsg] = useState('');
  const [meal, setMeal] = useState(initialMeal);
  const addMeal = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const firstCollectionRef = doc(db, 'datas', user.uid);
    const collectionRef = collection(
      firstCollectionRef,
      format(selectedDay, 'dd-MM-yyyy')
    );
    const docRef = await addDoc(collectionRef, {
      name: meal.label,
      ...meal.selection,
      measure: meal.measure,
      type: 'meal',
      userRef: user.uid,
    });
    await updateDoc(docRef, {
      id: docRef.id,
    });
    setMsg('Meal successfuly added.');
  };

  const handleChangeMeal = (selectedOption: any) => {
    setMeal(selectedOption);
  };
  const options = [
    {
      value: 'Yulaf',
      label: 'Yulaf',
      amount: 100,
      measure: 'gr',
      cal: 180,
      protein: 24,
      carbs: 64,
      fat: 12,
      base: 100,
      selection: {
        amount: 100,
        protein: 24,
        carbs: 64,
        fat: 12,
        cal: 180,
      },
    },
    {
      value: 'Muz',
      label: 'Muz',
      amount: '1',
      measure: 'piece',
      cal: 90,
      protein: 10,
      carbs: 70,
      fat: 10,
      base: 1,
      selection: {
        amount: 1,
        protein: 10,
        carbs: 70,
        fat: 10,
        cal: 90,
      },
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => setMsg(''), 3000);
    return () => clearTimeout(timeout);
  }, [msg]);

  return (
    <section className='w-full text-darkText lg:col-span-2'>
      <div className='grid grid-cols-1 items-start justify-center gap-6 text-center md:grid-cols-3 [&>]:w-full'>
        <div className='flex flex-col gap-2'>
          <h1 className='my-4 text-lg font-bold text-darkText md:text-xl'>
            Add Calories
          </h1>
          <form className='flex flex-col gap-4 text-left' onSubmit={addMeal}>
            <Select
              options={options}
              name='meals'
              placeholder='Search Food / Drink'
              onChange={handleChangeMeal}
              className='rounded border-darkText'
            />
            <div className='flex items-center gap-2'>
              <input
                type='number'
                min={0}
                value={meal.selection?.amount || 0}
                onChange={(e: React.BaseSyntheticEvent) =>
                  setMeal((prevState: any) => ({
                    ...prevState,
                    selection: {
                      amount: e.target.value,
                      cal: Math.floor(
                        (prevState.cal / prevState.base) * e.target.value
                      ),
                      protein: Math.floor(
                        (prevState.protein / prevState.base) * e.target.value
                      ),
                      carbs: Math.floor(
                        (prevState.carbs / prevState.base) * e.target.value
                      ),
                      fat: Math.floor(
                        (prevState.fat / prevState.base) * e.target.value
                      ),
                    },
                  }))
                }
                className='w-1/5 rounded border-darkText'
              />
              <p>{meal.measure}</p>
            </div>
            <div className='grid grid-cols-3'>
              <p className=''>Protein: {meal.selection.protein}</p>
              <p className=''>Carbs: {meal.selection.carbs}</p>
              <p className=''>Fat: {meal.selection.fat}</p>
            </div>
            <p className=''>Total: {meal.selection.cal} cal</p>
            <button className='rounded bg-darkGreen px-4 py-2 font-bold text-lightSkinLighter'>
              Add
            </button>
            <p>{msg}</p>
          </form>
        </div>
        <div>
          <h1 className='my-4 text-lg font-bold text-darkText md:text-xl'>
            Add Water
          </h1>
        </div>
        <div>
          <h1 className='my-4 text-lg font-bold text-darkText md:text-xl'>
            Add Exercises
          </h1>
          sa
        </div>
      </div>
    </section>
  );
};
