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
    key: 'finance',
    label: 'Order',
    isTitle: true,
  },

  {
    key: 'finance',
    label: 'Financial Overview',
    isTitle: false,
    icon: 'mgc_currency_dollar_line',
    url: '/admin/finance',
  },

  {
    key: 'menu',
    label: 'Order',
    isTitle: true,
  },

  {
    key: 'orders',
    label: 'Manage Order',
    isTitle: false,
    icon: 'mgc_shopping_cart_2_line',
    url: '/admin/order/orders',
  },

  {
    key: 'auth',
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
    key: 'exercises',
    label: 'Exercises',
    isTitle: false,
    icon: 'mgc_fitness_line',
    children: [
      {
        key: 'exercise-list',
        label: 'Exercises',
        url: '/admin/exercise/exercises',
        parentKey: 'exercises',
      },
      {
        key: 'exercise-equipment',
        label: 'Equipments',
        url: '/admin/exercise/equipments',
        parentKey: 'exercises',
      },
      {
        key: 'exercise-mode',
        label: 'Exercise Mode',
        url: '/admin/exercise/exercise-modes',
        parentKey: 'exercises',
      },
      {
        key: 'exercise-category',
        label: 'Exercise Category',
        url: '/admin/exercise/exercise-categories',
        parentKey: 'exercises',
      },
      {
        key: 'exercise-sub-category',
        label: 'Exercise SubCategory',
        url: '/admin/exercise/exercise-sub-categories',
        parentKey: 'exercises',
      },
      {
        key: 'exercise-program',
        label: 'Exercise Program',
        url: '/admin/exercise/exercise-programs',
        parentKey: 'exercises',
      },
    ]
  },

  {
    key: 'meal',
    label: 'Meals',
    isTitle: false,
    icon: 'mgc_bowl_line',
    children: [
      {
        key: 'meal-meals',
        label: 'Meals',
        url: '/admin/meal/meals',
        parentKey: 'meal',
      },
      {
        key: 'meal-times',
        label: 'Meal Times',
        url: '/admin/meal/meal-times',
        parentKey: 'meal',
      },
      {
        key: 'meal-category',
        label: 'Meal Category',
        url: '/admin/meal/meal-categories',
        parentKey: 'meal',
      },
      {
        key: 'meal-subcategory',
        label: 'Meal SubCategory',
        url: '/admin/meal/meal-subcategories',
        parentKey: 'meal',
      },
      
    ]
  },

  
  {
    key: 'elements',
    label: 'Until',
    isTitle: true,
  },
  
  // {
  //   key: 'apps-tickets',
  //   label: 'Tickets',
  //   isTitle: false,
  //   icon: 'mgc_coupon_line',
  //   url: '/admin/apps/tickets',
  // },
  // {
  //   key: 'apps-file-manager',
  //   label: 'File Manager',
  //   isTitle: false,
  //   icon: 'mgc_folder_2_line',
  //   url: '/admin/apps/file-manager',
  // },

  
];

export { MENU_ITEMS };
