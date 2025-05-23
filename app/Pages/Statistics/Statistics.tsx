import React from "react";
import {
  faCalculator,
  faFlask,
  faBook,
  faGlobe,
  faLaptopCode,
  faPalette,
  faComments,
  faPhoneAlt,
  faShareAlt,
  faEnvelope,
  faSearch,
  faSlidersH,
  faFilter,
  faSort,
  faChartPie,
  faTable,
  faDatabase,
  faFileAlt,
  faCamera,
  faQuestion,
  faCogs,
  faCodeBranch,
  faUser,
  faGraduationCap,
  faHandshake,
  faUsers,
  faChartLine,
  faMoneyBill,
  faBriefcase,
  faBullhorn,
  faTools,
  faGavel,
  faLightbulb,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import StatisticsTopBar from "./components/StatisticsTopBar";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import CalendarHeatmap from "react-calendar-heatmap";
import { defaultColor } from "@/colors";
import StatisticsBoard from "./components/StatisticsBoard";
import StatisticsHabitArea from "./components/StatisticsHabitArea";

const Statistics = () => {
  return (
    <div className="w-full h-screen p-3">
      <StatisticsTopBar />
      <StatisticsBoard />
      <StatisticsHabitArea />
    </div>
  );
};

export default Statistics;
