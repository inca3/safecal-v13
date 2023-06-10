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
} from 'date-fns';
import { useState, useEffect } from 'react';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { CiCircleRemove } from 'react-icons/ci';
import { BsDot } from 'react-icons/bs';

import { auth, db } from '@/utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { User } from 'firebase/auth';
import { Auth } from 'firebase/auth';

import Select from 'react-select';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  getCountFromServer,
} from 'firebase/firestore';

const AppHome = () => {
  const router = useRouter();

  const [user, loading] = useAuthState(auth);
  const [dailyData, setDailyData] = useState<any>([]);

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

  const [datesWithData, setDatesWithData] = useState<any[]>([]);
  const [msg, setMsg] = useState('');

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
        setDailyData(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      return unsubscribe;
    };
    if (user) {
      getData();
    }
  }, [selectedDay]);

  useEffect(() => {
    const getCollectionCount = async (dayName: Date) => {
      const col = collection(
        doc(db, 'datas', user.uid),
        format(dayName, 'dd-MM-yyyy')
      );
      const snapshot = await getCountFromServer(col);
      if (snapshot.data().count > 0) {
        setDatesWithData((data) => [...data, format(dayName, 'dd-MM-yyyy')]);
      }
    };
    if (user) {
      days.forEach((day) => getCollectionCount(day));
    }
  }, [currentMonth]);

  if (loading) return <></>;

  return (
    <div className='container mx-auto grid grid-cols-1 gap-10 py-10 md:py-16 lg:grid-cols-2 lg:px-10'>
      <Calendar
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        days={days}
        goNextMonth={goNextMonth}
        goPrevMonth={goPrevMonth}
        firstDayCurrentMonth={firstDayCurrentMonth}
        datesWithData={datesWithData}
      />
      <Tracker
        tracker={dailyData}
        selectedDay={selectedDay}
        user={user}
        setMsg={setMsg}
        msg={msg}
      />
      <Graphs tracker={dailyData} />
      <AddCalories
        user={user}
        selectedDay={selectedDay}
        msg={msg}
        setMsg={setMsg}
      />
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
  datesWithData,
}) => {
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className='col-span-1'>
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
              {datesWithData.find(
                (data) => data == format(day, 'dd-MM-yyyy')
              ) && (
                <BsDot className='absolute -bottom-2 w-full text-center text-3xl text-darkGreen md:bottom-0' />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Tracker: React.FC<TrackerProps> = ({
  tracker,
  selectedDay,
  user,
  setMsg,
  msg,
}) => {
  const removeAny = async (id: string) => {
    try {
      const docRef = doc(db, 'datas', user.uid);
      await deleteDoc(doc(docRef, format(selectedDay, 'dd-MM-yyyy'), id));
      setMsg('Data removed.');
    } catch (error) {
      console.log(error);
    }
  };
  if (tracker.length < 1) {
    return (
      <h1 className='place-self-center text-center text-xl font-bold text-darkText'>
        No information found for selected day.
      </h1>
    );
  }
  return (
    <div className='my-4 flex w-full flex-col gap-2 rounded bg-lightSkin p-4'>
      <h1 className='text-lg font-bold text-darkGreen'>
        {format(selectedDay, 'dd MMMM yyyy')}
      </h1>
      <ul className='flex flex-col gap-2'>
        {tracker.filter((item) => item.type == 'meal').length > 0 && (
          <>
            <h2 className='font-bold text-darkText'>Meals</h2>
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
                  <p className='flex items-center gap-2'>
                    {meal.cal} cal{' '}
                    <button
                      className='p-1 text-lg text-red-600'
                      onClick={() => removeAny(meal.id)}
                    >
                      <CiCircleRemove />
                    </button>
                  </p>
                </li>
              ))}
          </>
        )}
        {tracker.filter((item) => item.type == 'water').length > 0 && (
          <>
            <h2 className='font-bold text-darkText'>Water</h2>
            <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
              {tracker
                ?.filter((item) => item.type == 'water')
                .map((water) => (
                  <li
                    key={water.id}
                    className='flex justify-between rounded-md bg-lightSkinLighter px-4 py-2'
                  >
                    <p>Water</p>
                    <p className='flex items-center gap-2'>
                      {water.amount} ml{' '}
                      <button
                        className='p-1 text-lg text-red-600'
                        onClick={() => removeAny(water.id)}
                      >
                        <CiCircleRemove />
                      </button>
                    </p>
                  </li>
                ))}
            </div>
          </>
        )}
        {tracker.filter((item) => item.type == 'exercise').length > 0 && (
          <>
            <h2 className='font-bold text-darkText'>Exercises</h2>
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
                      ({exercise.amount + ' ' + exercise.measure})
                    </span>
                  </p>
                  <p className='flex items-center gap-2'>
                    {exercise.cal} cal{' '}
                    <button
                      className='p-1 text-lg text-red-600'
                      onClick={() => removeAny(exercise.id)}
                    >
                      <CiCircleRemove />
                    </button>{' '}
                  </p>
                </li>
              ))}
          </>
        )}
      </ul>
    </div>
  );
};

