import { IconProp } from "@fortawesome/fontawesome-svg-core";
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

type iconData = {
  faIcon: IconProp;
  isSelected: boolean;
};

export const iconData: iconData[] = [
  { faIcon: faFlask, isSelected: true },
  { faIcon: faBook, isSelected: false },
  { faIcon: faCalculator, isSelected: false },
  { faIcon: faGlobe, isSelected: false },
  { faIcon: faLaptopCode, isSelected: false },
  { faIcon: faPalette, isSelected: false },
  { faIcon: faComments, isSelected: false },
  { faIcon: faPhoneAlt, isSelected: false },
  { faIcon: faShareAlt, isSelected: false },
  { faIcon: faEnvelope, isSelected: false },
  { faIcon: faSearch, isSelected: false },
  { faIcon: faSlidersH, isSelected: false },
  { faIcon: faFilter, isSelected: false },
  { faIcon: faSort, isSelected: false },
  { faIcon: faChartPie, isSelected: false },
  { faIcon: faTable, isSelected: false },
  { faIcon: faDatabase, isSelected: false },
  { faIcon: faFileAlt, isSelected: false },
  { faIcon: faCamera, isSelected: false },
  { faIcon: faQuestion, isSelected: false },
  { faIcon: faCogs, isSelected: false },
  { faIcon: faCodeBranch, isSelected: false },
  { faIcon: faUser, isSelected: false },
  { faIcon: faGraduationCap, isSelected: false },
  { faIcon: faUsers, isSelected: false },
  { faIcon: faHandshake, isSelected: false },
  { faIcon: faChartLine, isSelected: false },
  { faIcon: faMoneyBill, isSelected: false },
  { faIcon: faBriefcase, isSelected: false },
  { faIcon: faBullhorn, isSelected: false },
  { faIcon: faTools, isSelected: false },
  { faIcon: faGavel, isSelected: false },
  { faIcon: faLightbulb, isSelected: false },
  { faIcon: faPlaneDeparture, isSelected: false },
];

export function textToIcon(iconText: string): IconProp | string {
  switch (iconText) {
    case "faCalculator":
      return faCalculator;
    case "faFlask":
      return faFlask;
    case "faBook":
      return faBook;
    case "faGlobe":
      return faGlobe;
    case "faLaptopCode":
      return faLaptopCode;
    case "faPalette":
      return faPalette;
    case "faComments":
      return faComments;
    case "faPhoneAlt":
      return faPhoneAlt;
    case "faShareAlt":
      return faShareAlt;
    case "faEnvelope":
      return faEnvelope;
    case "faSearch":
      return faSearch;
    case "faSlidersH":
      return faSlidersH;
    case "faFilter":
      return faFilter;
    case "faSort":
      return faSort;
    case "faChartPie":
      return faChartPie;
    case "faTable":
      return faTable;
    case "faDatabase":
      return faDatabase;
    case "faFileAlt":
      return faFileAlt;
    case "faCamera":
      return faCamera;
    case "faQuestion":
      return faQuestion;
    case "faCogs":
      return faCogs;
    case "faCodeBranch":
      return faCodeBranch;
    case "faUser":
      return faUser;
    case "faGraduationCap":
      return faGraduationCap;
    case "faHandshake":
      return faHandshake;
    case "faUsers":
      return faUsers;
    case "faChartLine":
      return faChartLine;
    case "faMoneyBill":
      return faMoneyBill;
    case "faBriefcase":
      return faBriefcase;
    case "faBullhorn":
      return faBullhorn;
    case "faTools":
      return faTools;
    case "faGavel":
      return faGavel;
    case "faLightbulb":
      return faLightbulb;
    case "faPlaneDeparture":
      return faPlaneDeparture;
    default:
      return faPlaneDeparture; // fallback if no match found
  }
}

export function iconToText(icon: any): string {
  switch (icon.iconName) {
    case "Calculator":
      return "faCalculator";
    case "Flask":
      return "faFlask";
    case "faBook":
      return "faBook";
    case "faGlobe":
      return "faGlobe";
    case "faLaptopCode":
      return "faLaptopCode";
    case "faPalette":
      return "faPalette";
    case "faComments":
      return "faComments";
    case "faPhoneAlt":
      return "faPhoneAlt";
    case "faShareAlt":
      return "faShareAlt";
    case "faEnvelope":
      return "faEnvelope";
    case "faSearch":
      return "faSearch";
    case "faSlidersH":
      return "faSlidersH";
    case "faFilter":
      return "faFilter";
    case "faSort":
      return "faSort";
    case "faChartPie":
      return "faChartPie";
    case "faTable":
      return "faTable";
    case "faDatabase":
      return "faDatabase";
    case "faFileAlt":
      return "faFileAlt";
    case "faCamera":
      return "faCamera";
    case "faQuestion":
      return "faQuestion";
    case "faCogs":
      return "faCogs";
    case "faCodeBranch":
      return "faCodeBranch";
    case "faUser":
      return "faUser";
    case "faGraduationCap":
      return "faGraduationCap";
    case "faHandshake":
      return "faHandshake";
    case "faUsers":
      return "faUsers";
    case "faChartLine":
      return "faChartLine";
    case "faMoneyBill":
      return "faMoneyBill";
    case "faBriefcase":
      return "faBriefcase";
    case "faBullhorn":
      return "faBullhorn";
    case "faTools":
      return "faTools";
    case "faGavel":
      return "faGavel";
    case "faLightbulb":
      return "faLightbulb";
    case "faPlaneDeparture":
      return "faPlaneDeparture";
    default:
      return "faPlaneDeparture"; // fallback string
  }
}
