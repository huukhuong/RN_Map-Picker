/**
 * @format
 */

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import AppNavigation from './src/navigations/AppNavigation'

AppRegistry.registerComponent(appName, () => AppNavigation);
