// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes as prismThemes } from "prism-react-renderer";

const lightCodeTheme = prismThemes.github;
const darkCodeTheme = prismThemes.dracula;

// order usage directory by type first
function sortItemsByCategory(items) {
  // type with "category" (directory) first
  const sortedItems = items.sort(function (a, b) {
    return a.type.localeCompare(b.type);
  });
  return sortedItems;
}

const renderApiSSR = process.env.API_SSR !== "false";

const apiConfig = [
  "redocusaurus",
  {
    // Plugin Options for loading OpenAPI files
    specs: renderApiSSR
      ? [
          {
            route: "/api/next/",
            spec: "static/swagger-latest.json",
          },
          {
            route: "/api/",
            spec: "static/swagger-26.json",
          },
           {
            route: "/api/1.26/",
            spec: "static/swagger-26.json",
          },
          {
            route: "/api/1.25/",
            spec: "static/swagger-25.json",
          },
          {
            route: "/api/1.24/",
            spec: "static/swagger-24.json",
          },
          {
            route: "/api/1.23/",
            spec: "static/swagger-23.json",
          },
          {
            route: "/api/1.22/",
            spec: "static/swagger-22.json",
          },
        ]
      : [],
    // Theme Options for modifying how redoc renders them
    theme: {
      // Change with your site colors
      primaryColor: "#1890ff",
    },
  },
];

const pageConfig = renderApiSSR
  ? {
      exclude: ["api/**"],
    }
  : {};

const globalVariables = {
  "current": {
    goVersion: "1.26",
    minGoVersion: "1.26",
    minNodeVersion: "22",
    version: "main-nightly",
    sourceVersion: "main",
    sourceBranch: "main",
    dockerVersion: "nightly",
    displayVersion: "1.27-dev",
  },
  "1.26": {
    goVersion: "1.26",
    minGoVersion: "1.26",
    minNodeVersion: "22",
    version: "1.26.4",
    sourceVersion: "v1.26.4",
    sourceBranch: "release/v1.26",
    dockerVersion: "1.26.4",
    displayVersion: "1.26.4",
  },
  "1.25": {
    goVersion: "1.25",
    minGoVersion: "1.25",
    minNodeVersion: "22",
    version: "1.25.5",
    sourceVersion: "v1.25.0",
    sourceBranch: "release/v1.25",
    dockerVersion: "1.25.5",
    displayVersion: "1.25.5",
  },
  "1.24": {
    goVersion: "1.24",
    minGoVersion: "1.24",
    minNodeVersion: "22",
    version: "1.24.7",
    sourceVersion: "v1.24.0",
    sourceBranch: "release/v1.24",
    dockerVersion: "1.24.7",
    displayVersion: "1.24.7",
  },
  "1.23": {
    goVersion: "1.23",
    minGoVersion: "1.22",
    minNodeVersion: "18",
    version: "1.23.8",
    sourceVersion: "v1.23.8",
    sourceBranch: "release/v1.23",
    dockerVersion: "1.23.8",
    displayVersion: "1.23.8",
  },
  "1.22": {
    goVersion: "1.22",
    minGoVersion: "1.22",
    minNodeVersion: "18",
    version: "1.22.6",
    sourceVersion: "v1.22.6",
    sourceBranch: "release/v1.22",
    dockerVersion: "1.22.6",
    displayVersion: "1.22.6",
  },
};

