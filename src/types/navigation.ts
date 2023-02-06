import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeRootStackParamList } from '../screens/home'
import { MyGamesRootStackParamList } from '../screens/myGames'
import { ProfileRootStackParamList } from '../screens/profile'
import { SearchRootStackParamList } from '../screens/search'
import { StackScreenRoute } from '../utils/routes'

export type SignInScreenRouteProp = NativeStackScreenProps<
  ProfileRootStackParamList,
  StackScreenRoute.SIGN_IN
>

export type SignUpScreenRouteProp = NativeStackScreenProps<
  ProfileRootStackParamList,
  StackScreenRoute.SIGN_UP
>

export type UserProfileScreenRouteProp = NativeStackScreenProps<
  ProfileRootStackParamList,
  StackScreenRoute.USER_PROFILE
>

export type MygamesScreenRouteProp = NativeStackScreenProps<
  MyGamesRootStackParamList,
  StackScreenRoute.MY_GAMES
>

export type FriendsScreenRouteProp = NativeStackScreenProps<
  ProfileRootStackParamList,
  StackScreenRoute.FRIENDS
>

export type EditUserProfileScreenRouteProp = NativeStackScreenProps<
  ProfileRootStackParamList,
  StackScreenRoute.EDIT_USER_PROFILE
>

export type PasswordResetScreenRouteProp = NativeStackScreenProps<
  ProfileRootStackParamList,
  StackScreenRoute.PASSWORD_RESET
>

export type SearchListScreenRouteProp = NativeStackScreenProps<
  SearchRootStackParamList,
  StackScreenRoute.SEARCH_LIST
>

export type HomeStackScreenRouteProp = NativeStackScreenProps<
  HomeRootStackParamList,
  StackScreenRoute.HOME
>
