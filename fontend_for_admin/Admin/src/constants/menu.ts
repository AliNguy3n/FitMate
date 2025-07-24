export interface MenuItemTypes {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: string;
  url?: string;
  parentKey?: string;
  target?: string;
  children?: MenuItemTypes[];
}

const MENU_ITEMS: MenuItemTypes[] = [
  {
    key: 'menu',
    label: 'Menu',
    isTitle: true,
  },
  {
    key: 'dashboard',
    label: 'Dashboard',
    isTitle: false,
    icon: 'mgc_home_3_line',
    url: '/admin/dashboard'
  },
  {
    key: 'elements',
    label: 'User',
    isTitle: true,
  },
  {
    key: 'auth',
    label: 'Manage User',
    isTitle: false,
    icon: 'mgc_user_3_line',
    children: [
      {
        key: 'auth-users',
        label: 'Users',
        url: '/admin/manage-users/users',
        parentKey: 'auth',
      },
      {
        key: 'auth-inactiveinactive',
        label: 'Inactive Users',
        url: '/admin/manage-users/inactive',
        parentKey: 'auth',
      },
      {
        key: 'auth-RolePermission',
        label: 'Role Permission',
        url: '/admin/manage-users/role-permission',
        parentKey: 'auth',
      },
      
    ]
  },

    {
    key: 'elements',
    label: 'Product',
    isTitle: true,
  },

  {
    key: 'product',
    label: 'Manage Product',
    isTitle: false,
    icon: 'mgc_classify_2_line',
    children: [
      {
        key: 'product-products',
        label: 'Products',
        url: '/admin/product/products',
        parentKey: 'product',
      },
      {
        key: 'product-equipments',
        label: 'Equipments',
        url: '/admin/product/equipments',
        parentKey: 'product',
      },
      {
        key: 'product-promotions',
        label: 'Promotions',
        url: '/admin/product/promotions',
        parentKey: 'product',
      },
      {
        key: 'product-supplements',
        label: 'Supplements',
        url: '/admin/product/supplements',
        parentKey: 'product',
      },
      {
        key: 'product-suppliers',
        label: 'Suppliers',
        url: '/admin/product/suppliers',
        parentKey: 'product',
      },
      {
        key: 'product-SCategory',
        label: 'SCategory',
        url: '/admin/product/scategory',
        parentKey: 'product',
      },
      {
        key: 'product-eCategory',
        label: 'ECategory',
        url: '/admin/product/ecategory',
        parentKey: 'product',
      },
      
      
    ]
  },
  {
    key: 'apps',
    label: 'Apps',
    isTitle: true,
  },
  // {
  //   key: 'apps-calendar',
  //   label: 'Calendar',
  //   isTitle: false,
  //   icon: 'mgc_calendar_line',
  //   url: '/apps/calendar',
  // },

  {
    key: 'apps-project',
    label: 'Exercises',
    isTitle: false,
    icon: 'mgc_fitness_line',
    children: [
      {
        key: 'project-list',
        label: 'List',
        url: '/admin/apps/project/list',
        parentKey: 'apps-project',
      },
      {
        key: 'project-detail',
        label: 'Detail',
        url: '/admin/apps/project/detail',
        parentKey: 'apps-project',
      },
      {
        key: 'project-create',
        label: 'Create',
        url: '/admin/apps/project/create',
        parentKey: 'apps-project',
      },
    ]
  },

  {
    key: 'apps-project',
    label: 'Meals',
    isTitle: false,
    icon: 'mgc_bowl_line',
    children: [
      {
        key: 'project-list',
        label: 'List',
        url: '/apps/project/list',
        parentKey: 'apps-project',
      },
      {
        key: 'project-detail',
        label: 'Detail',
        url: '/apps/project/detail',
        parentKey: 'apps-project',
      },
      {
        key: 'project-create',
        label: 'Create',
        url: '/apps/project/create',
        parentKey: 'apps-project',
      },
    ]
  },

  // {
  //   key: 'apps-kanban',
  //   label: 'Kanban Board',
  //   isTitle: false,
  //   icon: 'mgc_task_2_line',
  //   url: '/apps/kanban',
  // },
  // {
  //   key: 'apps-project',
  //   label: 'Project',
  //   isTitle: false,
  //   icon: 'mgc_building_2_line',
  //   children: [
  //     {
  //       key: 'project-list',
  //       label: 'List',
  //       url: '/apps/project/list',
  //       parentKey: 'apps-project',
  //     },
  //     {
  //       key: 'project-detail',
  //       label: 'Detail',
  //       url: '/apps/project/detail',
  //       parentKey: 'apps-project',
  //     },
  //     {
  //       key: 'project-create',
  //       label: 'Create',
  //       url: '/apps/project/create',
  //       parentKey: 'apps-project',
  //     },
  //   ]
  // },
  // {
  //   key: 'custom',
  //   label: 'Custom',
  //   isTitle: true,
  // },
  
  // {
  //   key: 'pages',
  //   label: 'Extra Pages',
  //   isTitle: false,
  //   icon: 'mgc_box_3_line',
  //   children: [
  //     {
  //       key: 'pages-starter',
  //       label: 'Starter Page',
  //       url: '/pages/starter',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'pages-timeline',
  //       label: 'Timeline',
  //       url: '/pages/timeline',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'pages-invoice',
  //       label: 'Invoice',
  //       url: '/pages/invoice',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'pages-gallery',
  //       label: 'Gallery',
  //       url: '/pages/gallery',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'pages-faq',
  //       label: 'FAQs',
  //       url: '/pages/faqs',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'pages-pricing',
  //       label: 'Pricing',
  //       url: '/pages/pricing',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'pages-maintenance',
  //       label: 'Maintenance',
  //       url: '/maintenance',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'pages-comingsoon',
  //       label: 'Coming Soon',
  //       url: '/coming-soon',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'error-404',
  //       label: 'Error 404',
  //       url: '/error-404',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'error-404-alt',
  //       label: 'Error 404-alt',
  //       url: '/error-404-alt',
  //       parentKey: 'pages',
  //     },
  //     {
  //       key: 'error-500',
  //       label: 'Error 500',
  //       url: '/error-500',
  //       parentKey: 'pages',
  //     },
  //   ]
  // },
  {
    key: 'elements',
    label: 'Products',
    isTitle: true,
  },
  
{
    key: 'apps-tickets',
    label: 'Order',
    isTitle: false,
    icon: 'mgc_shopping_cart_2_line',
    url: '/admin/apps/tickets',
  },
  {
    key: 'apps-tickets',
    label: 'Tickets',
    isTitle: false,
    icon: 'mgc_coupon_line',
    url: '/admin/apps/tickets',
  },
  {
    key: 'apps-file-manager',
    label: 'File Manager',
    isTitle: false,
    icon: 'mgc_folder_2_line',
    url: '/admin/apps/file-manager',
  },

  
];

export { MENU_ITEMS };
