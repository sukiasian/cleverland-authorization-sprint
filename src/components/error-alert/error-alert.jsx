import React, { useState } from 'react';
import { connect } from 'react-redux';
import { hideAlert } from '../../redux/actions/actions';
import style from './error-alert.module.css';

export const ErrorAlert = (props) => {
  const [alert, setAlert] = useState(true);
  return (
    <div className={alert ? style.alert : style.alertInvisible}>
      <div className={style.alert__info}>
        <div className={style.alert__info_icon} />
        <p className={style.alert__info_text}>{props.text}</p>
      </div>
      <button
        onClick={() => {
          setAlert(false);
        }}
        type='button'
      >
        <div className={style.alert__cross} />
      </button>
    </div>
  );
};
