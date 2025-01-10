import React from 'react';
import {MDXProvider} from '@mdx-js/react';
import MDXComponents from '@theme/MDXComponents';
// useDoc reference:
// https://fossies.org/linux/docusaurus/packages/docusaurus-theme-classic/src/theme/DocItem/Content/index.tsx
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Outdated from '@site/src/components/Outdated';

export default function MDXContent({children}) {
  // {assets, contentTitle, frontMatter, metadata, toc}
  const {frontMatter, metadata} = useDoc();
  return <MDXProvider components={MDXComponents}>
    {frontMatter.isOutdated && <Outdated editUrl={metadata.editUrl}/>}
    {children}
  </MDXProvider>;
}