const versions = {
  "current": {
    label: globalVariables["current"].displayVersion, // path is kept as next for dev (so users can always find "nightly" docs)
    banner: "unreleased",
  },
  "1.26": {
    label: globalVariables["1.26"].displayVersion,
  },
  "1.25": {
    label: globalVariables["1.25"].displayVersion,
  },
  "1.24": {
    label: globalVariables["1.24"].displayVersion,
  },
  "1.23": {
    label: globalVariables["1.23"].displayVersion,
  },
  "1.22": {
    label: globalVariables["1.22"].displayVersion,
  },
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Gitea Documentation",
  tagline: "Git with a cup of tea",
  url: "https://docs.gitea.com",
  baseUrl: "/",
  onBrokenLinks: "warn",
  favicon: "img/favicon.png",
  future: {
    faster: true,
    v4: true
  },
  plugins: [
    [
      "docusaurus-plugin-plausible",
      {
        domain: "docs.gitea.com",
      },
    ],

    // for runner documentations
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "runner-docs",
        path: "runner-docs",
        routeBasePath: "runner",
        //sidebarPath: './runner/sidebars.js',
        versions: {
          current: {
            label: "main",
            banner: "unreleased",
          },
          "1.0.8": {
            path: "1.0.8",
            label: "1.0.8",
          },
          "0.2.11": {
            path: "0.2.11",
            label: "0.2.11",
          },
        },
        lastVersion: "1.0.8",
        editUrl: ({
          versionDocsDirPath,
          docPath,
          locale,
          version,
          permalink,
        }) => {
          return `https://gitea.com/gitea/docs/src/branch/main/${
            version === "current"
              ? "runner-docs"
              : `runner-docs_versioned_docs/version-${version}`
          }/${docPath}`;
        },
        async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
          const { item } = args;
          // Use the provided data to generate a custom sidebar slice
          const sidebarItems = await defaultSidebarItemsGenerator(args);
          if (item.dirName !== "usage") {
            return sidebarItems;
          } else {
            return sortItemsByCategory(sidebarItems);
          }
        },
      },
    ],
  ],

  i18n: {
    defaultLocale: "en-us",
    locales: ["en-us", "zh-cn", "zh-tw"],
    localeConfigs: {
      "en-us": {
        label: "English",
      },
      "zh-cn": {
        label: "简体中文",
      },
      "zh-tw": {
        label: "繁體中文",
      },
    },
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      //'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/", // Serve the docs at the site's root
          editUrl: ({
            versionDocsDirPath,
            docPath,
            locale,
            version,
            permalink,
          }) => {
            // Special case for awesome page
            if (docPath.includes("awesome.md")) {
              return `https://gitea.com/gitea/awesome-gitea/src/branch/main/README.md`;
            }
            if (locale === "en-us") {
              return `https://gitea.com/gitea/docs/src/branch/main/${
                version === "current"
                  ? "docs"
                  : `versioned_docs/version-${version}`
              }/${docPath}`;
            }
            return `https://gitea.com/gitea/docs/src/branch/main/i18n/${locale}/docusaurus-plugin-content-docs/${
              version === "current" ? "current" : `version-${version}`
            }/${docPath}`;
          },
          versions: versions,
          lastVersion: "1.26",
          async sidebarItemsGenerator({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const { item } = args;
            // Use the provided data to generate a custom sidebar slice
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            if (item.dirName !== "usage") {
              return sidebarItems;
            } else {
              return sortItemsByCategory(sidebarItems);
            }
          },
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        pages: pageConfig,
        gtag: {
          trackingID: "G-KHM0KYT506",
        },
      }),
    ],
    apiConfig,
  ],
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
    preprocessor: ({ filePath, fileContent }) => {
      var key = "";
      var found = false;
      for (key in globalVariables) {
        let folderName = key == "current" ? "current" : `version-${key}`;
        if (filePath.includes(`/${folderName}/`)) {
          found = true;
          break;
        }
      }
      if (key == "" || !found) {
        key = "current";
      }

      let content = fileContent;
      for (const variable in globalVariables[key]) {
        content = content.replaceAll(
          "@" + variable + "@",
          globalVariables[key][variable]
        );
      }

      return content;
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
        docsRouteBasePath: "/",
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: '/img/gitea.svg',
      metadata: [
        {
          name: 'og:logo',
          content: '/img/gitea.svg'
        },
        {
          name: "keywords",
          content:
            "gitea, git, devops, actions, packages, documentation, self-hosted, open-source, version control, gitlab, github",
        },
      ],
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: "announcementBar-4", // Increment on change
        content: `<a href="https://about.gitea.com/products/cloud">Try &nbsp; Gitea Cloud &nbsp;  ☁️  &nbsp; for 30 days <span aria-hidden="true">&rarr;</span> Accelerate your Development & Deploys!</a>`,
      },
      navbar: {
        title: "Gitea",
        logo: {
          alt: "Gitea Logo",
          src: "img/gitea.svg",
          href: "https://about.gitea.com/",
          target: "_self",
        },
        items: [
          {
            type: "doc",
            docId: "index",
            position: "left",
            label: "Docs",
          },
          {
            to: "/api/1.26/",
            label: "API",
            position: "left",
            activeBaseRegex: "api/(1.22|1.23|1.24|1.25|1.26|next)/",
          },
          {
            to: "/runner/1.0.8/",
            label: "Runner",
            position: "left",
            activeBaseRegex: "runner/(1.0.8|0.2.11|next)/",
          },
          {
            position: "left",
            label: "Enterprise",
            href: "https://docs.gitea.com/enterprise",
            className: "internal-href",
            target: "_self",
          },
          {
            type: "search",
            position: "right",
          },
          {
            type: "localeDropdown",
            position: "right",
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            dropdownActiveClassDisabled: true,
          },
          {
            type: "custom-Dropdown",
            label: "API Version",
            position: "right",
            items: [
              { to: "/api/next/", label: "1.27-dev" },
              { to: "/api/1.26/", label: "1.26.4" },
              { to: "/api/1.25/", label: "1.25.5" },
              { to: "/api/1.24/", label: "1.24.7" },
              { to: "/api/1.23/", label: "1.23.8" },
              { to: "/api/1.22/", label: "1.22.6" },
            ],
            routerRgx: "/api/",
            classNames: "api-dropdown",
          },
          {
            type: "custom-Dropdown",
            label: "Runner Version",
            position: "right",
            items: [
              { to: "/runner/next/", label: "development" },
              { to: "/runner/1.0.8/", label: "1.0.8" },
              { to: "/runner/0.2.11/", label: "0.2.11" },
            ],
            routerRgx: "/runner/",
            classNames: "runner-dropdown",
          },
          {
            to: "help/support",
            position: "right",
            label: "Support",
            activeBaseRegex: "help/support",
          },
          {
            href: "https://gitea.com/user/login",
            label: "Sign In",
            position: "right",
            className: "internal-href signin-button",
            target: "_self",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "Awesome Gitea",
                href: "https://gitea.com/gitea/awesome-gitea",
              },
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/gitea",
              },
              {
                label: "Discord",
                href: "https://discord.gg/gitea",
              },
              {
                label: "Forum",
                href: "https://forum.gitea.com/",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/giteaio",
              },
              {
                label: "Mastodon",
                href: "https://social.gitea.io/@gitea",
              },
              {
                label: "Bluesky",
                href: "https://bsky.app/profile/gitea.com",
              },
            ],
          },
          {
            title: "Code",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/go-gitea/gitea",
              },
              {
                label: "Gitea",
                href: "https://gitea.com/gitea",
              },
              {
                label: "Tea CLI",
                href: "https://gitea.com/gitea/tea",
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["ini", "diff", "json", "http", "docker", "php"],
      },
    }),
};

module.exports = config;
