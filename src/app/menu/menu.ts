import { CoreMenu } from '@core/types';

export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: 'dashboard',
    title: 'Dashboard',
    translate: 'MENU.DASHBOARD.COLLAPSIBLE',
    type: 'collapsible',
    icon: 'home',
    badge: {
      title: '2',
      translate: 'MENU.DASHBOARD.BADGE',
      classes: 'badge-light-warning badge-pill'
    },
    children: [
      {
        id: 'analytics',
        title: 'Analytics',
        translate: 'MENU.DASHBOARD.ANALYTICS',
        type: 'item',
        role: ['Admin'], // To set multiple role: ['Admin', 'Client']
        icon: 'circle',
        url: 'dashboard/analytics'
      },
      {
        // If role is not assigned will be display to all
        id: 'ecommerce',
        title: 'eCommerce',
        translate: 'MENU.DASHBOARD.ECOMMERCE',
        type: 'item',
        icon: 'circle',
        url: 'dashboard/ecommerce'
      }
    ]
  },
  // Apps & Pages
  {
    id: 'apps',
    type: 'section',
    title: 'Apps & Pages',
    translate: 'MENU.APPS.SECTION',
    icon: 'package',
    children: [
      {
        id: 'calendar',
        title: 'Calendar',
        translate: 'MENU.APPS.CALENDAR',
        type: 'item',
        icon: 'calendar',
        url: 'apps/calendar'
      },
      
      {
        id: 'invoice',
        title: 'Invoice',
        translate: 'MENU.APPS.INVOICE.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'file-text',
        children: [
          {
            id: 'invoice-list',
            title: 'List',
            translate: 'MENU.APPS.INVOICE.LIST',
            type: 'item',
            icon: 'circle',
            url: 'apps/invoice/list'
          },
          {
            id: 'invoicePreview',
            title: 'Preview',
            translate: 'MENU.APPS.INVOICE.PREVIEW',
            type: 'item',
            icon: 'circle',
            url: 'apps/invoice/preview'
          },
          {
            id: 'invoiceEdit',
            title: 'Edit',
            translate: 'MENU.APPS.INVOICE.EDIT',
            type: 'item',
            icon: 'circle',
            url: 'apps/invoice/edit'
          },
          {
            id: 'invoiceAdd',
            title: 'Add',
            translate: 'MENU.APPS.INVOICE.ADD',
            type: 'item',
            icon: 'circle',
            url: 'apps/invoice/add'
          }
        ]
      },
      {
        id: 'product',
        title: 'product',
        translate: 'MENU.APPS.PRODUCT.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'file-text',
        children: [
          {
            id: 'product-list',
            title: 'List',
            translate: 'MENU.APPS.PRODUCT.LIST',
            type: 'item',
            icon: 'circle',
            url: 'apps/product/list'
          }
        ]
      },
      {
        id: 'users',
        title: 'User',
        translate: 'MENU.APPS.USER.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'user',
        children: [
          {
            id: 'list',
            title: 'List',
            translate: 'MENU.APPS.USER.LIST',
            type: 'item',
            icon: 'circle',
            url: 'apps/user/user-list'
          },
          {
            id: 'view',
            title: 'View',
            translate: 'MENU.APPS.USER.VIEW',
            type: 'item',
            icon: 'circle',
            url: 'apps/user/user-view'
          },
          {
            id: 'edit',
            title: 'Edit',
            translate: 'MENU.APPS.USER.EDIT',
            type: 'item',
            icon: 'circle',
            url: 'apps/user/user-edit'
          }
        ]
      }
    ]
  },
  // User Interface
  {
    id: 'user-interface',
    type: 'section',
    title: 'User Interface',
    translate: 'MENU.UI.SECTION',
    icon: 'layers',
    children: [
      {
        id: 'typography',
        title: 'Typography',
        translate: 'MENU.UI.TYPOGRAPHY',
        type: 'item',
        icon: 'type',
        url: 'ui/content/typography'
      },
      {
        id: 'colors',
        title: 'Colors',
        translate: 'MENU.UI.COLORS',
        type: 'item',
        icon: 'droplet',
        url: 'ui/colors'
      },
      {
        id: 'feather',
        title: 'Feather',
        translate: 'MENU.UI.FEATHER',
        type: 'item',
        icon: 'eye',
        url: 'ui/icons/feather'
      },
      {
        id: 'cards',
        title: 'Cards',
        translate: 'MENU.UI.CARDS.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'credit-card',
        badge: {
          title: 'New',
          translate: 'MENU.UI.CARDS.BADGE',
          classes: 'badge-light-success badge-pill'
        },
        children: [
          {
            id: 'card-basic',
            title: 'Basic',
            translate: 'MENU.UI.CARDS.BASIC',
            type: 'item',
            icon: 'circle',
            url: 'ui/card/card-basic'
          },
          {
            id: 'card-advance',
            title: 'Advance',
            translate: 'MENU.UI.CARDS.ADVANCE',
            type: 'item',
            icon: 'circle',
            url: 'ui/card/advance'
          },
          {
            id: 'card-statistics',
            title: 'Statistics',
            translate: 'MENU.UI.CARDS.STATISTICS',
            type: 'item',
            icon: 'circle',
            url: 'ui/card/statistics'
          },
          {
            id: 'Card-analytics',
            title: 'Analytics',
            translate: 'MENU.UI.CARDS.ANALYTICS',
            type: 'item',
            icon: 'circle',
            url: 'ui/card/analytics'
          },
          {
            id: 'card-actions',
            title: 'Actions',
            translate: 'MENU.UI.CARDS.ACTIONS',
            type: 'item',
            icon: 'circle',
            url: 'ui/card/actions'
          }
        ]
      },
      {
        id: 'components',
        title: 'Components',
        translate: 'MENU.UI.COMPONENTS.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'archive',
        children: [
          {
            id: 'components-alerts',
            title: 'Alerts',
            translate: 'MENU.UI.COMPONENTS.ALERTS',
            type: 'item',
            icon: 'circle',
            url: 'components/alerts'
          },
          {
            id: 'components-avatar',
            title: 'Avatar',
            translate: 'MENU.UI.COMPONENTS.AVATAR',
            type: 'item',
            icon: 'circle',
            url: 'components/avatar'
          },
          {
            id: 'components-badges',
            title: 'Badges',
            translate: 'MENU.UI.COMPONENTS.BADGES',
            type: 'item',
            icon: 'circle',
            url: 'components/badges'
          },
          {
            id: 'components-breadcrumbs',
            title: 'Breadcrumbs',
            translate: 'MENU.UI.COMPONENTS.BREADCRUMBS',
            type: 'item',
            icon: 'circle',
            url: 'components/breadcrumbs'
          },
          {
            id: 'components-buttons',
            title: 'Buttons',
            translate: 'MENU.UI.COMPONENTS.BUTTONS',
            type: 'item',
            icon: 'circle',
            url: 'components/buttons'
          },
          {
            id: 'components-carousel',
            title: 'Carousel',
            translate: 'MENU.UI.COMPONENTS.CAROUSEL',
            type: 'item',
            icon: 'circle',
            url: 'components/carousel'
          },
          {
            id: 'components-collapse',
            title: 'Collapse',
            translate: 'MENU.UI.COMPONENTS.COLLAPSE',
            type: 'item',
            icon: 'circle',
            url: 'components/collapse'
          },
          {
            id: 'components-divider',
            title: 'Divider',
            translate: 'MENU.UI.COMPONENTS.DIVIDER',
            type: 'item',
            icon: 'circle',
            url: 'components/divider'
          },
          {
            id: 'components-drop-downs',
            title: 'Dropdowns',
            translate: 'MENU.UI.COMPONENTS.DROPDOWNS',
            type: 'item',
            icon: 'circle',
            url: 'components/dropdowns'
          },
          {
            id: 'components-list-group',
            title: 'List Group',
            translate: 'MENU.UI.COMPONENTS.GROUP',
            type: 'item',
            icon: 'circle',
            url: 'components/list-group'
          },
          {
            id: 'components-media-objects',
            title: 'Media Objects',
            translate: 'MENU.UI.COMPONENTS.OBJECTS',
            type: 'item',
            icon: 'circle',
            url: 'components/media-objects'
          },
          {
            id: 'components-modals',
            title: 'Modals',
            translate: 'MENU.UI.COMPONENTS.MODALS',
            type: 'item',
            icon: 'circle',
            url: 'components/modals'
          },
          {
            id: 'components-navs',
            title: 'Navs',
            translate: 'MENU.UI.COMPONENTS.COMPONENT',
            type: 'item',
            icon: 'circle',
            url: 'components/navs'
          },
          {
            id: 'components-pagination',
            title: 'Pagination',
            translate: 'MENU.UI.COMPONENTS.PAGINATION',
            type: 'item',
            icon: 'circle',
            url: 'components/pagination'
          },
          {
            id: 'components-pill-badges',
            title: 'Pill Badges',
            translate: 'MENU.UI.COMPONENTS.PBADGES',
            type: 'item',
            icon: 'circle',
            url: 'components/pill-badges'
          },
          {
            id: 'components-pills',
            title: 'Pills',
            translate: 'MENU.UI.COMPONENTS.PILLS',
            type: 'item',
            icon: 'circle',
            url: 'components/pills'
          },
          {
            id: 'components-popovers',
            title: 'Popovers',
            translate: 'MENU.UI.COMPONENTS.POPOVERS',
            type: 'item',
            icon: 'circle',
            url: 'components/popovers'
          },
          {
            id: 'components-progress',
            title: 'Progress',
            translate: 'MENU.UI.COMPONENTS.PROGRESS',
            type: 'item',
            icon: 'circle',
            url: 'components/progress'
          },
          {
            id: 'components-ratings',
            title: 'Ratings',
            translate: 'MENU.UI.COMPONENTS.RATINGS',
            type: 'item',
            icon: 'circle',
            url: 'components/ratings'
          },
          {
            id: 'components-spinner',
            title: 'Spinner',
            translate: 'MENU.UI.COMPONENTS.SPINNER',
            type: 'item',
            icon: 'circle',
            url: 'components/spinner'
          },
          {
            id: 'components-tabs',
            title: 'Tabs',
            translate: 'MENU.UI.COMPONENTS.TABS',
            type: 'item',
            icon: 'circle',
            url: 'components/tabs'
          },
          {
            id: 'components-timeline',
            title: 'Timeline',
            translate: 'MENU.UI.COMPONENTS.TIMELINE',
            type: 'item',
            icon: 'circle',
            url: 'components/timeline'
          },
          {
            id: 'components-toasts',
            title: 'Toasts',
            translate: 'MENU.UI.COMPONENTS.TOASTS',
            type: 'item',
            icon: 'circle',
            url: 'components/toasts'
          },
          {
            id: 'components-tooltips',
            title: 'Tooltips',
            translate: 'MENU.UI.COMPONENTS.TOOLTIPS',
            type: 'item',
            icon: 'circle',
            url: 'components/tooltips'
          }
        ]
      },
      
    ]
  }
];
