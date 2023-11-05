import '../styles/globals.css'
import '../styles/Components/ActionBar.css'
import '../styles/Components/ResoursesBar.css'
import '../styles/Components/Account.css'
import '../styles/Components/Editor.css'
import '../styles/Pages/Index.css'
import '../styles/Components/DBCard.css'
import '../styles/Components/Loader.css'
import '../styles/Components/Table.css'
import '../styles/Components/SwitchButton.css'
import '../styles/Components/FileInput.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { StateProvider, useSQML } from '../hooks/useSQML'

function MyApp({ Component, pageProps }) {
  const state = useSQML();
  return <StateProvider><Component {...pageProps}/></StateProvider>
}

export default MyApp;