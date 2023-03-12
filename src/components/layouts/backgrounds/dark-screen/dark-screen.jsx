import style from './dark-screen.module.css'

export const DarkScreen = ({ blured, children }) => <div className={`background ${style['dark-screen']} ${blured ? style['dark-screen_blured'] : ''}`}>{children}</div>