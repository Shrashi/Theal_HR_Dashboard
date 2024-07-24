import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import SafetyDividerOutlinedIcon from "@mui/icons-material/SafetyDividerOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
export const noHeaderFooterUrls = ["/sign-in", "/sign-up", "/recover-password"];

export const headerNavItems = {
  navItems: [
    {
      link: {
        newTab: false,
        url: "/dashboard",
        label: "Dashboard",
        icon: DashboardOutlinedIcon,
      },
      id: "dashboard",
    },
    {
      link: {
        newTab: false,
        url: "/performance",
        label: "Performance",
        icon: SummarizeOutlinedIcon,
      },
      id: "performance",
    },
    {
      link: {
        newTab: false,
        url: "/development",
        label: "Development",
        icon: EngineeringOutlinedIcon,
      },
      id: "development",
    },
    {
      link: {
        newTab: false,
        url: "/demographics",
        label: "Demographics",
        icon: PeopleOutlinedIcon,
      },
      id: "demographics",
    },
    {
      link: {
        newTab: false,
        url: "/diversity",
        label: "Diversity",
        icon: Diversity3OutlinedIcon,
      },
      id: "diversity",
    },
    {
      link: {
        newTab: false,
        url: "/women-workforce",
        label: "Women",
        icon: WcOutlinedIcon,
      },
      id: "womenWorkforce",
    },
    {
      link: {
        newTab: false,
        url: "/salarycomparison",
        label: "Salary Comparison",
        icon: SafetyDividerOutlinedIcon,
      },
      id: "genderSalaryComparison",
    },
  ],
};

export const adminNavItems = [
  {
    link: {
      newTab: false,
      url: "/admin",
      label: "Admin",
      icon: AdminPanelSettingsOutlinedIcon,
    },
    id: "admin",
  },
];
