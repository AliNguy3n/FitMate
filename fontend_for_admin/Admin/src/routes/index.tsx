/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";

// components
import PrivateRoute from "./PrivateRoute";
import TicketsApp from "../pages/apps/Tickets";
import UsersApp from "../pages/users";

// user pages
const UserDetail = React.lazy(() => import("../pages/users/UserDetail"));
const EditUSer = React.lazy(() => import("../pages/users/EditUser"));
const InactiveUsers = React.lazy(() => import("../pages/users/InActiveUser"));
const RolePermission = React.lazy(() => import("../pages/users/RolePermission"));
// lazy load all the views

// products
const Products = React.lazy(() => import("../pages/products/Products"));
const AddEditProduct = React.lazy(() => import("../pages/products/AddEditProduct"));
const Equipment = React.lazy(() => import("../pages/products/Equipments"));
const AddEditEquipment = React.lazy(() => import("../pages/products/AddEditEquipment"));
const Promotion = React.lazy(() => import("../pages/products/Promotions"));
const AddEditPromotion = React.lazy(() => import("../pages/products/AddEditPromotion"));
const Supplier = React.lazy(() => import("../pages/products/Suppliers"));
const AddEditSupplier = React.lazy(() => import("../pages/products/AddEditSupplier"));
const Supplement = React.lazy(() => import("../pages/products/Supplements"));
const AddEditSupplement = React.lazy(() => import("../pages/products/AddEditSupplement"));

// auth
const Login = React.lazy(() => import("../pages/auth/Login"));
const Register = React.lazy(() => import("../pages/auth/Register"));
const RecoverPassword = React.lazy(() => import("../pages/auth/RecoverPassword"));
const LockScreen = React.lazy(() => import("../pages/auth/LockScreen"));


// dashboard 
const Dashboard = React.lazy(() => import("../pages/dashboard/"));

// apps 
const CalendarApp = React.lazy(() => import('../pages/apps/Calendar'));
const FileManagerApp = React.lazy(() => import('../pages/apps/FileManager'));
const KanbanApp = React.lazy(() => import('../pages/apps/Kanban'));
const ProjectCreate = React.lazy(() => import('../pages/apps/Project/Create'));
const ProjectDetail = React.lazy(() => import('../pages/apps/Project/Detail'));
const ProjectList = React.lazy(() => import('../pages/apps/Project/List'));

// extra pages 
const Starter = React.lazy(() => import('../pages/extra/Starter'));
const Timeline = React.lazy(() => import('../pages/extra/TimeLine'));
const Invoice = React.lazy(() => import('../pages/extra/Invoice'));
const Gallery = React.lazy(() => import('../pages/extra/Gallery'));
const FAQs = React.lazy(() => import('../pages/extra/FAQs'));
const Pricing = React.lazy(() => import('../pages/extra/Pricing'));

// error pages
const Maintenance = React.lazy(() => import('../pages/error/Maintenance'));
const ComingSoon = React.lazy(() => import('../pages/error/ComingSoon'));
const Error404 = React.lazy(() => import('../pages/error/Error404'));
const Error404Alt = React.lazy(() => import('../pages/error/Error404Alt'));
const Error500 = React.lazy(() => import('../pages/error/Error500'));

// base ui
const Accordions = React.lazy(() => import('../pages/ui/Accordions'));
const Alerts = React.lazy(() => import('../pages/ui/Alerts'));
const Avatars = React.lazy(() => import('../pages/ui/Avatars'));
const Buttons = React.lazy(() => import('../pages/ui/Buttons'));
const Badges = React.lazy(() => import('../pages/ui/Badges'));
const Breadcrumb = React.lazy(() => import('../pages/ui/Breadcrumb'));
const Cards = React.lazy(() => import('../pages/ui/Cards'));
const Collapse = React.lazy(() => import('../pages/ui/Collapse'));
const Dismissible = React.lazy(() => import('../pages/ui/Dismissible'));
const Dropdowns = React.lazy(() => import('../pages/ui/Dropdowns'));
const Progress = React.lazy(() => import('../pages/ui/Progress'));
const Skeleton = React.lazy(() => import('../pages/ui/Skeleton'));
const Spinners = React.lazy(() => import('../pages/ui/Spinners'));
const ListGroup = React.lazy(() => import('../pages/ui/ListGroup'));
const Ratio = React.lazy(() => import('../pages/ui/Ratio'));
const Tabs = React.lazy(() => import('../pages/ui/Tabs'));
const Modals = React.lazy(() => import('../pages/ui/Modals'));
const Offcanvas = React.lazy(() => import('../pages/ui/Offcanvas'));
const Popovers = React.lazy(() => import('../pages/ui/Popovers'));
const Tooltips = React.lazy(() => import('../pages/ui/Tooltips'));
const Typography = React.lazy(() => import('../pages/ui/Typography'));

