import React from 'react';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import {useLocation} from '@docusaurus/router';

export default function DropDown(props) {
  const {pathname} = useLocation();
  const {routerRgx, classNames} = props;
  const r = new RegExp(routerRgx);
  let isMatched = r.test(pathname);
  let newLabel = props.label;
  if (isMatched) {
    newLabel = props.items.filter(item => item.to === pathname)[0]?.label ?? newLabel;
  }
  const newProps = {...props, label: newLabel};
  return (
    <DropdownNavbarItem {...newProps} className={`custom-dropdown ${classNames}${isMatched ? ' gt-visible': ' gt-hidden'}`}></DropdownNavbarItem>
  );
}
