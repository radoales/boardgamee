import { Pressable, StyleSheet, Text, View } from 'react-native'
import colors from '../styles/colors'

interface PatitoButton {
  icon?: JSX.Element
  style?: {}
  title: string
  onPress: () => void
}

const PatitoButton: React.FC<PatitoButton> = ({
  icon,
  title,
  style,
  onPress
}) => {
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 35,
    alignItems: 'center',
    backgroundColor: colors.blue[500]
  },
  icon: {
    paddingRight: 10
  },
  title: {
    color: colors.white,
    fontSize: 18
  }
})
export default PatitoButton