// extended ui
const Swiper = React.lazy(() => import('../pages/extended/Swiper'));
const NestableList = React.lazy(() => import('../pages/extended/NestableList'));
const Ratings = React.lazy(() => import('../pages/extended/Ratings'));
const Animation = React.lazy(() => import('../pages/extended/Animation'));
const Player = React.lazy(() => import('../pages/extended/Player'));
const Scrollbar = React.lazy(() => import('../pages/extended/Scrollbar'));
const SweetAlert = React.lazy(() => import('../pages/extended/SweetAlert'));
const TourPage = React.lazy(() => import('../pages/extended/TourPage'));
const TippyTooltip = React.lazy(() => import('../pages/extended/TippyTooltip'));
const Lightbox = React.lazy(() => import('../pages/extended/Lightbox'));

// forms
const FormElements = React.lazy(() => import('../pages/forms/FormElements'));
const FormSelect = React.lazy(() => import('../pages/forms/Select'));
const Range = React.lazy(() => import('../pages/forms/Range'));
const Pickers = React.lazy(() => import('../pages/forms/Pickers'));
const Masks = React.lazy(() => import('../pages/forms/Masks'));
const Editor = React.lazy(() => import('../pages/forms/Editor'));
const FileUploads = React.lazy(() => import('../pages/forms/FileUploads'));
const Validation = React.lazy(() => import('../pages/forms/Validation'));
const FormLayout = React.lazy(() => import('../pages/forms/FormLayout'));

// tables
const BasicTables = React.lazy(() => import('../pages/tables/BasicTables'));
const DataTables = React.lazy(() => import('../pages/tables/DataTables'));

// icons
const MingCuteIcons = React.lazy(() => import('../pages/ui/icons/MingCuteIcons'));
const FeatherIcons = React.lazy(() => import('../pages/ui/icons/FeatherIcons'));
const MaterialSymbolIcons = React.lazy(() => import('../pages/ui/icons/MaterialSymbolIcons'));

// chart
const Chart = React.lazy(() => import('../pages/ui/Chart'));

// maps
const VectorMaps = React.lazy(() => import('../pages/ui/maps/VectorMaps'));


