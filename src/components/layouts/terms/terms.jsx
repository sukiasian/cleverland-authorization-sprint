import React from 'react';
import { Contract } from '../../pages/contract';
import { Terms } from '../../pages/terms';
import style from './terms.module.css';

export const LayoutTerms = (props) => (
  <div className={style.layoutTerms}>
    {(props.contentView === 'terms' && <Terms />) || (props.contentView === 'contract' && <Contract />)}
  </div>
);