const Graphs: React.FC<GraphProps> = ({ tracker }) => {
  return (
    <div className='my-10 grid grid-cols-3 justify-items-center gap-10 lg:col-span-2'>
      <div className='flex h-28 w-28 items-center justify-center rounded-full border-4 border-darkGreen md:h-40 md:w-40 md:text-xl'>
        {tracker
          ?.filter((item: { type: string }) => item.type == 'meal')
          .reduce((a, b) => (a = a + Number(b.cal)), 0)}{' '}
        cals
      </div>
      <div className='flex h-28 w-28 items-center justify-center rounded-full border-4 border-darkGreen md:h-40 md:w-40 md:text-xl'>
        {tracker
          ?.filter((item: { type: string }) => item.type == 'water')
          .reduce((a, b) => (a = a + Number(b.amount)), 0)}{' '}
        ml
      </div>
      <div className='flex h-28 w-28 items-center justify-center rounded-full border-4 border-darkGreen md:h-40 md:w-40 md:text-xl'>
        {tracker
          ?.filter((item: { type: string }) => item.type == 'exercise')
          .reduce((a, b) => (a = a + Number(b.cal)), 0)}{' '}
        cals
      </div>
    </div>
  );
};

const AddCalories: React.FC<CalorieProps> = ({
  user,
  selectedDay,
  setMsg,
  msg,
}) => {
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
  const initialExercise = {
    value: '',
    label: '',
    amount: 1,
    measure: '',
    cal: 1,
    base: 1,
    selection: {
      amount: 1,
      cal: 1,
    },
  };

  const [meal, setMeal] = useState(initialMeal);
  const [water, setWater] = useState({ label: '', value: 0 });
  const [exercise, setExercise] = useState(initialExercise);

  const [mealOptions, setMealOptions] = useState([]);
  const [waterOptions, setWaterOptions] = useState([]);
  const [exerciseOptions, setExerciseOptions] = useState([]);

  const addMeal = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const firstCollectionRef = doc(db, 'datas', user.uid);
      const collectionRef = collection(
        firstCollectionRef,
        format(selectedDay, 'dd-MM-yyyy')
      );
      await addDoc(collectionRef, {
        name: meal.value,
        ...meal.selection,
        measure: meal.measure,
        type: 'meal',
        userRef: user.uid,
      });
      setMsg('Meal successfuly added.');
    } catch (error) {
      console.log(error);
    }
  };

  const addWater = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const firstCollectionRef = doc(db, 'datas', user.uid);
      const collectionRef = collection(
        firstCollectionRef,
        format(selectedDay, 'dd-MM-yyyy')
      );
      await addDoc(collectionRef, {
        amount: water.value,
        type: 'water',
        userRef: user.uid,
      });
      setMsg('Water successfuly added.');
    } catch (error) {
      console.log(error);
    }
  };

  const addExercise = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const firstCollectionRef = doc(db, 'datas', user.uid);
      const collectionRef = collection(
        firstCollectionRef,
        format(selectedDay, 'dd-MM-yyyy')
      );
      await addDoc(collectionRef, {
        name: exercise.value,
        ...exercise.selection,
        measure: exercise.measure,
        type: 'exercise',
        userRef: user.uid,
      });
      setMsg('Exercise successfuly added.');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeMeal = (selectedOption: any) => {
    setMeal(selectedOption);
  };
  const handleChangeWater = (selectedOption: any) => {
    setWater(selectedOption);
  };
  const handleChangeExercise = (selectedOption: any) => {
    setExercise(selectedOption);
  };

  useEffect(() => {
    // set options
    const getMealOptions = async () => {
      const res = await fetch('api/meals');
      const data = await res.json();
      setMealOptions(data.mealOptions);
    };
    const getWaterOptions = async () => {
      const res = await fetch('api/water');
      const data = await res.json();
      setWaterOptions(data.waterOptions);
    };
    const getExerciseOptions = async () => {
      const res = await fetch('api/exercises');
      const data = await res.json();
      setExerciseOptions(data.exerciseOptions);
    };
    getMealOptions();
    getWaterOptions();
    getExerciseOptions();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setMsg(''), 3000);
    return () => clearTimeout(timeout);
  }, [msg]);

  return (
    <div className='w-full text-darkText lg:col-span-2'>
      <div className='grid grid-cols-1 justify-center gap-6 text-center md:auto-rows-auto md:grid-cols-3 [&>]:h-full [&>]:w-full'>
        <div className='flex flex-col gap-2 px-4'>
          <h1 className='my-4 text-lg font-bold text-darkText md:text-xl'>
            Add Calories
          </h1>
          <form className='flex flex-col gap-4 text-left' onSubmit={addMeal}>
            <div className='flex items-center gap-2'>
              <Select
                options={mealOptions}
                name='meals'
                placeholder='Food/Drink'
                onChange={handleChangeMeal}
                className='w-full rounded border-darkText py-1.5'
              />
              <input
                type='number'
                min={0}
                value={meal.selection?.amount || 0}
                onChange={(e: React.BaseSyntheticEvent) =>
                  setMeal((prevState: any) => ({
                    ...prevState,
                    selection: {
                      amount: e.target.value,
                      cal: (
                        (prevState.cal / prevState.base) *
                        e.target.value
                      ).toFixed(2),
                      protein: (
                        (prevState.protein / prevState.base) *
                        e.target.value
                      ).toFixed(2),
                      carbs: (
                        (prevState.carbs / prevState.base) *
                        e.target.value
                      ).toFixed(2),
                      fat: (
                        (prevState.fat / prevState.base) *
                        e.target.value
                      ).toFixed(2),
                    },
                  }))
                }
                className='w-2/5 rounded border-darkText/25 py-1.5'
              />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3'>
              <p>Protein: {meal.selection.protein}</p>
              <p>Carbs: {meal.selection.carbs}</p>
              <p>Fat: {meal.selection.fat}</p>
            </div>
            <p>Total: {meal.selection.cal} cal</p>
            <button className='w-full rounded bg-darkGreen px-4 py-2 font-bold text-lightSkinLighter'>
              Add
            </button>
          </form>
        </div>
        <div className='flex h-full flex-col gap-2 px-4'>
          <h1 className='my-4 text-lg font-bold text-darkText md:text-xl'>
            Add Water
          </h1>
          <form
            className='flex h-full w-full flex-col gap-4 text-left'
            onSubmit={addWater}
          >
            <div className='flex items-center gap-2'>
              <Select
                options={waterOptions}
                name='water'
                placeholder='Water'
                onChange={handleChangeWater}
                className='w-full rounded border-darkText py-1.5'
              />
            </div>
            <button className='mt-auto w-full rounded bg-darkGreen px-4 py-2 font-bold text-lightSkinLighter'>
              Add
            </button>
          </form>
        </div>
        <div className='flex h-full flex-col gap-2 px-4'>
          <h1 className='my-4 text-lg font-bold text-darkText md:text-xl'>
            Add Exercises
          </h1>
          <form
            className='flex h-full w-full flex-col gap-4 text-left'
            onSubmit={addExercise}
          >
            <div className='flex items-center gap-2'>
              <Select
                options={exerciseOptions}
                name='exercise'
                placeholder='Exercise'
                onChange={handleChangeExercise}
                className='w-full rounded border-darkText py-1.5'
              />
              <input
                type='number'
                min={1}
                value={exercise.selection?.amount || 0}
                onChange={(e: React.BaseSyntheticEvent) =>
                  setExercise((prevState: any) => ({
                    ...prevState,
                    selection: {
                      amount: e.target.value,
                      cal: Math.ceil(
                        (prevState.cal / prevState.base) * e.target.value
                      ).toFixed(0),
                    },
                  }))
                }
                className='w-2/5 rounded border-darkText/25 py-1.5'
              />
            </div>
            <p>Total: {exercise.selection.cal} cal</p>
            <button className='mt-auto w-full rounded bg-darkGreen px-4 py-2 font-bold text-lightSkinLighter'>
              Add
            </button>
          </form>
        </div>
        <p className='pointer-events-none fixed top-10 right-10 rounded-md bg-darkGreen p-4 py-2 text-center text-lightSkinLighter opacity-100 transition-opacity duration-300 empty:opacity-0 md:col-span-3'>
          {msg}
        </p>
      </div>
    </div>
  );
};
