import React from 'react';
import ClientOnly from '@site/src/components/ClientOnly';

export default function Api21() {
  return (
    <ClientOnly swaggerPath="/swagger-22.json"/>
  );
}
