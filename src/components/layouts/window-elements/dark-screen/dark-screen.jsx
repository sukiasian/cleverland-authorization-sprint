export const DarkScreen = ({ blured, children }) => <div className={`dark-screen ${blured ? 'dark-screen_blured' : ''}`}>{children}</div>