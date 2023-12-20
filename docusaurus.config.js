// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import {themes as prismThemes} from 'prism-react-renderer';

const lightCodeTheme = prismThemes.github;
const darkCodeTheme = prismThemes.dracula;

// order usage directory by type first
function sortItemsByCategory(items) {
  // type with "category" (directory) first
  const sortedItems = items.sort(function(a, b) {
    return a.type.localeCompare(b.type);
  })
  return sortedItems;
}

const renderApiSSR = process.env.API_SSR !== 'false';

const apiConfig = [
  'redocusaurus',
  {
    // Plugin Options for loading OpenAPI files
    specs: renderApiSSR ? [
      {
        spec: 'static/swagger-latest.json',
        route: '/api/next/',
      },
      {
        route: '/api/1.21/',
        spec: 'static/swagger-21.json',
      },
      {
        route: '/api/1.20/',
        spec: 'static/swagger-20.json',
      },
      {
        route: '/api/1.19/',
        spec: 'static/swagger-19.json',
      },
    ]: [],
    // Theme Options for modifying how redoc renders them
    theme: {
      // Change with your site colors
      primaryColor: '#1890ff',
    },
  },
]

const pageConfig = renderApiSSR ? {
  exclude: [
    'api/**',
  ],
}: {}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Gitea Documentation',
  tagline: 'Git with a cup of tea',
  url: 'https://docs.gitea.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',

  plugins: [
    [
      'docusaurus-plugin-plausible',
      {
        domain: 'docs.gitea.com',
      },
    ]
  ],

  i18n: {
    defaultLocale: 'en-us',
    locales: ['en-us', 'zh-cn'/*, 'fr-fr', 'zh-tw'*/], // temporarily disable other locales
    localeConfigs: {
      'en-us': {
        label: 'English',
      },
      'zh-cn': {
        label: '中文',
      },
    },
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      //'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // Serve the docs at the site's root
          editUrl: ({versionDocsDirPath, docPath, locale, version, permalink}) => {
            let fileName = `${docPath.replace('.md', '')}.${locale}.md`;
            // intro.md has different name from upstream, need to handle this here
            if (docPath.includes('intro.md')) {
              fileName = `page/index.${locale}.md`;
            }
            return `https://github.com/go-gitea/gitea/tree/${version === 'current' ? 'main': `release/v${version}`}/docs/content/${fileName}`;
          },
          versions: {
            current: {
              label: '1.22-dev', // path is kept as next for dev (so users can always find "nightly" docs)
              banner: 'unreleased',
            },
            '1.21': {
              label: '1.21.2',
            },
            '1.20': {
              label: '1.20.6'
            },
            '1.19': {
              label: '1.19.4',
            }
          },
          lastVersion: '1.21',
          async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
            const {item} = args;
            // Use the provided data to generate a custom sidebar slice
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            if (item.dirName !== 'usage') {
              return sidebarItems;
            } else {
              return sortItemsByCategory(sidebarItems);
            }
          },
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        pages: pageConfig,
      }),
    ],
    apiConfig,
  ],
  themes: [
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: false,
        language: ["en", "zh"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        indexBlog: false,
        docsRouteBasePath: "/"
      }
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: 'announcementBar-4', // Increment on change
        content: `<a href="https://about.gitea.com/products/cloud">Try &nbsp; Gitea Cloud &nbsp;  ☁️  &nbsp; for 30 days <span aria-hidden="true">&rarr;</span> Accelerate your Development & Deploys!</a>`,
      },
      navbar: {
        title: 'Gitea',
        logo: {
          alt: 'Gitea Logo',
          src: 'img/gitea.svg',
          href: 'https://about.gitea.com/',
          target: '_self',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          {
            to: '/api/1.20/',
            label: 'API',
            position: 'left',
            activeBaseRegex: 'api/(1.19|1.20|1.21|next)/',
          },
          {
            position: 'left',
            label: 'Blog',
            href: 'https://blog.gitea.com',
            className: 'internal-href',
            target: '_self',
          },
          {
            type: 'custom-apiDropdown',
            label: 'API Version',
            position: 'right',
            items: [
              {to: '/api/next/', label: '1.22-dev' },
              {to: '/api/1.21/', label: '1.21.2' },
              {to: '/api/1.20/', label: '1.20.6' },
              {to: '/api/1.19/', label: '1.19.4' },
            ],
          },
          {
            href: 'https://github.com/go-gitea/gitea',
            label: 'Code',
            position: 'left',
          },
          {
            type: 'search',
            position: 'right',
          },
         {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
          },
          {
            to: 'help/support',
            position: 'right',
            label: 'Support',
            activeBaseRegex: 'help/support',
          },
          {
            href: 'https://gitea.com/user/login',
            label: 'Sign In',
            position: 'right',
            className: 'internal-href signin-button',
            target: '_self',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Awesome Gitea',
                to: '/awesome',
              },
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/gitea',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/gitea',
              },
              {
                label: 'Matrix',
                href: 'https://matrix.to/#/#gitea-space:matrix.org',
              },
              {
                label: 'Forum',
                href: 'https://forum.gitea.com/',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/giteaio',
              },
              {
                label: 'Mastodon',
                href: 'https://social.gitea.io/@gitea',
              },
            ],
          },
          {
            title: 'Code',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/go-gitea/gitea',
              },
              {
                label: 'Gitea',
                href: 'https://gitea.com/gitea',
              },
              {
                label: 'Tea CLI',
                href: 'https://gitea.com/gitea/tea',
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
