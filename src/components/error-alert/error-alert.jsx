import React, { useState } from 'react';
import { connect } from 'react-redux';
import { hideAlert } from '../../redux/actions/actions';
import style from './error-alert.module.css';

export const ErrorAlert = (props) => {
  const [alert, setAlert] = useState(true);
  return (
    <div data-test-id='error' className={alert ? style.alert : style.alertInvisible}>
      <div className={style.alert__info}>
        <div>
          <div className={style.alert__info_icon} />
        </div>
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
