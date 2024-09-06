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
        route: '/api/1.22/',
        spec: 'static/swagger-22.json',
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
      {
        route: '/api/',
        spec: 'static/swagger-22.json',
      }
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

const globalVariables = {
  current: {
    'goVersion': '1.22',
    'minGoVersion': '1.22',
    'minNodeVersion': '18',
    'version': 'main-nightly',
    'sourceVersion': 'main',
    'sourceBranch': 'main',
    'dockerVersion': 'nightly',
    'displayVersion': '1.23-dev'
  },
  '1.22': {
    'goVersion': '1.22',
    'minGoVersion': '1.22',
    'minNodeVersion': '18',
    'version': '1.22.2',
    'sourceVersion': 'v1.22.2',
    'sourceBranch': 'release/v1.22',
    'dockerVersion': '1.22.2',
    'displayVersion': '1.22.2'
  },
  '1.21': {
    'goVersion': '1.21',
    'minGoVersion': '1.21',
    'minNodeVersion': '18',
    'version': '1.21.11',
    'sourceVersion': 'v1.21.11',
    'sourceBranch': 'release/v1.21',
    'dockerVersion': '1.21.11',
    'displayVersion': '1.21.11'
  },
  '1.20': {
    'goVersion': '1.20',
    'minGoVersion': '1.20',
    'minNodeVersion': '16',
    'version': '1.20.6',
    'sourceVersion': 'v1.20.6',
    'sourceBranch': 'release/v1.20',
    'dockerVersion': '1.20.6',
    'displayVersion': '1.20.6'
  },
  '1.19': {
    'goVersion': '1.20',
    'minGoVersion': '1.19',
    'minNodeVersion': '14',
    'version': '1.19.4',
    'sourceVersion': 'v1.19.4',
    'sourceBranch': 'release/v1.19',
    'dockerVersion': '1.19.4',
    'displayVersion': '1.19.4'
  }
}

const versions = {
  current: {
    label: globalVariables['current'].displayVersion, // path is kept as next for dev (so users can always find "nightly" docs)
    banner: 'unreleased',
  },
  '1.22': {
    label: globalVariables['1.22'].displayVersion,
  },
  '1.21': {
    label: globalVariables['1.21'].displayVersion,
  },
  '1.20': {
    label: globalVariables['1.20'].displayVersion,
  },
  '1.19': {
    label: globalVariables['1.19'].displayVersion,
  }
}

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
    locales: ['en-us', 'zh-cn'/*,'fr-fr', 'zh-tw'*/], // temporarily disable other locales
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
            // Special case for awesome page
            if (docPath.includes('awesome.md')) {
              return `https://gitea.com/gitea/awesome-gitea/src/branch/main/README.md`
            }
            if (locale === 'en-us') {
              return `https://gitea.com/gitea/docs/src/branch/main/${version === 'current' ? 'docs': `versioned_docs/version-${version}`}/${docPath}`;
            }
            return `https://gitea.com/gitea/docs/src/branch/main/i18n/${locale}/docusaurus-plugin-content-docs/${version === 'current' ? 'current': `version-${version}`}/${docPath}`;
          },
          versions: versions,
          lastVersion: '1.22',
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
        gtag: {
          trackingID: 'G-KHM0KYT506'
        },
      }),
    ],
    apiConfig,
  ],
  markdown: {
    preprocessor: ({filePath, fileContent}) => {
      var key = '';
      var found = false;
      for (key in globalVariables) {
        let folderName = (key == 'current' ? 'current' : `version-${key}`);
        if (filePath.includes(`/${folderName}/`)) {
          found = true;
          break;
        }
      }
      if (key == '' || !found) {
        key = 'current';
      }

      let content = fileContent;
      for (const variable in globalVariables[key]) {
        content = content.replaceAll('@'+variable+'@', globalVariables[key][variable]);
      }

      return content
    },
  },
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
      metadata: [
        {name: 'keywords', content: 'gitea, git, devops, actions, packages, documentation, self-hosted, open-source, version control, gitlab, github'}
      ],
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
            docId: 'index',
            position: 'left',
            label: 'Docs',
          },
          {
            to: '/api/1.22/',
            label: 'API',
            position: 'left',
            activeBaseRegex: 'api/(1.19|1.20|1.21|1.22|next)/',
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
              {to: '/api/next/', label: '1.23-dev' },
              {to: '/api/1.22/', label: '1.22.2' },
              {to: '/api/1.21/', label: '1.21.11' },
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
            position: 'left',
            label: 'Enterprise',
            href: 'https://docs.gitea.com/enterprise',
            className: 'internal-href',
            target: '_self',
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
                href: 'https://gitea.com/gitea/awesome-gitea',
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
        additionalLanguages: ['ini','diff','json','http','docker','php'],
      },
    }),
};

module.exports = config;
