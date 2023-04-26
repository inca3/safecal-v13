type BlogPost = {
  id: number;
  title: string;
  sum?: string;
  date: string;
  author?: string;
  image: string;
  slug: string;
};

interface CalendarProps {
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
  days: Date[];
  goNextMonth: any;
  goPrevMonth: any;
  firstDayCurrentMonth: Date;
  datesWithData: string[];
}

interface TrackerProps {
  selectedDay: Date;
  user: User | any;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
  msg: string;
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

interface GraphProps {
  tracker: [
    {
      id: string;
      cal?: number;
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

interface CalorieProps {
  user: User | any;
  selectedDay: Date;
  msg: string;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
}
