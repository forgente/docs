import React from 'react';
import Link from '@docusaurus/Link';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

export default function MDXA(props) {
  // {assets, contentTitle, frontMatter, metadata, toc}
  const {metadata} = useDoc();
  let newProps = {...props};
  if (metadata.version !== 'current' && (props.href.startsWith('https://github.com/go-gitea/gitea/blob/main'))) {
    const versionedHref = props.href.replace('main', `release/v${metadata.version}`);
    newProps = {...props, href: versionedHref};
  }
  return <Link {...newProps} />;
}
