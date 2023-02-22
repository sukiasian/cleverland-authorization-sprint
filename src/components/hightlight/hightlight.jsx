import React from 'react';
import style from './hightlight.module.css';

export const HightLight = ({ filter, str }) => {
  if (!filter.length) return str;
  const regexp = new RegExp(filter, 'ig');
  const matchValue = str && str.match(regexp);
  if (matchValue) {
    return str.split(regexp).map((s, index, array) => {
      if (index < array.length - 1) {
        const c = matchValue.shift();
        return (
          <>
            {s}
            <span data-test-id='highlight-matches' className={style.searchWord}>
              {c}
            </span>
          </>
        );
      }
      return s;
    });
  }
  return str;
};
