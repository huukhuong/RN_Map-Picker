import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';

export interface INavigationProps {
    navigation: NavigationProp<ParamListBase>,
    route: RouteProp<ParamListBase, any>
}