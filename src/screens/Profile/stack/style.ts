import { StyleSheet } from 'react-native'
import colors from '../../../styles/colors'

const authStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    backgroundColor: colors.white
  },
  inner: {
    padding: 32,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.white
  },
  header: {
    fontSize: 20,
    marginBottom: 16
  },
  input: {
    marginBottom: 16
  },
  button: {
    marginBottom: 16
  },
  title: {
    color: colors.gray[900],
    marginBottom: 10,
    fontSize: 25
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 200
  },
  logo: {
    height: 170,
    aspectRatio: 1.5,
    resizeMode: 'contain'
  },
  link: {
    color: colors.blue[700],
    marginBottom: 10,
    fontSize: 16
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

export default authStyles
