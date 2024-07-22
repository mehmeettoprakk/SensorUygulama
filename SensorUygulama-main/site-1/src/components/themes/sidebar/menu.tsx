interface Children {
  icon?: string;
  path?: string;
  title: string;
  type?: string;
  blank?: string;
  id?: any;
  children?: Array<Children>;
}
export interface Menu {
  path: string;
  icon: string;
  title: string;
  type?: string;
  exact?: any;
  navheader?: boolean;
  id?: any;
  children?: Array<Children>;
}
const menu: Array<Menu> = [
  {
    path: "/dashboard",
    icon: "nav-icon fas fa-tools",
    title: "Dashboard",
  },

  {
    icon: "nav-icon fa fa-cogs",
    title: "Motorlar",
    path: "/motorlar",
  },
  {
    icon: "nav-icon fa fa-bolt",
    path: "/sensorler",
    title: "Sensörler",
  },
  {
    icon: "nav-icon fa fa-tachometer-alt",
    path: "/simulator",
    title: "Simülatör",
  },
];

export default menu;