export interface RoutesProps {
  path: RouteProps["path"];
  name?: string;
  element?: RouteProps["element"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  route?: any;
  exact?: boolean;
  icon?: string;
  header?: string;
  roles?: string[];
  children?: RoutesProps[];
}

// dashboards
const dashboardRoutes: RoutesProps = {
  path: "/admin/home",
  name: "Dashboards",
  icon: "home",
  header: "Navigation",
  children: [
    {
      path: "/admin/dashboard",
      name: "Root",
      element: <Navigate to='/dashboard' />,
      route: PrivateRoute,
    },
    {
      path: '/admin/dashboard',
      name: "Dashboard",
      element: <Dashboard />,
      route: PrivateRoute,
    },
  ],
};



const ticketsAppRoutes: RoutesProps = {
  path: "/admin/apps/tickets",
  name: "Tickets",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "tickets",
  element: <TicketsApp />,
  header: "Apps",
};

const usersRoutes: RoutesProps = {
  path: "/admin/manage-users",
  name: "Users",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "users",
  children: [
    {
      path: '/admin/manage-users/users',
      name: 'ManageUsers',
      element: <UsersApp />,
      route: PrivateRoute,
    },
    {
      path: '/admin/manage-users/detail/:id',
      name: 'ProjectDetail',
      element: <UserDetail />,
      route: PrivateRoute,
    },
    {
      path: '/admin/manage-users/edit/:id',
      name: 'ProjectCreate',
      element: <EditUSer />,
      route: PrivateRoute,
    },
    {
      path: '/admin/manage-users/inactive',
      name: 'InactiveUsers',
      element: <InactiveUsers />,
      route: PrivateRoute,
    },
    {
      path: '/admin/manage-users/role-permission',
      name: 'RolePermission',
      element: <RolePermission />,
      route: PrivateRoute,
    },
  ]
};

const productRoutes: RoutesProps = {
  path: "/admin/product",
  name: "Products",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "classify",
  children: [
    {
      path: '/admin/product/products',
      name: 'ManageProducts',
      element: <Products />,
      route: PrivateRoute,
    },
    {
      path: '/admin/product/add',
      name: 'AddProduct',
      element: <AddEditProduct />,
      route: PrivateRoute,
    },
    {
      path: '/admin/product/edit/:id',
      name: 'EditProduct',
      element: <AddEditProduct />,
      route: PrivateRoute,
    },
    {
      path: '/admin/product/suppliers',
      name: 'Supplier',
      element: <Supplier />,
      route: PrivateRoute,
    },
    {
      path: '/admin/product/supplier/edit/:id',
      name: 'EditSupplier',
      element: <AddEditSupplier />,
      route: PrivateRoute,
    },
    {
      path: '/admin/product/supplier/add',
      name: 'AddSupplier',
      element: <AddEditSupplier />,
      route: PrivateRoute,
    },
    {
      path: '/admin/product/supplements',
      name: 'Supplement',
      element: <Supplement />,
      route: PrivateRoute,
    },
    {
      path: '/admin/product/supplement/edit/:id',
      name: 'EditSupplier',
      element: <AddEditSupplier />,
      route: PrivateRoute,
    },
    {
      path: '/admin/product/supplement/add',
      name: 'AddSupplement',
      element: <AddEditSupplement />,
      route: PrivateRoute,
    },
    {
      path: '/admin/product/promotions',
      name: 'Promotion',
      element: <Promotion />,
      route: PrivateRoute,
    },
    {
      path: '/admin/product/promotion/edit/:id',
      name: 'EditPromotion',
      element: <AddEditPromotion />,
      route: PrivateRoute,
    },
    {
      path: '/admin/product/promotion/add',
      name: 'AddPromotion',
      element: <AddEditPromotion />,
      route: PrivateRoute,
    },
    {
      path: '/admin/product/equipments',
      name: 'Equipment',
      element: <Equipment />,
      route: PrivateRoute,
    },
    {
      path: '/admin/product/equipment/edit/:id',
      name: 'EditEquipment',
      element: <AddEditEquipment />,
      route: PrivateRoute,
    },
    {
      path: '/admin/product/equipment/add',
      name: 'AddEquipment',
      element: <AddEditEquipment />,
      route: PrivateRoute,
    },
  ]
};


const fileAppRoutes: RoutesProps = {
  path: "/admin/apps/file-manager",
  name: "File Manager",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "filemanager",
  element: <FileManagerApp />,
  header: "Apps",
};





const appRoutes = [ ticketsAppRoutes,usersRoutes,  fileAppRoutes, productRoutes];

// pages
const customPagesRoutes = {
  path: "/pages",
  name: "Pages",
  icon: "pages",
  header: "Custom",
  children: [
    {
      path: "/pages/starter",
      name: "Starter",
      element: <Starter />,
      route: PrivateRoute,
    },
    {
      path: "/pages/timeline",
      name: "Timeline",
      element: <Timeline />,
      route: PrivateRoute,
    },
    {
      path: "/pages/invoice",
      name: "Invoice",
      element: <Invoice />,
      route: PrivateRoute,
    },
    {
      path: "/pages/gallery",
      name: "Gallery",
      element: <Gallery />,
      route: PrivateRoute,
    },
    {
      path: "/pages/faqs",
      name: "FAQs",
      element: <FAQs />,
      route: PrivateRoute,
    },
    {
      path: "/pages/pricing",
      name: "Pricing",
      element: <Pricing />,
      route: PrivateRoute,
    },
    {
      path: "/error-404-alt",
      name: "Error - 404-alt",
      element: <Error404Alt />,
      route: PrivateRoute,
    },
  ],
};







// auth
const authRoutes: RoutesProps[] = [
  {
    path: "/admin/auth/login",
    name: "Login",
    element: <Login />,
    route: Route,
  },
  {
    path: "/admin/auth/register",
    name: "Register",
    element: <Register />,
    route: Route,
  },
  {
    path: "/admin/auth/recover-password",
    name: "Recover Password",
    element: <RecoverPassword />,
    route: Route,
  },
  {
    path: "/admin/auth/lock-screen",
    name: "Lock Screen",
    element: <LockScreen />,
    route: Route,
  },
];

// public routes
const otherPublicRoutes = [
  {
    path: "*",
    name: "Error - 404",
    element: <Error404 />,
    route: Route,
  },
  {
    path: "/maintenance",
    name: "Maintenance",
    element: <Maintenance />,
    route: Route,
  },
  {
    path: "/admin/coming-soon",
    name: "Coming Soon",
    element: <ComingSoon />,
    route: Route,
  },
  {
    path: "/admin/error-404",
    name: "Error - 404",
    element: <Error404 />,
    route: Route,
  },
  {
    path: "/admin/error-500",
    name: "Error - 500",
    element: <Error500 />,
    route: Route,
  },
];

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
  let flatRoutes: RoutesProps[] = [];

  routes = routes || [];
  routes.forEach((item: RoutesProps) => {
    flatRoutes.push(item);
    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

// All routes
const authProtectedRoutes = [
  dashboardRoutes,
  ...appRoutes,
  customPagesRoutes,
];
const publicRoutes = [...authRoutes, ...otherPublicRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export {
  publicRoutes,
  authProtectedRoutes,
  authProtectedFlattenRoutes,
  publicProtectedFlattenRoutes,
};
